// ======================== REASONS SECTION ========================
document.addEventListener('DOMContentLoaded', function() {
    const reasonCards = document.querySelectorAll('.reason-card');
    reasonCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.reason-icon').style.transform = 'scale(1.3) rotate(10deg)';
        });
        card.addEventListener('mouseleave', function() {
            this.querySelector('.reason-icon').style.transform = 'scale(1) rotate(0deg)';
        });
    });
});
