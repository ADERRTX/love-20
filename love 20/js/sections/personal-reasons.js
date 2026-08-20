// ======================== PERSONAL REASONS SECTION ========================
document.addEventListener('DOMContentLoaded', function() {
    const personalCards = document.querySelectorAll('.personal-card');
    personalCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.personal-card-icon').style.transform = 'scale(1.3)';
        });
        card.addEventListener('mouseleave', function() {
            this.querySelector('.personal-card-icon').style.transform = 'scale(1)';
        });
    });
});
