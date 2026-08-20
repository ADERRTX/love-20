// ======================== TIMELINE SECTION ========================
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(function(item) {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.timeline-content').style.transform = 'translateY(-5px)';
        });
        item.addEventListener('mouseleave', function() {
            this.querySelector('.timeline-content').style.transform = 'translateY(0)';
        });
    });
});
