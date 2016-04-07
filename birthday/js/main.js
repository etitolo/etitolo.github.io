var formContainer = document.querySelector(".formContainer");

function injectForm(containerNode) {
    var buildNameWrapper = document.createElement("div");
    buildNameWrapper.setAttribute("class", "nameWrapper");
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
}

function setSessionStorage(){
  var firstNameElement = formContainer.querySelectorAll(".firstName"),
      lastNameElement = formContainer.querySelectorAll(".lastName"),
      firstNameArray = [],
      lastNameArray = [];
  if (window.sessionStorage) {
    for (var count=0; count < firstNameElement.length; count++) {
      var firstName = firstNameElement[count].value;
      var lastName = lastNameElement[count].value;
      firstNameArray.push(firstName);
      lastNameArray.push(lastName);
      window.sessionStorage.setItem('firstName', JSON.stringify(firstNameArray));
      window.sessionStorage.setItem('lastName', JSON.stringify(lastNameArray));
    }
    messaging();
  } else {
    alert("Session storage is not available.");
  }
}

function messaging() {
  document.querySelector(".messaging").classList.remove("hide");
  window.setTimeout(function(){document.querySelector(".messaging").classList.add("hide")},2000);
}

function registerEventListners() {
  var addButton = document.querySelector(".addName");
  var deleteButton = document.querySelector(".deleteName");
  var saveButton = document.querySelector(".saveName")

  addButton.addEventListener("click", function(evt){
     injectForm(formContainer);
  });

  deleteButton.addEventListener("click", function(evt){
     deleteEntry();
  });

  saveButton.addEventListener("click", function(evt){
     setSessionStorage();
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
      buttonContainer = document.querySelector(".buttonContainer");
  addButton.innerHTML = "<button class=\"addName\">Add</button><button class=\"saveName\">Save</button><button class=\"deleteName\">Delete</button>";
  buttonContainer.appendChild(addButton);

  injectForm(formContainer);
}

initialize();
registerEventListners();



