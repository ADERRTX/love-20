// ======================== PHOTO SECTION ========================
document.addEventListener('DOMContentLoaded', function() {
    const photoFrame = document.querySelector('.photo-frame');
    if (photoFrame) {
        photoFrame.addEventListener('mouseenter', function() {
            this.querySelector('.photo-real').style.transform = 'scale(1.05)';
        });
        photoFrame.addEventListener('mouseleave', function() {
            this.querySelector('.photo-real').style.transform = 'scale(1)';
        });
    }
});
