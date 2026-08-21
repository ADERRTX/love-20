// ======================== PROMESAS PERSONALES ========================
document.addEventListener('DOMContentLoaded', function() {
    var items = document.querySelectorAll('#promesas-personal .promise-item');
    items.forEach(function(item, index) {
        item.style.transitionDelay = (index * 0.1) + 's';
    });
});
