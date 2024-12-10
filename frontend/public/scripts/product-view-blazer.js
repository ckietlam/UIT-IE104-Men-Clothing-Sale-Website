function changeImage(imageName) {
    // Tìm thẻ hình ảnh chính (main-image)
    const mainImage = document.getElementById("main-image");
    // Thay đổi thuộc tính src để hiển thị ảnh mới
    mainImage.src = imageName;
}
