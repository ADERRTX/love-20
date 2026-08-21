// ======================== RAZONES POR LAS QUE TE AMO ========================
document.addEventListener('DOMContentLoaded', function() {
    var cards = document.querySelectorAll('.razon-card');
    
    cards.forEach(function(card, index) {
        card.style.transitionDelay = (index * 0.1) + 's';
    });
});
