// ======================== FINAL JS ========================
document.addEventListener('DOMContentLoaded', function() {
    initConfettiBtn();
    initVideoAutoplay();
});

function initConfettiBtn() {
    const btn = document.getElementById('confettiBtn');
    if (btn) {
        btn.addEventListener('click', () => createConfetti(70));
    }
}

function initVideoAutoplay() {
    document.addEventListener('click', function() {
        const iframe = document.getElementById('youtubePlayer');
        if (iframe && iframe.src && !iframe.src.includes('autoplay=1')) {
            iframe.src += '&autoplay=1';
        }
    }, { once: true });
}