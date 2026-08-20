// ======================== LOADING & WELCOME SCREEN ========================
document.addEventListener('DOMContentLoaded', function() {
    var loadingScreen = document.getElementById('loadingScreen');
    var welcomeScreen = document.getElementById('welcomeScreen');
    var welcomeBtn = document.getElementById('welcomeBtn');
    var introMusic = document.getElementById('introMusic');
    var musicStarted = false;

    loadingScreen.addEventListener('click', startExperience);
    loadingScreen.addEventListener('touchstart', startExperience);

    function startExperience() {
        if (musicStarted) return;
        musicStarted = true;

        loadingScreen.classList.add('started');

        if (introMusic) {
            introMusic.volume = 0.6;
            introMusic.currentTime = 0;
            introMusic.loop = true;
            introMusic.play().catch(function() {});
        }

        setTimeout(function() {
            loadingScreen.classList.add('hidden');
            welcomeScreen.classList.add('active');
        }, 1200);
    }

    if (welcomeBtn) {
        welcomeBtn.addEventListener('click', function() {
            if (introMusic) {
                introMusic.pause();
                introMusic.currentTime = 0;
                introMusic.loop = false;
            }

            welcomeScreen.classList.add('hidden');
            document.dispatchEvent(new CustomEvent('welcomeComplete'));
        });
    }

    document.body.style.overflow = 'hidden';
});
