// ======================== LETTER JS ========================
document.addEventListener('DOMContentLoaded', function() {
    initEnvelope();
});

function initEnvelope() {
    const envelope = document.getElementById('envelope');
    const letterCard = document.getElementById('letterCard');

    if (!envelope || !letterCard) return;

    envelope.addEventListener('click', function() {
        envelope.classList.add('open');

        setTimeout(() => {
            envelope.style.display = 'none';
            letterCard.style.display = 'block';
            createConfetti(35);
            letterCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 800);
    });
}