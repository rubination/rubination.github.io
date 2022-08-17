//Screen width constants and variables
const BURGERWIDTH = 877;
var w = document.documentElement.clientWidth;
var prevW = w;

//Document elements
const body = document.getElementsByTagName("BODY")[0];

const openburger = document.getElementById("openburger");
const closedburger = document.getElementById("closedburger");
const title = document.getElementById("navtitle");
const dropdown = document.getElementById("burgerdrop");
const projspan = document.getElementById("projspan");
const arrow = document.getElementById("burgerarrow");
const burgerres = document.getElementById("burgerres");
const grillmarks = document.getElementById("grillmarks");
const grease = document.getElementById("grease");


/**
 * Opens or closes mobile menu
 */
function menu() {
    if(closedburger.style.display !== "none") {
        closedburger.style.display = "none";
        openburger.style.display = "block";
        title.style.borderBottom = "10px solid black";
        body.style.overflowY = "hidden";
    }
    else {
        openburger.style.display = "none";
        closedburger.style.display = "flex";
        title.style.borderBottom = "none";
        body.style = "";
        if(dropdown.style.display !== "none"){
            burgerDropdown();
        }
    }
}

/**
 * Opens or closes the dropdown menu under the "Projects" tab in the mobile menu
 */
function burgerDropdown() {
    if(dropdown.style.display === "none"){
        projspan.style.backgroundColor = "var(--c5)";
        arrow.style.transform = "scaleY(-1)";
        arrow.style.padding = "0px 0px 5px 10px";
        dropdown.style.display = "block";
    }
    else {
        projspan.style = "";
        arrow.style = "";
        dropdown.style.display = "none";
    }
}

/**
 * Closes mobile menu if it's no longer visible
 */
 function checkWidth() {
    prevW = w;
    w = document.documentElement.clientWidth;

    if(w >= BURGERWIDTH && prevW < BURGERWIDTH && closedburger.style.display === "none") {
        menu();
    }
}

/**
 * Initialize event listeners for navbar elements
 */
function navbarInit() {
    window.addEventListener("resize", checkWidth);
    closedburger.addEventListener("click", menu);
    grillmarks.addEventListener("click", menu);
    burgerres.addEventListener("click", menu);
    grease.addEventListener("click", menu);
    projspan.addEventListener("click", burgerDropdown);
}

navbarInit();