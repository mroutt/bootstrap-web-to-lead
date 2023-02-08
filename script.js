let currentPageIndex;
let pages;
let leftButton;
let rightButton;
let submitButton;

document.addEventListener("DOMContentLoaded", function(event) {

    currentPageIndex = 0;
    pages = Array.from(document.getElementsByClassName('nav-page'));

    addValidationEventsToAllInputElements();

    leftButton = document.getElementById("left-button");
    rightButton = document.getElementById("right-button");
    submitButton = document.getElementById("submit-button");

    showCurrentPage();
});

function addValidationEventsToAllInputElements() {
    
    let inputElements = document.getElementsByTagName("input", "select");

    for (let element of inputElements) {

        if(element.type != "hidden") {

            element.addEventListener("input", validateElement);    
        }
    }
}

function showCurrentPage() {
    
    for(let i = 0; i < pages.length; i++) {

        let page = pages[i];

        if(i == currentPageIndex) {
            page.style.display = "";
        } else {
            page.style.display = "none";
        }        
    }

    if(currentPageIndex == 0) {
        leftButton.disabled = true;
        rightButton.disabled = false;
        submitButton.style.display = "none";
    } else if (currentPageIndex == (pages.length - 1)) {
        leftButton.disabled = false;
        rightButton.disabled = true;
        submitButton.style.display = "";  
    } else {
        leftButton.disabled = false;
        rightButton.disabled = false;
        submitButton.style.display = "none";  
    }
}

function nextPage() {

    if(validateCurrentPage()) {

        currentPageIndex++;
        showCurrentPage();    
    }
}

function prevPage() {

    currentPageIndex--;
    showCurrentPage();
}

function validateCurrentPage() {

    let valid = true;
    let currentPage = pages[currentPageIndex];
    let inputElements = currentPage.getElementsByTagName("input", "select");

    for (let element of inputElements) {
    
        if (element.type != "hidden" && !element.checkValidity()) {

            // This will mark the UI element as invalid
            element.className += " is-invalid";
            valid = false;
        }
    }
    
    return valid;
  }

function validateElement(event) {

    let element = event.target;

    if (!element.checkValidity()) {
        // This will mark the UI element as invalid
        element.className += " is-invalid";
    } else {
        // This will remove the invalid mark on the UI element
        element.classList.remove("is-invalid");
    }
}

function beforeSubmit() {
    
    fillHiddenField('provider_email', 'email');
    fillHiddenDateField('date_of_birth', 'Patient_Date_of_Birth__c');
    fillHiddenDateField('medicare_exp_date', 'Patient_Medicare_Exp_Date__c');
}

function fillHiddenField(visibleElementId, hiddenElementId) {

    let visibleElement = document.getElementById(visibleElementId);
    let hiddenElement = document.getElementById(hiddenElementId);
    hiddenElement.value = visibleElement.value;
}

function fillHiddenDateField(visibleElementId, hiddenElementId) {

    let visibleElement = document.getElementById(visibleElementId);    
    let hiddenElement = document.getElementById(hiddenElementId);
    let dateString = new Date(visibleElement.value).toLocaleDateString("en-US");    
}