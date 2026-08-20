// ======================== VIDEO SECTION ========================
document.addEventListener('DOMContentLoaded', function() {
    const messageBox = document.querySelector('.romantic-message-box');
    if (messageBox) {
        messageBox.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 0 60px rgba(233, 30, 99, 0.5)';
        });
        messageBox.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 0 50px rgba(233, 30, 99, 0.3)';
        });
    }
});
