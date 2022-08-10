//Feature section elements
const feats = document.getElementsByClassName("feat");
const featimgs = document.getElementsByClassName("featimg");
const leftarrows = document.getElementsByClassName("leftarrow");
const rightarrows = document.getElementsByClassName("rightarrow");
const dots = document.getElementsByClassName("slidedot");

//Hardware and fritzing modal elements
const fzmodal = document.getElementById("pfritzmodal");
const fzlink = document.getElementById("fritzlink");
const fzx = document.getElementById("fritzx");

//Demo video modal elements
const dvmodal = document.getElementById("pdemovidmodal");
const dvlink = document.getElementById("demovidlink");
const dvx = document.getElementById("demovidx");

//Current feature global variable
var currfeat = 1;

/**
 * Hides current feature and displays the chronologically next feature
 */
function nextFeat() {
    //Enable left arrows when necessary
    if(currfeat == 1) {
        leftarrows[0].classList.remove("disabledarrow");
        leftarrows[1].classList.remove("disabledarrow");
        leftarrows[0].addEventListener("click", prevFeat);
        leftarrows[1].addEventListener("click", prevFeat);
    }
    //Disable right arrows when necessary
    if(currfeat == feats.length - 1) {
        rightarrows[0].classList.add("disabledarrow");
        rightarrows[1].classList.add("disabledarrow");
        rightarrows[0].removeEventListener("click", nextFeat);
        rightarrows[1].removeEventListener("click", nextFeat);
    }

    //Remove display of previous feature
    feats[currfeat - 1].style.display = "none";
    featimgs[currfeat - 1].style.display = "none";
    dots[currfeat - 1].classList.remove("on");
    //Enable display of next feature
    feats[currfeat].style.display = "block";
    featimgs[currfeat].style.display = "block";
    dots[currfeat].classList.add("on");

    currfeat++;
}

/**
 * Hides current feature and displays the chronologically previous feature
 */
function prevFeat() {
    currfeat--;

    //Enable right arrows when necessary
    if(currfeat == feats.length - 1) {
        rightarrows[0].classList.remove("disabledarrow");
        rightarrows[1].classList.remove("disabledarrow");
        rightarrows[0].addEventListener("click", nextFeat);
        rightarrows[1].addEventListener("click", nextFeat);
    }
    //Disable right arrows when necessary
    if(currfeat == 1) {
        leftarrows[0].classList.add("disabledarrow");
        leftarrows[1].classList.add("disabledarrow");
        leftarrows[0].removeEventListener("click", prevFeat);
        leftarrows[1].removeEventListener("click", prevFeat);
    }

    //Remove display of previous feature
    feats[currfeat].style.display = "none";
    featimgs[currfeat].style.display = "none";
    dots[currfeat].classList.remove("on");
    //Enable display of next feature
    feats[currfeat - 1].style.display = "block";
    featimgs[currfeat - 1].style.display = "block";
    dots[currfeat - 1].classList.add("on");
}

/**
 * Hides current feature and displays the featnum-th feature.
 * @param {number} featnum - The number of the feature to display. featnum !== currfeat
 */
function jumpToFeat(featnum) {
    //Enable or disable left arrows when necessary
    if(currfeat == 1) {
        leftarrows[0].classList.remove("disabledarrow");
        leftarrows[1].classList.remove("disabledarrow");
        leftarrows[0].addEventListener("click", prevFeat);
        leftarrows[1].addEventListener("click", prevFeat);
    }
    else if(featnum == 1) {
        leftarrows[0].classList.add("disabledarrow");
        leftarrows[1].classList.add("disabledarrow");
        leftarrows[0].removeEventListener("click", prevFeat);
        leftarrows[1].removeEventListener("click", prevFeat);
    }

    //Enable or disable right arrows when necessary
    if(currfeat == feats.length){
        rightarrows[0].classList.remove("disabledarrow");
        rightarrows[1].classList.remove("disabledarrow");
        rightarrows[0].addEventListener("click", nextFeat);
        rightarrows[1].addEventListener("click", nextFeat);
    }
    else if(featnum == feats.length){
        rightarrows[0].classList.add("disabledarrow");
        rightarrows[1].classList.add("disabledarrow");
        rightarrows[0].removeEventListener("click", nextFeat);
        rightarrows[1].removeEventListener("click", nextFeat);
    }

    //Remove display of previous feature
    feats[currfeat - 1].style.display = "none";
    featimgs[currfeat - 1].style.display = "none";
    dots[currfeat - 1].classList.remove("on");
    //Enable display of next feature
    feats[featnum - 1].style.display = "block";
    featimgs[featnum - 1].style.display = "block";
    dots[featnum - 1].classList.add("on");

    currfeat = featnum;
}

/**
 * Initializes event listeners for page elements present on page
 */
function projInit() {
    if(rightarrows.length > 0) {
        rightarrows[0].addEventListener("click", nextFeat);
        rightarrows[1].addEventListener("click", nextFeat);

        for(var i = 0; i < dots.length; i++) {
            const n = i+1;
            dots[i].addEventListener("click", function(){
                if(n !== currfeat) jumpToFeat(n);
            });
        }
    }
    if(fzmodal !== null) {
        fzlink.addEventListener("click", function() {
            fzmodal.style.display = "block";
        });
        fzx.addEventListener("click", function() {
            fzmodal.style.display = "none";
        });
    }
    if(dvmodal !== null) {
        dvlink.addEventListener("click", function() {
            dvmodal.style.display = "block";
        });
        dvx.addEventListener("click", function() {
            dvmodal.style.display = "none";
        });
    }
}

projInit();