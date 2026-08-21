// ======================== LOADING & WELCOME SCREEN ========================
document.addEventListener('DOMContentLoaded', function() {
    var loadingScreen = document.getElementById('loadingScreen');
    var loadingMessagesContainer = document.getElementById('loadingMessages');
    var welcomeScreen = document.getElementById('welcomeScreen');
    var welcomeBtn = document.getElementById('welcomeBtn');
    var introMusic = document.getElementById('introMusic');
    var musicStarted = false;

    var loveMessages = [
        "Mayte...",
        "Eres lo más hermoso que me ha pasado...",
        "Cada día te amo más...",
        "La distancia no es nada comparado a lo que siento...",
        "Tú en Bolivia, yo en Perú...",
        "Pero con el mismo corazón...",
        "Eres mi todo...",
        "Y quiero que sepas algo...",
        "Que te amo más de lo que las palabras pueden decir...",
        "Y que haría cualquier cosa por verte sonreír..."
    ];

    var currentMsg = 0;

    // Intentar reproducir música automáticamente
    function tryPlayMusic() {
        if (musicStarted || !introMusic) return;
        introMusic.volume = 0.6;
        introMusic.currentTime = 0;
        introMusic.loop = true;
        introMusic.play().then(function() {
            musicStarted = true;
            startMessages();
        }).catch(function() {});
    }

    // Empezar al cargar
    tryPlayMusic();

    // Si el navegador bloquea, al primer toque
    loadingScreen.addEventListener('click', function() {
        if (!musicStarted) {
            tryPlayMusic();
        }
    });

    function startMessages() {
        if (currentMsg >= loveMessages.length) {
            finishLoading();
            return;
        }

        var msg = document.createElement('div');
        msg.className = 'loading-msg';
        msg.textContent = loveMessages[currentMsg];
        loadingMessagesContainer.appendChild(msg);

        setTimeout(function() {
            msg.classList.add('visible');
        }, 50);

        setTimeout(function() {
            msg.classList.remove('visible');
            msg.classList.add('fade-out');
            setTimeout(function() {
                if (msg.parentNode) msg.parentNode.removeChild(msg);
            }, 800);
            currentMsg++;
            setTimeout(startMessages, 400);
        }, 2500);
    }

    function finishLoading() {
        setTimeout(function() {
            loadingScreen.classList.add('hidden');
            welcomeScreen.classList.add('active');
        }, 800);
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
