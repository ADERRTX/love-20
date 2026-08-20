// ======================== MY MAN SECTION ========================
document.addEventListener('DOMContentLoaded', function() {
    const myManPhotos = document.querySelectorAll('.my-man-photo');
    myManPhotos.forEach(function(photo) {
        photo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15) rotate(5deg)';
        });
        photo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});
