// Dữ liệu sản phẩm (có thể thay thế bằng API hoặc dữ liệu từ cơ sở dữ liệu)
const products = [
    { id: '123', name: 'Áo Blazer Công Sở Phong Cách Thanh Lịch', description: 'Áo Blazer thanh lịch với thiết kế cổ điển, phù hợp cho các buổi họp, sự kiện trang trọng...', price: '550.000đ', image: 'product1.jpg' },
    { id: '124', name: 'Áo Sơ Mi Nam Cao Cấp', description: 'Áo sơ mi nam với chất liệu vải cao cấp, thoáng mát, phù hợp với công việc và các buổi tiệc...', price: '300.000đ', image: 'product2.jpg' },
    // Các sản phẩm khác
];

// Hiển thị danh sách sản phẩm trên trang index.html
function displayProductList() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <a href="product.html?id=${product.id}">Xem chi tiết</a>
        `;
        productList.appendChild(productCard);
    });
}

// Hiển thị chi tiết sản phẩm trên trang product.html
function displayProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const product = products.find(p => p.id === productId);

    if (product) {
        const productDetail = document.getElementById('product-detail');
        productDetail.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p><strong>Giá:</strong> ${product.price}</p>
            <p><strong>Mô tả:</strong> ${product.description}</p>
        `;
    } else {
        document.getElementById('product-detail').innerHTML = 'Sản phẩm không tồn tại.';
    }
}

// Chạy hàm tương ứng với trang
if (document.getElementById('product-list')) {
    displayProductList();
}

if (document.getElementById('product-detail')) {
    displayProductDetail();
}


document.querySelectorAll('.product-image').forEach(img => {
    const originalSrc = img.src;
    const hoverSrc = img.getAttribute('data-hover');

    // Thay đổi hình ảnh khi hover
    img.addEventListener('mouseenter', () => {
        img.src = hoverSrc;
    });

    // Khôi phục hình ảnh ban đầu khi không hover
    img.addEventListener('mouseleave', () => {
        img.src = originalSrc;
    });
});

function changeImage(imageName) {
    document.getElementById("main-image").src = "../../assets/" + imageName;
}

