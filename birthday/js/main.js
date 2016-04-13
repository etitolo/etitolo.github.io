var formContainer = document.querySelector(".formContainer");

function injectForm(containerNode) {
    var buildNameWrapper = document.createElement("div");
    buildNameWrapper.setAttribute("class", "nameWrapper fadeInLeft");
    buildNameWrapper.innerHTML = "<div class='sidebar'><input type='checkbox' class='deleteCheckbox'></div><div class='inputContainer'><p class='error firstNameError'><p class='error secondNameError'></p><label>First* <input type='text' class='firstName'></label><label>Last* <input type='text' class='lastName'></label><button class='submitName'>Submit</button><button class='resetForm'>Reset</button><p class='nameValues'></p></div>";
    containerNode.appendChild(buildNameWrapper);
}

function reset(parentNode) {
  var errors = parentNode.querySelectorAll(".error"),
      inputFileds = parentNode.querySelectorAll("input"),
      count;
  for (count = 0; count < errors.length; count++ ) {
    errors[count].innerHTML = "";
  }
  for (count = 0; count < inputFileds.length; count++ ) {
    inputFileds[count].value = "";
  }
  setLocalStorage();
}

function deleteEntry(){
    var deleteCheckbox = document.querySelectorAll(".deleteCheckbox:checked");
    for (var count=0; count < deleteCheckbox.length; count++) {
      var nameWrapper = deleteCheckbox[count].parentNode.parentNode;
      formContainer.removeChild(nameWrapper);
    }
}

function handleSubmit(parentNode){
    var firstNameElement = parentNode.querySelector(".firstName"),
        lastNameElement = parentNode.querySelector(".lastName"),
        errorFirstName = parentNode.querySelector(".firstNameError"),
        errorSecondName = parentNode.querySelector(".secondNameError"),
        firstName = firstNameElement.value,
        lastName = lastNameElement.value;
    if (!firstName){
        errorFirstName.innerHTML = "Please enter your first name.";
    } else {
        errorFirstName.innerHTML = "";
    }
    if (!lastName){
        errorSecondName.innerHTML = "Please enter your last name.";
    } else {
        errorSecondName.innerHTML = "";
    }
    parentNode.querySelector(".nameValues").innerHTML = firstName + " " + lastName;
    setLocalStorage();
}

function setLocalStorage(showMessaging){
  var nameWrappers = document.querySelectorAll('.nameWrapper'),
      jsonObject = [];
  if (window.localStorage) {
    for(var count = 0; count < nameWrappers.length; count++){
      var nameWrapper = nameWrappers[count];
      var firstName = nameWrapper.querySelector('.firstName');
      var lastName = nameWrapper.querySelector('.lastName');
      var nameWrapperObject = { firstName: firstName.value, lastName: lastName.value };
      jsonObject.push(nameWrapperObject);
    }
    localStorage.setItem('nameWrapper', JSON.stringify(jsonObject));
    if (typeof showMessaging === "function") {
      showMessaging();
    }
  } else {
    alert("Local storage is not available.");
  }
}

function getLocalStorage() {
  if (window.localStorage) {
    var jsonObject = JSON.parse(localStorage.getItem("nameWrapper"));
    if (jsonObject) {
      var nameWrappers = jsonObject.length,
          containerNode = document.querySelector(".formContainer");
      for (var i=0; i < nameWrappers; i++) {
        injectForm(containerNode);
        var firstNameInput = document.querySelectorAll(".firstName");
        var lastNameInput = document.querySelectorAll(".lastName");
        firstNameInput[i].value = jsonObject[i].firstName;
        lastNameInput[i].value = jsonObject[i].lastName;
      }
    }
  } else {
    alert("Local storage is not available.");
  }
}

function getRemoteRandomList(){
  var xhttp = new XMLHttpRequest();
  var containerNode = document.querySelector(".formContainer");
  var orphan = document.querySelectorAll(".nameWrapper");
  var orphanCount = orphan.length;
  if (orphanCount > 1) {
    for (var count=0; count < orphanCount; count++) {
      var nameWrapper = orphan[count];
      nameWrapper.parentNode.removeChild(nameWrapper);
    }
  }
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var randomUsers = JSON.parse(xhttp.responseText);
      var usersLength = randomUsers.info.results;
      for (var count=0; count < usersLength; count++) {
        injectForm(containerNode);
        var firstNameInput = document.querySelectorAll(".firstName");
        var lastNameInput = document.querySelectorAll(".lastName");
        firstNameInput[count].value = randomUsers.results[count].name.first;
        lastNameInput[count].value = randomUsers.results[count].name.last;    
      }
    }
  };
  xhttp.open("GET", "http://api.randomuser.me/?results=10", true);
  xhttp.send();
}
// getRemoteRandomList()

function messaging() {
  var message = document.querySelector(".messaging");
    message.classList.remove("hide");
  window.setTimeout(function(){
    message.classList.remove("fadeInDown");
    message.classList.add("fadeInUp");
  },2000);
  window.setTimeout(function(){
    message.classList.add("hide");
    message.classList.remove("fadeInUp");
    message.classList.add("fadeInDown");
  },3000);
}

function registerEventListners() {
  var addButton = document.querySelector(".addName");
  var deleteButton = document.querySelector(".deleteName");
  var saveButton = document.querySelector(".saveName");
  var randomButton = document.querySelector(".randomUsers")

  addButton.addEventListener("click", function(evt){
     injectForm(formContainer);
  });

  deleteButton.addEventListener("click", function(evt){
     deleteEntry();
     setLocalStorage();
  });

  saveButton.addEventListener("click", function(evt){
     setLocalStorage(messaging);
  });

  randomButton.addEventListener("click", function(evt) {
      getRemoteRandomList();
  });

  formContainer.addEventListener("click", function(evt){
    var targetClassName = evt.target.className,
        parentNode = evt.target.parentElement;
    switch(targetClassName) {
      case "submitName":
        handleSubmit(parentNode);
        break;
      case "resetForm":
        reset(parentNode);
        break;
    }
  });
}

function initialize() {
  var addButton =  document.createElement("div"),
      containerNode = document.querySelector(".formContainer"),
      buttonContainer = document.querySelector(".buttonContainer");
  addButton.innerHTML = "<button class=\"addName\">Add</button><button class=\"saveName\">Save</button><button class=\"deleteName\">Delete</button><button class=\"randomUsers\">I'm Feeling Lucky</button>";
  buttonContainer.appendChild(addButton);
  if (window.localStorage) {
    var jsonObject = JSON.parse(localStorage.getItem("nameWrapper"));
    if (!jsonObject || jsonObject == "") {
      injectForm(containerNode);
      localStorage.setItem("nameWrapper", "[]");
      }
    } else {
      alert("you have no local storage")
    }
  getLocalStorage();
}

initialize();
registerEventListners();