let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "green", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// sound effects ........................
let endSound = document.querySelector(".endSound");
let gameOverSound = function(){
    endSound.play();
}
let startSound = document.querySelector(".startSound");
let gameStartSound = function(){
    startSound.play();
}
// let tabSound = document.querySelector(".tabSoudn");
// let btnSound = function(){
//     tabSound.play();
// }

// koi bhi key press karne pe game start ho jayega
document.addEventListener("keypress", function(){
    if(started == false){
        console.log("Game started");
        started = true;

        levelUp();
        gameStartSound();
    }
});


function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

// user flash press function
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}
// level up hoga UI pe and background color box ka change hoga bhut km time k liye
function levelUp(){
// jese hi level up hoga userSeq empty ho jayega matlab user ko starting se saari values daalni padengi
    userSeq = []; 
    level++;
    h2.innerText = `level ${level}`;

    // random button ko choose karna hai
    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);      // box choose kara hai (red, green, yellow ya purple)
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    // button ko flash karne vala function
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

// function to check 
let currlevel = 0;
function checkAns(idx){
    // console.log("curr level : ", level);
    // let idx = level-1;
    
    if(userSeq[idx] === gameSeq[idx]){
        // console.log("same value");
        if(userSeq.length == gameSeq.length){   // agr user ne saare color correct press kiye hai and jo abhi press kiya hai voh aakhiri color tha
            setTimeout(levelUp, 500);
            // levelUp(); 
        }
    }
    else{
        h2.innerHTML = `Game Over! Your score was <b>${level}</b>. Press any key to restart the game.`;
        document.querySelector("body").style.backgroundColor = "red";

        gameOverSound();

        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white"; 
        }, 100);

        let highScore = document.querySelector("h2.highscore");

        if(currlevel >= level){
            highScore.innerText = `Your High Score is ${currlevel}.`;
        }
        else{
            highScore.innerText = `Your High Score is ${level}.`;
            currlevel = level;
        }

        resetGame();
    }
}

// button press ka function
function btnPress(){
    let btn = this;
    userFlash(btn);
    // console.log(this);  // this yaha per jo bhi button press hua hai voh hai

    let userColor = btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");

for(let btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function resetGame(){
    started = false;
    gameSeq = []; 
    userSeq = [];
    level = 0;
}