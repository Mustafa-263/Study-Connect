// Theme toggle
const body = document.body;
const themeToggle = document.getElementById('toggle-theme');

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    themeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Timer functionality
const timerDisplay = document.querySelector('.timer-display');
const timerControl = document.getElementById('timer-control');
let timerInterval;
let timeLeft = 25 * 60; // 25 minutes in seconds

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function toggleTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        timerControl.textContent = 'Start';
    } else {
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                timerControl.textContent = 'Start';
            }
        }, 1000);
        timerControl.textContent = 'Pause';
    }
}

timerControl.addEventListener('click', toggleTimer);

// Music player
const playPauseBtn = document.getElementById('play-pause');
let isPlaying = false;

playPauseBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    playPauseBtn.textContent = isPlaying ? '⏸' : '▶';
});

// Virtual plant animation
const canvas = document.getElementById('plant-canvas');
const ctx = canvas.getContext('2d');
let plantHealth = 100;
let scale = 1; // Scale for hover effect

// Progress bar and focus meter
const progressBar = document.querySelector('.progress');
const progressText = document.querySelector('.progress-text');
const focusMeter = document.querySelector('.meter');
const focusStatus = document.querySelector('.status');
let focusLevel = 100;

function drawPlant() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw pot
    ctx.fillStyle = '#8B4513';
    ctx.beginPath();
    ctx.moveTo(50, 200);
    ctx.lineTo(150, 200);
    ctx.lineTo(130, 150);
    ctx.lineTo(70, 150);
    ctx.closePath();
    ctx.fill();

    // Draw stem
    ctx.strokeStyle = `rgb(0, ${Math.floor(plantHealth * 2.55)}, 0)`;
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(100, 150);
    ctx.quadraticCurveTo(100, 100, 100, 50);
    ctx.stroke();

    // Draw leaves
    const leafSize = (plantHealth / 3) * scale;
    ctx.fillStyle = `rgba(0, ${Math.floor(plantHealth * 2.55)}, 0, 0.7)`;

    // Left leaf
    ctx.beginPath();
    ctx.ellipse(80, 100, leafSize, leafSize / 2, Math.PI / 4, 0, 2 * Math.PI);
    ctx.fill();

    // Right leaf
    ctx.beginPath();
    ctx.ellipse(120, 100, leafSize, leafSize / 2, -Math.PI / 4, 0, 2 * Math.PI);
    ctx.fill();

    // Top leaf
    if (plantHealth > 50) {
        ctx.beginPath();
        ctx.ellipse(100, 50, leafSize / 2, leafSize / 4, 0, 0, 2 * Math.PI);
        ctx.fill();
    }

    // Draw flower
    if (plantHealth > 80) {
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(100, 30, 10, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function updatePlant() {
    plantHealth = Math.max(0, Math.min(100, plantHealth));
    drawPlant();
}

// Update progress bar and focus meter
function updateProgress() {
    progressBar.style.width = `${focusLevel}%`;
    progressText.textContent = `${focusLevel.toFixed(1)}%`;
    focusMeter.style.width = `${focusLevel}%`;
    
    if (focusLevel > 80) {
        focusStatus.textContent = 'Highly Focused';
        focusStatus.style.color = '#2ecc71';
    } else if (focusLevel > 50) {
        focusStatus.textContent = 'Moderately Focused';
        focusStatus.style.color = '#f39c12';
    } else {
        focusStatus.textContent = 'Distracted';
        focusStatus.style.color = '#e74c3c';
    }
}

// Simulate focus changes and update plant health
setInterval(() => {
    focusLevel = Math.max(0, Math.min(100, focusLevel + (Math.random() * 10 - 5)));
    plantHealth = Math.max(0, Math.min(100, plantHealth + (focusLevel - 50) / 10));
    updateProgress();
    updatePlant();
}, 5000);

// Video chat toggle
const toggleVideoBtn = document.getElementById('toggle-video');
const toggleChatBtn = document.getElementById('toggle-chat');
const chatBox = document.getElementById('chat-box');

toggleVideoBtn.addEventListener('click', () => {
    toggleVideoBtn.classList.add('active');
    toggleChatBtn.classList.remove('active');
    chatBox.classList.add('hidden');
});

toggleChatBtn.addEventListener('click', () => {
    toggleChatBtn.classList.add('active');
    toggleVideoBtn.classList.remove('active');
    chatBox.classList.remove('hidden');
});

// Notifications
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.classList.add('notification');
    document.getElementById('notifications').appendChild(notification);
    setTimeout(() => notification.remove(), 5000);
}

// Example notification
setTimeout(() => showNotification('Remember to take a break!'), 10000);

// Initial plant draw
drawPlant();

// Hover effect on plant
canvas.addEventListener('mouseenter', () => {
    scale = 1.2; // Grow plant
    updatePlant();
});

canvas.addEventListener('mouseleave', () => {
    scale = 1; // Shrink plant
    updatePlant();
});
