// ====== VERİLER ======
let xp = Number(localStorage.getItem("xp")) || 0;
let level = Number(localStorage.getItem("level")) || 1;

let freeBreaks = Number(localStorage.getItem("freeBreaks"));
if (isNaN(freeBreaks)) freeBreaks = 2;

// kronometre
let timerInterval = null;
let seconds = 0;

// ====== GÜNCELLE ======
function updateUI() {
  document.getElementById("xp").innerText = xp;
  document.getElementById("level").innerText = level;
}

function save() {
  localStorage.setItem("xp", xp);
  localStorage.setItem("level", level);
  localStorage.setItem("freeBreaks", freeBreaks);
}

// ====== LEVEL ======
function checkLevel() {
  const needed = level * 500;
  if (xp >= needed) {
    level++;
    alert("Level atladın! 🎉");
  }
}

// ====== XP İŞLEMLERİ ======
function addXP(amount) {
  xp += amount;
  if (xp < 0) xp = 0;
  checkLevel();
  save();
  updateUI();
}

// ====== BUTONLAR ======
function study() {
  addXP(100);
}

function video1() {
  addXP(80);
}

function video2() {
  addXP(140);
}

function smoke() {
  addXP(-20);
}

function break10() {
  if (freeBreaks > 0) {
    freeBreaks--;
    alert("Ücretsiz mola kullanıldı ☕");
  } else {
    addXP(-40);
  }
  save();
}

function break30() {
  if (freeBreaks > 0) {
    freeBreaks--;
    alert("Ücretsiz mola kullanıldı 🛋️");
  } else {
    addXP(-80);
  }
  save();
}

// ====== KRONOMETRE (BAĞIMSIZ) ======
function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    seconds++;
    updateTimer();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  stopTimer();
  seconds = 0;
  updateTimer();
}

function updateTimer() {
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  document.getElementById("timer").innerText = `${h}:${m}:${s}`;
}

// ====== BAŞLAT ======
updateUI();
updateTimer();
