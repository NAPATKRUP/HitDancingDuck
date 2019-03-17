var s_bg = new Audio("./sound/bg.mp3");
var s_hit = new Audio("./sound/hit.mp3");
var s_nope = new Audio("./sound/nope.mp3");
var s_quack = new Audio("./sound/quack.mp3");
var s_lion = new Audio("./sound/lion.wav");
var s_rat = new Audio("./sound/rat.wav");
var s_bomb = new Audio("./sound/bomb.wav");
var s_toom  = new Audio("./sound/toom.wav");
var s_left = new Audio("./sound/left.mp3");
var s_click = new Audio("./sound/click.wav");
var s_countdown = new Audio("./sound/countdown.wav");
var main = document.getElementById("main");
var gamestart = document.getElementById("gamestart");
var gameover = document.getElementById("gameover");
var loadingstart = document.getElementById("loadingstart");
var presshere = document.getElementById("presshere");
var load = document.getElementById("load");
var myTime;

pits = document.querySelectorAll('pit');
preparing = 5;
birth = 1500;
delay = 3000;

function startGame(){
    soundClick();
    main.style.display = "block";
    gamestart.style.display = "none";
    ready();
}

function ready(){
    soundClick();
    main.style.display = "block";
    gameover.style.display = "none";
    score = 0;
    time = 30;
    updateTime();
    updatScore();
    for (var i = 0; i < pits.length; i++) {
        pits[i].setAttribute("status","blank");
    }
    for (let i = 0; i < preparing; i++) {
        setTimeout(
            function(){
                soundCountdown();
                console.log(i);
                subTitle.innerText = "Ready! Game start in "+(preparing-i);
                subTitle.style.color = "#FFFFFF";
            },i*1000);
    }
    setTimeout(
        function(){
            subTitle.innerText = "Let's hit it!";
            subTitle.style.color = "#FFFFFF";
            countdown();
            reloadMole();
        }
        ,preparing*1000);
}

function countdown(){
    cd = setInterval(
        function(){
            if (time > 0) {
                time--;
                updateTime();
            }
            else{
                clearInterval(cd);
            }
        }
        ,1000)
}

function reloadMole(){
    if (time>0) {
        var randomPit = Math.floor(Math.random() * 16);
        var monster = Math.floor(Math.random()*10)%4;
        if (monster == 0) {
            pits[randomPit].setAttribute("status","duck");
            soundQuack();
        }
        else if (monster == 1) {
            pits[randomPit].setAttribute("status","lion");
            soundLion();
        }
        else if (monster == 2) {
            pits[randomPit].setAttribute("status","rat");
            soundRat();
        }
        else {
            pits[randomPit].setAttribute("status","bomb");
            soundBomb();
        }
        setTimeout(
            function(){
                if (time>0) {
                    pits[randomPit].setAttribute("status","blank");
                }
            }
            ,delay);
        setTimeout(
            function(){
            reloadMole()
        }
        ,birth);
    }
}

function hit(pit){
    if (time>0) {
        var status = pit.getAttribute("status");
        if (status == "duck" || status == "lion" || status == "rat") {
            pit.setAttribute("status","collect");
            if (status == "duck") {
                subTitle.innerText = "score + 3";
                score += 3;
            }
            else if (status == "lion") {
                subTitle.innerText = "score + 2";
                score += 2;
            }
            else {
                subTitle.innerText = "score + 1";
                score += 1;
            }
            soundHit();
            subTitle.style.color = "#00FF00";
        }
        else if(status == "blank" || status == "bomb"){
            pit.setAttribute("status","miss");
            if (status == "bomb") {
                score -= 2;
                subTitle.innerText = "score - 2";
                soundToom();
            }
            else {
                score -= 1;
                subTitle.innerText = "score - 1";
                soundNope();
            }
            subTitle.style.color = "#FF0000";
        }
        updatScore();
    }
}

function updatScore(){
    theScore.innerText = score;
}

function updateTime(){
    theTime.innerText = time;
    if (time == 0) {
        soundLeft();
        main.style.display = "none";
        gameover.style.display = "block";
        endScore.innerText = score;
    }
}

//Set to Menu
function menuGame() {
    soundClick();
    soundBg();
    document.body.style.backgroundImage = "url('./image/background.gif')";
    load.style.display = "none";
    presshere.style.display = "none";
    gamestart.style.display = "block";
}

//Sound
function soundClick() {
    s_click.pause();
    s_click.currentTime = 0;
    s_click.play();
}

function soundBg() {
    s_bg.currentTime = 0;
    s_bg.play();
    s_bg.loop = true;
}

function soundHit() {
    s_hit.pause();
    s_hit.currentTime = 0;
    s_hit.play();
}

function soundNope() {
    s_nope.pause();
    s_nope.currentTime = 0;
    s_nope.play();
}

function soundQuack() {
    s_quack.pause();
    s_quack.currentTime = 0;
    s_quack.play();
}

function soundLion() {
    s_lion.pause();
    s_lion.currentTime = 0;
    s_lion.play();
}

function soundRat() {
    s_rat.pause();
    s_rat.currentTime = 0;
    s_rat.play();
}

function soundBomb() {
    s_bomb.pause();
    s_bomb.currentTime = 0;
    s_bomb.play();
}

function soundToom() {
    s_toom.pause();
    s_toom.currentTime = 0;
    s_toom.play();
}

function soundLeft() {
    s_left.pause();
    s_left.currentTime = 0;
    s_left.play();
}

function soundCountdown() {
    s_countdown.pause();
    s_countdown.currentTime = 0;
    s_countdown.play();
}

//Loading Page
function myFunction() {
    myTime = setTimeout(showPage, 500);
}

function showPage() {
    loadingstart.style.display = "none";
    presshere.style.display = "block";
}
