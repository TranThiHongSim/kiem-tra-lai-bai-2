document.addEventListener('DOMContentLoaded', function () {
    var images = document.querySelectorAll('.image img');
    var prev = document.querySelector('.prev');
    var next = document.querySelector('.next');
    var close = document.querySelector('.close');
    var galleryImg = document.querySelector('.gallery_inner img');
    var gallery = document.querySelector('.gallery');

    var currentIndex = 0;
    var timer; // Biến để lưu trữ ID của setInterval

    function showGallery() {
    // Ẩn gallery trước khi hiển thị lại
    gallery.classList.remove('show');
    gallery.classList.remove('zoomIn'); // Loại bỏ animation class khi ẩn
    gallery.classList.add('hide');

    // Hiển thị gallery
    gallery.classList.add('show');
    gallery.classList.add('zoomIn'); // Thêm animation class khi hiển thị

    // Lấy ảnh hiện tại
    var currentImage = images[currentIndex].getAttribute('src');
    galleryImg.setAttribute('src', currentImage);

    // Làm mờ các ảnh không được chọn
    images.forEach(function (img, index) {
        if (index === currentIndex) {
            img.classList.add('active');
            img.classList.remove('dim');
        } else {
            img.classList.add('dim');
            img.classList.remove('active');
        }
    });
}

    images.forEach(function (item, index) {
        item.addEventListener('click', function () {
            currentIndex = index;
            showGallery();
        });
    });

    // Hàm để chuyển đổi sang ảnh tiếp theo
    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showGallery();
    }

    // Hàm để chuyển đổi sang ảnh trước đó
    function showPrevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showGallery();
    }

    // Thiết lập chạy tự động
    timer = setInterval(showNextImage, 3000); // Chuyển đổi mỗi 3 giây

    // Dừng hoặc khởi động lại chạy tự động khi người dùng tương tác
    gallery.addEventListener('mouseover', function () {
        clearInterval(timer);
    });

    gallery.addEventListener('mouseleave', function () {
        timer = setInterval(showNextImage, 3000);
    });

    close.addEventListener('click', function () {
        gallery.classList.add('hide');
        gallery.classList.remove('show');
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            gallery.classList.remove('show');
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    });

    next.addEventListener('click', showNextImage);
    prev.addEventListener('click', showPrevImage);
});
