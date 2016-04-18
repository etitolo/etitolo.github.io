function injectForm(firstName,lastName){
    var firstName = firstName || "";
    var lastName = lastName || "";
    $(".content").append("<div class='entry'><div class='sidebar'> <label class='deleteLabel' for='deleteCheckbox'>Delete</label> <input class='deleteCheckbox' id='deleteCheckbox' type='checkbox'></div><div class='innerEntry'> <label class='nameLabel'>First <input type='text' value='" + firstName + "' class='firstName'></label><label class=nameLabel>Last <input type='text' value='" + lastName + "' class='lastName'> </label> <p class='nameValue'><span class='first'></span><span class='last'></span></p></div><div class='entryButtons'> <button class='submitName'>Submit</button> <button class='resetName'>Reset</button></div></div>");
    console.log(firstName);
}

function registerEventListeners() {
    $("body").on("click",".submitName", submitValues);
    $("body").on("click",".resetName", reset);

    $("body").on("click",".addEntry",function(){
        injectForm();
    });
    $("body").on("click",".saveEntries",function(){
        setLocalStorage(messaging);
    });
    $("body").on("click",".deleteEntries",deleteEntries);
    $("body").on("click",".randomUser",randomUsers);
}

function submitValues(){
    $(".entry").each(function( index ) {
        var firstName = $(".firstName").eq(index).val();
        var lastName = $(".lastName").eq(index).val();
        $(".first").eq(index).text(firstName);
        $(".last").eq(index).text(" " + lastName);    
    });
}

function reset(){
    $("input[type=text]").val("");
    $(".nameValue").text("");
}

function setLocalStorage(showMessaging){
    var jsonObject = [];
    if (window.localStorage) {
        $(".entry").each(function( index ) {
            var firstName = $(".firstName").eq(index).val();
            var lastName = $(".lastName").eq(index).val();
            var createObject = { "firstName": firstName, "lastName": lastName };
            jsonObject.push(createObject);
        });
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
    $(".messaging").toggleClass( "hide slideInLeft" );
    $(".messaging").html( "Weeeeeeeeeeeeeeeeeeeeeeeeeeee!" );
    window.setTimeout(function(){
        $(".messaging").toggleClass( "slideInLeft slideOutRight" );
    }, 2000);
    window.setTimeout(function hideMessages() {
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