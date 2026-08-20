// ======================== MUSIC JS ========================
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('bgMusic');
    const overlay = document.getElementById('musicOverlay');
    const startBtn = document.getElementById('musicStartBtn');
    const floatPlayer = document.getElementById('musicFloatPlayer');
    const lyricsOverlay = document.getElementById('lyricsOverlay');
    const closeBtn = document.getElementById('floatCloseBtn');
    const playBtn = document.getElementById('floatPlayBtn');
    const progressBar = document.getElementById('floatProgressBar');
    const visualizer = document.getElementById('visualizer');
    const currentTimeEl = document.getElementById('currentTime');
    const totalTimeEl = document.getElementById('totalTime');

    let isPlaying = false;
    let currentLineIndex = -1;
    
    // Control de scroll y autoscroll automático
    let isAutoScrollEnabled = true;
    let isAutoScrollPausedTemporarily = false;
    let autoScrollResetTimeout = null;
    let isScrollingToSection = false;
    let activeSectionId = '';

    // ========== MAPEO DE SECCIONES Y VIBRAS ==========
    const sectionsMap = [
        { id: "hero", start: 0, color: "233, 30, 99" },
        { id: "foto", start: 24, color: "156, 39, 176" },
        { id: "carta", start: 46, color: "255, 23, 68" },
        { id: "historia", start: 64, color: "0, 188, 212" },
        { id: "razones", start: 83, color: "255, 87, 34" },
        { id: "promesas", start: 114, color: "255, 215, 0" },
        { id: "momentos", start: 131, color: "79, 195, 247" },
        { id: "razones-personal", start: 142, color: "255, 64, 129" },
        { id: "countdown", start: 156, color: "255, 193, 7" },
        { id: "promesas-personal", start: 163, color: "233, 30, 99" },
        { id: "video", start: 170, color: "224, 64, 251" },
        { id: "tu-hombre", start: 173, color: "233, 30, 99" },
        { id: "final", start: 175, color: "233, 30, 99" }
    ];

    // ========== LETRA CON TIEMPOS REALES ==========
    const lyrics = [
        { time: 24,  text: "Quiero decirte que tú me encantas" },
        { time: 29,  text: "Quiero que sepas que eres una linda mujer" },
        { time: 35,  text: "Y no me dejes aquí solito" },
        { time: 41,  text: "Si tú me dejas yo siempre te amé" },
        { time: 46,  text: "Te miro los ojos me tienes loco" },
        { time: 52,  text: "Y tu sonrisa se me pega en la mente" },
        { time: 58,  text: "Me gusta tu aroma, todo y tu moda" },
        { time: 61,  text: "Vente conmigo, sin ti qué voy a hacer" },
        { time: 64,  text: "💕 Dame amor 💕" },
        { time: 69,  text: "💕 Dame amor 💕" },
        { time: 72,  text: "💔 No te vayas 💔" },
        { time: 74,  text: "💕 Dame amor 💕" },
        { time: 80,  text: "💕 Dame amor 💕" },
        { time: 83,  text: "💔 No te vayas 💔" },
        { time: 114, text: "Quiero decirte que tú me encantas" },
        { time: 117, text: "Quiero que sepas que eres una linda mujer" },
        { time: 120, text: "Y no me dejes aquí solito" },
        { time: 121, text: "Si tú me dejas yo siempre te amé" },
        { time: 122, text: "Te miro los ojos me tienes loco" },
        { time: 126, text: "Y tu sonrisa se me pega en la mente" },
        { time: 128, text: "Me gusta tu aroma, todo y tu moda" },
        { time: 131, text: "Vente conmigo, sin ti qué voy a hacer" },
        { time: 136, text: "💕 Dame amor 💕" },
        { time: 139, text: "💕 Dame amor 💕" },
        { time: 142, text: "💔 No te vayas 💔" },
        { time: 147, text: "💕 Dame amor 💕" },
        { time: 150, text: "💕 Dame amor 💕" },
        { time: 153, text: "💔 No te vayas 💔" },
        { time: 156, text: "Te miro los ojos me tienes loco" },
        { time: 158, text: "Y tu sonrisa se me pega en la mente" },
        { time: 161, text: "Me gusta tu aroma, todo y tu moda" },
        { time: 163, text: "Vente conmigo, sin ti qué voy a hacer" },
        { time: 170, text: "💕 Dame amor 💕" },
        { time: 173, text: "💕 Dame amor 💕" },
        { time: 175, text: "💔 No te vayas 💔" }
    ];

    // Crear elementos de letra
    function createLyrics() {
        lyricsOverlay.innerHTML = '';
        lyrics.forEach((line) => {
            const el = document.createElement('div');
            el.className = 'lyric-line';
            el.textContent = line.text;
            el.dataset.time = line.time;
            lyricsOverlay.appendChild(el);
        });
    }

    // Desplazamiento suave y controlado a una sección
    function scrollToSection(id) {
        const secEl = document.getElementById(id);
        if (!secEl) return;
        
        isScrollingToSection = true;
        
        // Auto-abrir sobre de carta de amor si entramos a la sección 'carta'
        if (id === 'carta') {
            const envelope = document.getElementById('envelope');
            const letterCard = document.getElementById('letterCard');
            if (envelope && letterCard && envelope.style.display !== 'none') {
                envelope.classList.add('open');
                setTimeout(() => {
                    envelope.style.display = 'none';
                    letterCard.style.display = 'block';
                    if (typeof createConfetti === 'function') {
                        createConfetti(25);
                    }
                }, 800);
            }
        }
        
        secEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        setTimeout(() => {
            isScrollingToSection = false;
        }, 1200);
    }

    // Sincronizar letra con el reproductor
    function syncLyrics() {
        if (!audio) return;
        const t = audio.currentTime;
        const allLines = lyricsOverlay.querySelectorAll('.lyric-line');

        let newIdx = -1;
        for (let i = lyrics.length - 1; i >= 0; i--) {
            if (t >= lyrics[i].time) {
                newIdx = i;
                break;
            }
        }

        if (newIdx !== currentLineIndex) {
            currentLineIndex = newIdx;
            allLines.forEach((line, i) => {
                line.classList.remove('active', 'past');
                if (i === currentLineIndex) {
                    line.classList.add('active');
                } else if (i < currentLineIndex) {
                    line.classList.add('past');
                }
            });
        }

        if (audio.duration) {
            progressBar.style.width = ((t / audio.duration) * 100) + '%';
            currentTimeEl.textContent = formatTime(t);
            totalTimeEl.textContent = formatTime(audio.duration);
        }
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return mins + ':' + (secs < 10 ? '0' : '') + secs;
    }

    // Detectar y actualizar sección activa
    function updateActiveSection() {
        if (!audio) return;
        const t = audio.currentTime;
        
        let activeSec = null;
        for (let i = sectionsMap.length - 1; i >= 0; i--) {
            if (t >= sectionsMap[i].start) {
                activeSec = sectionsMap[i];
                break;
            }
        }
        
        if (activeSec && activeSec.id !== activeSectionId) {
            activeSectionId = activeSec.id;
            
            // Activar clase en body
            document.body.classList.add('music-active-mode');
            
            // Resaltar sección activa en página
            sectionsMap.forEach(sec => {
                const el = document.getElementById(sec.id);
                if (el) {
                    if (sec.id === activeSectionId) {
                        el.classList.add('music-active-section');
                        el.classList.add('visible'); // IntersectionObserver helper
                    } else {
                        el.classList.remove('music-active-section');
                    }
                }
            });
            
            // Cambiar color de partículas
            if (window.updateParticleVibe) {
                window.updateParticleVibe(activeSec.color);
            }
            
            // Auto-scroll si está habilitado y no en pausa temporal
            if (isAutoScrollEnabled && !isAutoScrollPausedTemporarily && !isScrollingToSection) {
                scrollToSection(activeSectionId);
            }
        }
    }

    // Iniciar reproductor y música
    function startMusic() {
        overlay.classList.add('hidden');
        floatPlayer.classList.add('active');
        lyricsOverlay.classList.add('active');
        visualizer.classList.remove('paused');
        playBtn.innerHTML = '⏸️';
        isPlaying = true;
        document.body.classList.add('music-active-mode');

        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.log('Error:', e));
        }
    }

    // Control play/pause
    function togglePlay() {
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            playBtn.innerHTML = '▶️';
            visualizer.classList.add('paused');
            document.body.classList.remove('music-active-mode');
            
            // Remover resaltados para lectura libre
            sectionsMap.forEach(sec => {
                const el = document.getElementById(sec.id);
                if (el) el.classList.remove('music-active-section');
            });
        } else {
            audio.play().then(() => {
                isPlaying = true;
                playBtn.innerHTML = '⏸️';
                visualizer.classList.remove('paused');
                document.body.classList.add('music-active-mode');
                updateActiveSection();
            }).catch(e => console.log('Error:', e));
        }
    }

    // Cerrar reproductor flotante
    function closePlayer() {
        floatPlayer.classList.remove('active');
        lyricsOverlay.classList.remove('active');
        document.body.classList.remove('music-active-mode');
        sectionsMap.forEach(sec => {
            const el = document.getElementById(sec.id);
            if (el) el.classList.remove('music-active-section');
        });
        if (audio) {
            audio.pause();
            isPlaying = false;
            playBtn.innerHTML = '▶️';
            visualizer.classList.add('paused');
        }
    }

    // Suscribir eventos del audio
    if (audio) {
        audio.addEventListener('timeupdate', () => {
            syncLyrics();
            updateActiveSection();
        });
        audio.addEventListener('ended', function() {
            audio.currentTime = 0;
            audio.play();
            currentLineIndex = -1;
            activeSectionId = '';
        });
        audio.addEventListener('loadedmetadata', function() {
            if (totalTimeEl) {
                totalTimeEl.textContent = formatTime(audio.duration);
            }
        });
    }

    // Hacer la barra de progreso clickeable
    const progressContainer = document.querySelector('.music-float-progress');
    if (progressContainer) {
        progressContainer.style.cursor = 'pointer';
        progressContainer.addEventListener('click', function(e) {
            if (!audio || !audio.duration) return;
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percent = x / rect.width;
            audio.currentTime = percent * audio.duration;
        });
    }

    // Pausar autoscroll temporalmente al detectar scroll del usuario
    window.addEventListener('scroll', function() {
        if (!isScrollingToSection && isAutoScrollEnabled) {
            isAutoScrollPausedTemporarily = true;
            if (autoScrollResetTimeout) clearTimeout(autoScrollResetTimeout);
            
            // Reanudar tras 5 segundos de inactividad
            autoScrollResetTimeout = setTimeout(() => {
                isAutoScrollPausedTemporarily = false;
                if (activeSectionId) {
                    scrollToSection(activeSectionId);
                }
            }, 5000);
        }
    });

    // Enlazar botones del reproductor
    startBtn.addEventListener('click', startMusic);
    playBtn.addEventListener('click', togglePlay);
    closeBtn.addEventListener('click', closePlayer);

    // Escuchar evento de bienvenida para iniciar música automáticamente
    document.addEventListener('welcomeComplete', function() {
        document.body.style.overflow = 'auto';
        // Ocultar overlay original de música
        if (overlay) overlay.classList.add('hidden');
        
        // Asegurar que la música de carga esté pausada
        const introMusic = document.getElementById('introMusic');
        if (introMusic) {
            introMusic.pause();
            introMusic.currentTime = 0;
            introMusic.loop = false;
        }
        
        startMusic();
    });

    // Inicializar
    createLyrics();
    visualizer.classList.add('paused');
});