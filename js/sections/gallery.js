// ======================== GALLERY SECTION ========================
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                const overlay = document.createElement('div');
                overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:99999;display:flex;align-items:center;justify-content:center;cursor:pointer;';
                const bigImg = document.createElement('img');
                bigImg.src = img.src;
                bigImg.style.cssText = 'max-width:90%;max-height:90%;border-radius:15px;box-shadow:0 0 50px rgba(233,30,99,0.5);';
                overlay.appendChild(bigImg);
                document.body.appendChild(overlay);
                overlay.addEventListener('click', function() {
                    this.remove();
                });
            }
        });
    });
});
