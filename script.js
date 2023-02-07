let currentPageIndex;
let navElements;
let leftButton;
let rightButton;
let submitButton;

function init() {

    currentPageIndex = 0;
    navElements = Array.from(document.getElementsByClassName('nav-page'));

    leftButton = document.getElementById("left-button");
    rightButton = document.getElementById("right-button");
    submitButton = document.getElementById("submit-button");

    showProperDiv();
}

function showProperDiv() {
    
    for(let i = 0; i < navElements.length; i++) {

        if(i == currentPageIndex) {
            navElements[i].style.display = "";
        } else {
            navElements[i].style.display = "none";
        }        
    }

    if(currentPageIndex == 0) {
        leftButton.disabled = true;
        rightButton.disabled = false;
        submitButton.style.display = "none";
    } else if (currentPageIndex == (navElements.length - 1)) {
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
    currentPageIndex++;
    showProperDiv();
}

function prevPage() {
    currentPageIndex--;
    showProperDiv();
}
