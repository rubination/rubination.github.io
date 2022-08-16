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

//Demo video modal elements / variables / lambdas
const dvlink = document.getElementById("demovidlink");
const dvsrcs = [
    {title : "Batbot", link : "https://www.youtube-nocookie.com/embed/K7ILOBpgLYQ?autoplay=1"}
]
const currTitle = document.getElementById("ptitle").children[0].textContent;
const searchIndex = (element) => element.title === currTitle;

//Sound list elements / variables
const soundlist = document.getElementById("soundlist").children;
const slsrcs = [
    {title : "Batbot", links: [
        "./../audio/featbatbot/Standard.wav",
        "./../audio/featbatbot/Error.wav",
        "./../audio/featbatbot/Correct.wav",
        "./../audio/featbatbot/Execute.wav",
        "./../audio/featbatbot/Happy.wav",
        "./../audio/featbatbot/HappyEnding.wav",
        "./../audio/featbatbot/BatBuzz.wav"
    ]}
];
var soundHover = -1;

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
 * Creates and appends modal of YouTube video to document
 */
function createModal() {
    //Create modal, add inner divs
    const modal = document.createElement("div");
    modal.setAttribute("id", "pdemovidmodal");
    modal.appendChild(document.createElement("div"));
    modal.firstChild.appendChild(document.createElement("div"));
    
    //Create iframe, add attributes, add to modal
    const vid = document.createElement("iframe");
    vid.setAttribute("id","demovid");
    vid.setAttribute("src",dvsrcs[dvsrcs.findIndex(searchIndex)].link);
    vid.setAttribute("allow", "autoplay;");
    vid.setAttribute("allowfullscreen","");
    modal.firstChild.firstChild.appendChild(vid);
    
    //Create X img, add attributes and event listener, add to modal
    const closeX = document.createElement("img");
    closeX.setAttribute("id","demovidx");
    closeX.setAttribute("src","./../img/xicon.png");
    closeX.addEventListener("click", function(){
        modal.remove();
    });
    modal.appendChild(closeX);
    
    document.getElementsByTagName("BODY")[0].appendChild(modal);
}

/**
 * Creates and plays audio source
 */
function playSound() {
    //Get index of sound to play
    const index = soundHover;

    //Create and set attributes of audio and source elements
    const audio = document.createElement("audio");
    const source = document.createElement("source");
    source.setAttribute("src",slsrcs[slsrcs.findIndex(searchIndex)].links[index]);
    source.setAttribute("type","audio/wav");
    audio.appendChild(source);

    //When audio begins to load, remove all event listeners
    audio.addEventListener("loadstart", function(){
        for(var i = 0; i < soundlist.length; i++) {
            soundlist[i].removeEventListener("click", playSound);
        }
    })

    //When audio ends, remove audio component from document and add back event listeners
    audio.addEventListener("ended", function(){
        audio.remove();
        for(var i = 0; i < soundlist.length; i++) {
            soundlist[i].addEventListener("click", playSound);
        }
    });

    //Append audio to document and play audio
    soundlist[index].parentElement.appendChild(audio);
    audio.play();
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
    if(dvlink !== null) {
        dvlink.addEventListener("click",createModal);
    }
    if(soundlist.length > 0) {
        for(var i = 0; i < soundlist.length; i++) {
            const n=i;
            soundlist[i].addEventListener("mouseover", function(){soundHover = n});
            soundlist[i].addEventListener("click", playSound);
        }
    }
}

projInit();