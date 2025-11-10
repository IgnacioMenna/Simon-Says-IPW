"use strict";

document.addEventListener("DOMContentLoaded", function () {

  var h2 = document.getElementById("game-info");
  var startBtn = document.getElementById("start-btn");
  var playerInput = document.getElementById("player-name");
  var errorMsg = document.getElementById("error-msg");
  var startScreen = document.getElementById("start-screen");
  var restartBtn = document.getElementById("restart-btn");

  var gameSeq = [];
  var userSeq = [];
  var btns = ["red", "blue", "green", "yellow"];
  var started = false;
  var level = 0;
  var score = 0;
  var playerName = "";
  var buttonsEnabled = false;

  function playSound(color) {
    try {
      var audio = new Audio("audios/" + color + ".mp3");
      audio.play();
    } catch (e) {
      console.warn("Audio play failed:", e);
    }
  }

  function gameFlash(btn) {
    btn.classList.add("flash");
    playSound(btn.id);
    setTimeout(function () {
      btn.classList.remove("flash");
    }, 250);
  }

  function userFlash(btn) {
    btn.classList.add("userFlash");
    playSound(btn.id);
    setTimeout(function () {
      btn.classList.remove("userFlash");
    }, 250);
  }

  function levelUp() {
    userSeq = [];
    level++;
    score += 10;
    h2.innerText = "Player: " + playerName + " — Level " + level + " — Score: " + score;

    var randIdx = Math.floor(Math.random() * 4);
    var randColor = btns[randIdx];
    gameSeq.push(randColor);

    playSequence();
  }

  function playSequence() {
    buttonsEnabled = false;
    var i = 0;
    var interval = setInterval(function () {
      var color = gameSeq[i];
      var btn = document.getElementById(color);
      gameFlash(btn);
      i++;
      if (i >= gameSeq.length) {
        clearInterval(interval);
        buttonsEnabled = true;
      }
    }, 600);
  }

  function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
      if (userSeq.length === gameSeq.length) {
        setTimeout(levelUp, 800);
      }
    } else {
      showGameOver();
    }
  }

  function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    score = 0;
  }

  function showGameOver() {
    var modal = document.getElementById("game-over-modal");
    var finalScore = document.getElementById("final-score");
    modal.style.display = "block";
    finalScore.innerHTML = "Your score was <b>" + score + "</b>";
    reset();
  }

  function hideGameOver() {
    var modal = document.getElementById("game-over-modal");
    modal.style.display = "none";
  }

  function btnPress() {
    if (!started || !buttonsEnabled) return;
    if (userSeq.length >= gameSeq.length) return;
    var btn = this;
    userFlash(btn);
    var userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
    btn.blur();
  }

  var allBtns = document.querySelectorAll(".btn");
  for (var k = 0; k < allBtns.length; k++) {
    allBtns[k].addEventListener("click", btnPress);
  }

  startBtn.addEventListener("click", function () {
    var nameValue = playerInput.value.trim();

    if (nameValue.length >= 3 && /^[A-Za-z\s]+$/.test(nameValue)) {
      playerName = nameValue;
      startScreen.style.display = "none";
      h2.style.display = "block";
      errorMsg.style.display = "none";

      reset();
      started = true;
      levelUp();
    } else {
      errorMsg.style.display = "block";
    }
  });

  playerInput.addEventListener("input", function () {
    errorMsg.style.display = "none";
  });

  restartBtn.addEventListener("click", function () {
    hideGameOver();
    reset();
    startScreen.style.display = "none";
    h2.style.display = "block";
    h2.innerText = "Player: " + playerName + " — Level 0 — Score: 0";
    started = true;
    levelUp();
  });

});
