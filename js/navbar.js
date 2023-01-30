//Screen width constants and variables
const BURGERWIDTH = 877;
var w = document.documentElement.clientWidth;
var prevW = w;
const body = document.getElementsByTagName("BODY")[0];

//Insert navbar into document
const navHTML = `
    <div id="navbar">
        <div id="navtitle" class="navelem">
            <h1>JAKE RUBIN</h1>
        </div>
        <ul id="navlist" class="navnonmobile">
            <li>
                <a href="https://jakerubin.ca/" class="navelem navitem">
                    <h3>Home</h3>
                </a>
            </li>
            <li>
                <a href="https://jakerubin.ca/aboutme" class="navelem navitem">
                    <h3>About Me</h3>
                </a>
            </li>
            <li class="navproj">
                <span class="navelem navitem">
                    <h3>Projects</h3>
                    <img src="./img/downarrow.png" class="arrowimg">
                </span>
                <ul class="dropdown">
                    <li>
                        <a href="https://jakerubin.ca/projects/website" class="navelem navitem">
                            <h5>This Website</h5>
                        </a>
                    </li>
                    <li>
                        <a href="https://jakerubin.ca/projects/batbot" class="navelem navitem">
                            <h5>Batbot</h5>
                        </a>
                    </li>
                    <li>
                        <a href="https://jakerubin.ca/projects/covidapp" class="navelem navitem">
                            <h5>COVID App</h5>
                        </a>
                    </li>
                    <li>
                        <a href="https://jakerubin.ca/projects" class="navelem navitem">
                            <h5><em>More...</em></h5>
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
        <a class="navelem navitem navres navnonmobile" href="https://jakerubin.ca/rubinresume.pdf" download>
            <h3>Resume</h3>
            <img src="./img/download.svg" class="downloadimg">
        </a>
        <ul id="burgerbun">
            <li id="closedburger">
                <img src="./img/hamburger.png">
            </li>
            <li id="openburger">
                <span id="grillmarks">
                    <img src="./img/xicon.png">
                </span>
                <ul id="burgertoppings">
                    <li>
                        <a href="https://jakerubin.ca/" class="navelem navitem">
                            <h3>Home</h3>
                        </a>
                    </li>
                    <li>
                        <a href="https://jakerubin.ca/aboutme" class="navelem navitem">
                            <h3>About Me</h3>
                        </a>
                    </li>
                    <li>
                        <span id="projspan" class="navelem navitem">
                            <h3>Projects</h3>
                            <img id="burgerarrow" src="./img/downarrow.png" class="arrowimg">
                        </span>
                        <ul id="burgerdrop" style="display:none;">
                            <li>
                                <a href="https://jakerubin.ca/projects/website" class="navelem navitem">
                                    <h5>This Website</h5>
                                </a>
                            </li>
                            <li>
                                <a href="https://jakerubin.ca/projects/batbot" class="navelem navitem">
                                    <h5>Batbot</h5>
                                </a>
                            </li>
                            <li>
                                <a href="https://jakerubin.ca/projects/covidapp" class="navelem navitem">
                                    <h5>COVID App</h5>
                                </a>
                            </li>
                            <li>
                                <a href="https://jakerubin.ca/projects" class="navelem navitem">
                                    <h5><em>More...</em></h5>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a id="burgerres" class="navelem navitem navres" href="https://jakerubin.ca/rubinresume.pdf" download>
                            <h3>Resume</h3>
                            <img src="./img/download.svg" class="downloadimg">
                        </a>
                    </li>
                </ul>
                <div id="grease"></div>
            </li>
        </ul>
    </div>
`
let template = document.createElement('template');
template.innerHTML = navHTML.trim();
body.insertBefore(template.content.children[0], body.firstChild);

//Document elements
const navbar = document.getElementById("navbar");
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
 * Initialize event listeners for navbar elements and remove unnecessary links
 */
function navbarInit() {
    //set image urls to correct values
    if(/(\/projects\/)/.test(window.location.href)) {
        navbar.querySelectorAll("img[src^='./img/']").forEach(img => {
            let src = img.getAttribute('src');
            img.setAttribute('src', '.'.concat(src));
        })
    }

    //Init event listeners
    window.addEventListener("resize", checkWidth);
    closedburger.addEventListener("click", menu);
    grillmarks.addEventListener("click", menu);
    burgerres.addEventListener("click", menu);
    grease.addEventListener("click", menu);
    projspan.addEventListener("click", burgerDropdown);

    //Remove unnecessary links
    let currpage = window.location.href.substring(window.location.href.lastIndexOf('/') + 1).replace('.html','')
    if(currpage == 'index' || currpage == '') {
        navbar.querySelectorAll("a[href='https://jakerubin.ca/']").forEach(link => {
            link.removeAttribute('href');
        });
    } else {
        navbar.querySelectorAll("a[href$="+currpage+"]").forEach(link => {
            link.removeAttribute('href');
        });
    }
}

navbarInit();