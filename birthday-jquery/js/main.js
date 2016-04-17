function injectForm(){
    $(".content").append("<div class='entry'><div class='sidebar'> <label class='deleteLabel' for='deleteCheckbox'>Delete</label> <input class='deleteCheckbox' id='deleteCheckbox' type='checkbox'></div><div class='innerEntry'> <label class='nameLabel'>First <input type='text' class='firstName'></label><label class=nameLabel>Last <input type='text' class='lastName'> </label> <p class='nameValue'><span class='first'></span><span class='last'></span></p></div><div class='entryButtons'> <button class='submitName'>Submit</button> <button class='resetName'>Reset</button></div></div>");
}

function registerEventListeners() {
    $(".content").on("click",".submitName", submitValues);
    $(".content").on("click",".resetName", reset);

    $(".addEntry").on("click",injectForm);
    $(".saveEntries").on("click",function(){
        setLocalStorage(messaging);
    });
    $(".deleteEntries").on("click",deleteEntries);
    $(".randomUser").on("click",randomUsers);
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
            injectForm();
            $(".firstName").eq(count).val(jsonObject[count].firstName);
            $(".lastName").eq(count).val(jsonObject[count].lastName);
            $(".entry").eq(entryCount).remove();
        }
    }
}

function randomUsers(){
    $.getJSON('http://api.randomuser.me/?results=10', function (data) {
        $(".entry").remove();
        var userCount = data.info.results;
        for (var count=0; count < userCount; count++){
            injectForm();
            $(".firstName").eq(count).val(data.results[count].name.first);
            $(".lastName").eq(count).val(data.results[count].name.last);
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
    injectForm();
    getLocalStorage();
}

initalize();
registerEventListeners();