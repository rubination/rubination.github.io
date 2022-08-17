let emailCopy = document.getElementById("aemailtext");

let hobbyheaders = document.getElementsByClassName("hobbyheader");
let hobbytext = document.getElementsByClassName("hobbytext");

let animClock = null;
let hobbyHeight = 400;
let hobbyOpen = -1; //-1 if none open, positive index if hobby section open
let hobbyHover = -1; //-1 if none clicked, positive index if hobby section hovered

function copyEmail() {
    var email = document.getElementById("aemailbutton");
    var value = email.getAttribute("href").replace("mailto:","");
    navigator.clipboard.writeText(value);
}

function openHobby() {
    var index = hobbyHover;

    for(var i=0; i < hobbyheaders.length; i++) {
        hobbyheaders[i].removeEventListener("click", openHobby);
    }

    hobbyheaders[index].style.backgroundColor = "var(--c5)";
    hobbyheaders[index].style.cursor = "default";

    hobbytext[index].style.display = "block";
    hobbytext[index].style.overflowY = "hidden";
    hobbytext[index].style.opacity = 0;
    hobbytext[index].style.height = 0;

    hobbyOpen = index;

    let height = 0;

    clearInterval(animClock);
    animClock = setInterval(openFrame, 8, index);

    function openFrame(i) {
        if(height == hobbyHeight) {
            clearInterval(animClock);
            hobbytext[i].style = "display: block;";
            hobbyheaders[i].style.cursor = "pointer";
            for(var n=0; n < hobbyheaders.length; n++) {
                if(n == i)
                    hobbyheaders[n].addEventListener("click", closeHobby);
                else 
                    hobbyheaders[n].addEventListener("click", closeOldOpenNewHobby);
            }
        }
        else {
            height += hobbyHeight / 100;
            hobbytext[i].style.height = height + 'px';
            hobbytext[i].style.opacity = height / hobbyHeight;
        }
    }
}

function closeHobby() {
    var index = hobbyHover;

    for(var i=0; i < hobbyheaders.length; i++) {
        if(i == index)
            hobbyheaders[i].removeEventListener("click", closeHobby);
        else 
            hobbyheaders[i].removeEventListener("click", closeOldOpenNewHobby);
    }

    hobbyheaders[index].style.cursor = "default";

    hobbytext[index].style.overflowY = "hidden";
    hobbytext[index].style.opacity = 1;
    hobbytext[index].style.height = "300px";
    
    hobbyOpen = -1;

    let height = hobbyHeight;

    clearInterval(animClock);
    animClock = setInterval(closeFrame, 5, index);

    function closeFrame(i) {
        if(height == 0) {
            clearInterval(animClock);
            hobbytext[i].style = "";
            hobbyheaders[i].style = "";
            for(var n=0; n < hobbyheaders.length; n++) {
                hobbyheaders[n].addEventListener("click", openHobby);
            }
        }
        else {
            height -= hobbyHeight / 100;
            hobbytext[i].style.height = height + 'px';
            hobbytext[i].style.opacity = height / hobbyHeight;
        }
    }
}

function closeOldOpenNewHobby() {
    var newIndex = hobbyHover;
    var oldIndex = hobbyOpen;

    for(var i=0; i < hobbyheaders.length; i++) {
        if(i == oldIndex)
            hobbyheaders[i].removeEventListener("click", closeHobby);
        else 
            hobbyheaders[i].removeEventListener("click", closeOldOpenNewHobby);
    }

    hobbyheaders[oldIndex].style.cursor = "default";
    hobbyheaders[newIndex].style.backgroundColor = "var(--c5)";
    hobbyheaders[newIndex].style.cursor = "default";

    hobbytext[oldIndex].style.overflowY = "hidden";
    hobbytext[oldIndex].style.opacity = 1;
    hobbytext[oldIndex].style.height = "300px";
    hobbytext[newIndex].style.display = "block";
    hobbytext[newIndex].style.overflowY = "hidden";
    hobbytext[newIndex].style.opacity = 0;
    hobbytext[newIndex].style.height = 0;

    hobbyOpen = newIndex;

    let height = 0;

    clearInterval(animClock);
    animClock = setInterval(frame, 5, oldIndex, newIndex);

    function frame(i, j) {
        if(height == hobbyHeight) {
            clearInterval(animClock);
            hobbytext[i].style = "";
            hobbyheaders[i].style = "";
            hobbytext[j].style = "display: block;";
            hobbyheaders[j].style.cursor = "pointer";
            for(var n=0; n < hobbyheaders.length; n++) {
                if(n == j)
                    hobbyheaders[n].addEventListener("click", closeHobby);
                else 
                    hobbyheaders[n].addEventListener("click", closeOldOpenNewHobby);
            }
        }
        else {
            height += hobbyHeight / 100;
            hobbytext[i].style.height = (hobbyHeight - height) + 'px';
            hobbytext[i].style.opacity = (hobbyHeight - height) / hobbyHeight;
            hobbytext[j].style.height = height + 'px';
            hobbytext[j].style.opacity = height / hobbyHeight;
        }
    }
}

function aboutMeInit() {
    emailCopy.addEventListener("click", copyEmail);

    for(var i=0; i < hobbyheaders.length; i++) {
        const n=i;
        hobbyheaders[i].addEventListener("mouseover", function(){hobbyHover = n});
        hobbyheaders[i].addEventListener("click", openHobby);
    }
}

aboutMeInit();