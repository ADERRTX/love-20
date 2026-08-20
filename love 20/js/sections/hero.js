// ======================== HERO JS ========================
document.addEventListener('DOMContentLoaded', function() {
    createStars();
    createFloatingHearts();
    createPetals();
    createFloatingElements();
    updateCounter();
    setInterval(updateCounter, 1000);
});

// ======================== FLOATING ELEMENTS ========================
function createFloatingElements() {
    const container = document.getElementById('floatingElements');
    const symbols = ['❤️', '💕', '💖', '💗', '💝', '💘', '🌸', '✨', '💫', '🌹'];

    for (let i = 0; i < 15; i++) {
        const el = document.createElement('div');
        el.className = 'floating-el';
        el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        el.style.left = Math.random() * 100 + 'vw';
        const size = Math.random() * 1.2 + 0.8;
        el.style.fontSize = size + 'rem';
        el.style.animationDuration = (Math.random() * 12 + 15) + 's';
        el.style.animationDelay = Math.random() * 10 + 's';
        container.appendChild(el);
    }
}

function createStars() {
    const container = document.getElementById('starsContainer');
    for (let i = 0; i < 80; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        star.style.animationDelay = Math.random() * 3 + 's';
        container.appendChild(star);
    }
}

function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '💘', '💞'];

    function addHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
        heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 13000);
    }

    setInterval(addHeart, 500);
}

function createPetals() {
    const container = document.getElementById('petalsContainer');
    const colors = ['#e91e63', '#ff4081', '#ff80ab', '#ff1744', '#f50057'];

    function addPetal() {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 10 + 8;
        petal.style.width = size + 'px';
        petal.style.height = size + 'px';
        petal.style.animationDuration = (Math.random() * 8 + 10) + 's';
        container.appendChild(petal);
        setTimeout(() => petal.remove(), 18000);
    }

    setInterval(addPetal, 900);
}

// ======================== COUNTER ========================
function updateCounter() {
    const startDate = new Date('2024-02-20T00:00:00');
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}