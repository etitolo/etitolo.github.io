function injectForm(firstName,lastName){
    var firstName = firstName || "";
    var lastName = lastName || "";
    $(".content").append("<div class='entry'><div class='sidebar'> <label class='deleteLabel' for='deleteCheckbox'>Delete</label> <input class='deleteCheckbox' id='deleteCheckbox' type='checkbox'></div><div class='innerEntry'> <label class='nameLabel'>First <input type='text' value='" + firstName + "' class='firstName'></label><label class=nameLabel>Last <input type='text' value='" + lastName + "' class='lastName'> </label> <p class='nameValue'></p></div><div class='entryButtons'> <button class='submitName'>Submit</button> <button class='resetName'>Reset</button></div></div>");
}

function registerEventListeners() {
    $("#contentContainer").on( "click", "button", function( event ) {
        activeClass = $(this).attr("class");
        switch (activeClass) {
            case "submitName":
                submitValues();
                break;
            case "resetName":
                reset();
                break;
            case "addEntry":
                injectForm();
                break;
            case "saveEntries":
                setLocalStorage(messaging);
                break;
            case "deleteEntries":
                deleteEntries();
                break;
            case "randomUser":
                randomUsers();
                break
        }
    });
}

function submitValues(){
    entryLength = $(".entry").length;
    for (var count = 0; count < entryLength; count++) {
        var firstName = $(".firstName").eq(count).val();
        var lastName = $(".lastName").eq(count).val();
        $(".nameValue").eq(count).text(firstName + " " + lastName);
    };
}

function reset(){
    $("input[type=text]").val("");
    $(".nameValue").text("");
}

function setLocalStorage(showMessaging){
    var jsonObject = [];
    if (window.localStorage) {
        entryLength = $(".entry").length;
        for(var count=0; count < entryLength; count++) {
            var firstName = $(".firstName").eq(count).val();
            var lastName = $(".lastName").eq(count).val();
            var createObject = { "firstName": firstName, "lastName": lastName };
            jsonObject.push(createObject);    
        }
        localStorage.setItem('entry', JSON.stringify(jsonObject));
    } else {
        alert("you don't got no local storage");
    }
    if (showMessaging) {
        showMessaging();
    }
}

function getLocalStorage(){
    var jsonObject = JSON.parse(localStorage.getItem("entry"));
    if (jsonObject){
        var entryCount = jsonObject.length;
        for (var count = 0; count < entryCount; count++) {
            var firstNameVal = jsonObject[count].firstName;
            var lastNameVal = jsonObject[count].lastName
            injectForm(firstNameVal,lastNameVal);
        }
    }
}

function randomUsers(){
    $.getJSON('http://api.randomuser.me/?results=10', function(data){
        $(".entry").remove();
        var userCount = data.info.results;
        for (var count=0; count < userCount; count++){
            firstNameVal = data.results[count].name.first;
            lastNameVal = data.results[count].name.last;
            injectForm(firstNameVal, lastNameVal);
        }
    });
}

function messaging(){
    $(".messaging").toggleClass( "hide slideInLeft" ).html("Weeeeeeeeeeeeeeeeeeeeeeeeeeee!");
    window.setTimeout(function(){
        $(".messaging").toggleClass( "slideInLeft slideOutRight" );
    }, 2000);
    window.setTimeout(function(){
        $(".messaging").toggleClass( "hide slideOutRight" );
    }, 3000); 
}

function deleteEntries(){
    $(".deleteCheckbox:checked").parent().parent().remove();
    setLocalStorage();
}

function initalize(){
    var jsonObject = JSON.parse(localStorage.getItem("entry"));
    if(!jsonObject || jsonObject.length < 1) {
        injectForm();
        localStorage.setItem("entry", "[]");
    }
    getLocalStorage();
}

initalize();
registerEventListeners();