let counter = document.querySelector(".counter");
let btn = document.querySelector(".play");
let timerstop = document.querySelector(".stop");
let Reset = document.querySelector(".reset");
let stopwatch = document.querySelector(".stopwatch");
let timer = document.querySelector(".timer");
let swetch = document.querySelector(".switch");
let addbtn = document.querySelector(".addbtn");
let thirtySec = document.querySelector(".thirty-sec");
let oneMint = document.querySelector(".one-mint");
let fiveMint = document.querySelector(".five-mint");

let milsec = 0;
let sec = 0;
let min = 0;
let countdown = 59;
let count = 0;

let intervalID;
let mode = "timer";

if (mode === "timer") {
    count = 5;
    countdown = 0;
    counter.value = count + ".00";
} else {
    count = 0;
    countdown = 59;
    if (countdown < 10) {
        counter.value = "0.0" + countdown;
    } else {
        counter.value = "0." + countdown;
    }
}

let resetValues = () => {
    milsec = 0;
    sec = 0;
    min = 0;
    countdown = 0;
    count = 5;
    counter.value = count + ".00";
};

let resetWatch = () => {
    milsec = 0;
    sec = 0;
    min = 0;
    countdown = 0;
    count = 0;
    counter.value = count + ".00";
};

let stoptime = () => {
    clearInterval(intervalID);
    intervalID = setInterval(() => {
        milsec++;
        if (milsec === 100) {
            milsec = 0;
            sec++;
        }
        if (sec === 60) {
            sec = 0;
            min++;
        }

        if (min > 0) {
            if (sec < 10) {
                counter.value = min + ":0" + sec;
            } else {
                counter.value = min + ":" + sec;
            }
        } else {
            if (milsec < 10) {
                counter.value = sec + ".0" + milsec;
            } else {
                counter.value = sec + "." + milsec;
            }
        }
    }, 10);
    mode = "stopwatch";
};

let runtime = () => {
    clearInterval(intervalID);
    mode = "timer";
    intervalID = setInterval(() => {
        if (count === 0 && countdown === 0) {
            clearInterval(intervalID);
            counter.value = "0.00";
        } else {
            let countdownString;
            if (countdown < 10) {
                countdownString = '0' + countdown;
            } else {
                countdownString = countdown;
            }

            counter.value = count + '.' + countdownString;
            countdown--;
            if (countdown < 0) {
                countdown = 59;
                count--;
            }
        }
    }, 1000);
};

btn.addEventListener("click", () => {
    if (mode === "stopwatch") {
        stoptime();
    } else if (mode === "timer") {
        runtime();
        addbtn.style.display = "none";
    }
});

timerstop.addEventListener("click", () => {
    clearInterval(intervalID);
    if (mode === "timer") {
        addbtn.style.display = "block";
        fiveMint.style.display = "none";
    }
});

Reset.addEventListener("click", () => {
    clearInterval(intervalID);

    if (mode === "timer") {
        resetValues();
    } else {
        resetWatch();
    }

    if (mode === "timer") {
        addbtn.style.display = "block";
        fiveMint.style.display = "block";
        addbtn.style.justifyContent = "space-between";
        addbtn.style.marginBottom = "35px";
        for (let i = 0; i < addbtn.children.length; i++) {
            addbtn.children[i].style.display = "inline-block";
        }
    }
});

timer.addEventListener("click", () => {
    clearInterval(intervalID);
    resetValues();
    mode = "timer";
    addbtn.style.display = "block";
});

stopwatch.addEventListener("click", () => {
    clearInterval(intervalID);
    resetWatch();
    mode = "stopwatch";
    addbtn.style.display = "none";
});

thirtySec.addEventListener("click", () => {
    if (mode === "timer") {
        countdown += 30;

        if (countdown >= 60) {
            count += Math.floor(countdown / 60);
            countdown = countdown % 60;
        }

        let countdownString;

        if (countdown < 10) {
            countdownString = '0' + countdown;
        } else {
            countdownString = countdown;
        }
        counter.value = count + '.' + countdownString;
    }
});

oneMint.addEventListener("click", () => {
    if (mode === "timer") {
        count++;
        if (countdown < 10) {
            counter.value = count + ".0" + countdown;
        } else {
            counter.value = count + "." + countdown;
        }
    }
});

fiveMint.addEventListener("click", () => {
    if (mode === "timer") {
        count += 5;
        if (countdown < 10) {
            counter.value = count + ".0" + countdown;
        } else {
            counter.value = count + "." + countdown;
        }
    }
});
