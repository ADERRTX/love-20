// ======================== PROMISES SECTION ========================
document.addEventListener('DOMContentLoaded', function() {
    const promiseCards = document.querySelectorAll('.promise-card');
    promiseCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.promise-ring').style.transform = 'scale(1.3) rotate(15deg)';
        });
        card.addEventListener('mouseleave', function() {
            this.querySelector('.promise-ring').style.transform = 'scale(1) rotate(0deg)';
        });
    });
});
