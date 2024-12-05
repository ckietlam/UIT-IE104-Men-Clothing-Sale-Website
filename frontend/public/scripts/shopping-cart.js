// shopping-cart.js

// Lấy các phần tử trong DOM
const cartButton = document.querySelector('#cart-btn');
const cartPopup = document.querySelector('#cart-popup');
const closeCartButton = document.querySelector('#close-cart-btn');
const continueShoppingButton = document.querySelector('#continue-shopping-btn');
const checkoutButton = document.querySelector('#checkout-btn');

// Các phần tử giỏ hàng
const emptyCart = document.querySelector('#empty-cart');
const filledCart = document.querySelector('#filled-cart');
const cartItemsList = document.getElementById('cart-items');
const totalPriceElement = document.querySelector('.total-price');

// Khi nhấn vào giỏ hàng, hiển thị popup giỏ hàng
cartButton.addEventListener('click', () => {
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    updateCartItems(items);  // Cập nhật lại giao diện giỏ hàng khi mở
    cartPopup.style.display = 'flex';  // Hiển thị giỏ hàng
});

// Đóng giỏ hàng
document.getElementById('close-cart-btn').addEventListener('click', function() {
    document.getElementById('cart-popup').style.display = 'none';
});

// Khi nhấn "Tiếp tục mua sắm", đóng giỏ hàng
continueShoppingButton.addEventListener('click', () => {
    cartPopup.style.display = 'none';  // Đóng popup giỏ hàng
});

// Khi nhấn "Thanh toán", chuyển hướng
checkoutButton.addEventListener('click', () => {
    window.location.href = "/checkout";  // Chuyển hướng đến trang thanh toán
});

// Cập nhật danh sách sản phẩm trong giỏ hàng
function updateCartItems(items) {
    cartItemsList.innerHTML = '';

    if (items.length === 0) {
        filledCart.style.display = 'none';
        emptyCart.style.display = 'block';
    } else {
        filledCart.style.display = 'block';
        emptyCart.style.display = 'none';

        items.forEach((item, index) => {
            const li = document.createElement('li');
            li.classList.add('cart-item');
            li.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="Product">
                </div>
                <div class="cart-item-details">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-price">${numberFormatter.format(item.price)}₫</p>
                    <div class="cart-item-quantity">
                        <span class="decrease-quantity">-</span>
                        <span class="quantity">${item.quantity}</span>
                        <span class="increase-quantity">+</span>
                    </div>
                </div>
                <span class="remove-item-btn" data-index="${index}">X</span>
            `;
            cartItemsList.appendChild(li);

            // Gắn sự kiện cho nút giảm số lượng
            li.querySelector('.decrease-quantity').addEventListener('click', function() {
                if (item.quantity > 1) {
                    item.quantity--;
                    updateCartItemQuantity(index, item.quantity);
                }
            });

            // Gắn sự kiện cho nút tăng số lượng
            li.querySelector('.increase-quantity').addEventListener('click', function() {
                item.quantity++;
                updateCartItemQuantity(index, item.quantity);
            });

            // Gắn sự kiện xóa sản phẩm
            li.querySelector('.remove-item-btn').addEventListener('click', function () {
                removeItem(index);
            });
        });

        // Tính tổng tiền giỏ hàng
        const totalPrice = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        totalPriceElement.textContent = `${numberFormatter.format(totalPrice)} ₫`;
    }
}

const numberFormatter = new Intl.NumberFormat('de-DE');

// Hàm cập nhật số lượng sản phẩm sau khi thay đổi
function updateCartItemQuantity(index, newQuantity) {
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    items[index].quantity = newQuantity;
    localStorage.setItem('cartItems', JSON.stringify(items));
    updateCartItems(items);
}

// Gắn sự kiện xóa sản phẩm cho toàn bộ các phần tử trong giỏ hàng
cartItemsList.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('remove-item-btn')) {
        const index = event.target.dataset.index;
        removeItem(index);  // Gọi hàm xóa sản phẩm tại vị trí `index`
    }

    // Kiểm tra nút tăng giảm số lượng
    if (event.target && event.target.classList.contains('decrease-quantity')) {
        const index = event.target.dataset.index;
        changeQuantity(index, -1); // Giảm số lượng
    }

    if (event.target && event.target.classList.contains('increase-quantity')) {
        const index = event.target.dataset.index;
        changeQuantity(index, 1); // Tăng số lượng
    }
});

// Hàm thay đổi số lượng sản phẩm
function changeQuantity(index, change) {
    // Lấy giỏ hàng từ localStorage
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (items.length > 0) {
        const item = items[index];

        // Kiểm tra nếu thay đổi số lượng hợp lệ (tối thiểu là 1)
        if (item.quantity + change >= 1) {
            item.quantity += change;  // Thay đổi số lượng

            // Cập nhật lại giỏ hàng trong localStorage
            localStorage.setItem('cartItems', JSON.stringify(items));
            updateCartItems(items);  // Cập nhật lại giỏ hàng trên giao diện
        }
    }
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeItem(index) {
    // Lấy giỏ hàng từ localStorage
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (items.length > 0) {
        // Xóa sản phẩm tại vị trí `index`
        items.splice(index, 1);

        // Cập nhật lại giỏ hàng trong localStorage
        localStorage.setItem('cartItems', JSON.stringify(items));
        
        // Nếu giỏ hàng còn sản phẩm, cập nhật lại giao diện
        if (items.length > 0) {
            updateCartItems(items);  // Cập nhật lại giỏ hàng trên giao diện
        } else {
            // Nếu giỏ hàng trống, xóa hoàn toàn trong localStorage và hiển thị giỏ hàng trống
            localStorage.removeItem('cartItems');
            updateCartItems([]);  // Gọi lại hàm cập nhật giỏ hàng trống
        }
    }
}

// Kiểm tra giỏ hàng khi trang tải
const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
updateCartItems(savedCartItems);

// Ví dụ giỏ hàng có sản phẩm
const initialCartItems = [
    { name: 'Áo Thun', price: 100000, quantity: 1, image: 'images/temp/assets/products/shirts/aokhoac/ao_blazer/den-1.jpg' },
    { name: 'Quần Jeans', price: 250000, quantity: 2, image: 'images/temp/assets/products/pants/Quần jeans/Quần Jeans basic/quan-jeans-basic-form-slimfit-qj098-18407-slide-products-66c2b2fd99033.png' }
];

// Lưu sản phẩm vào localStorage để kiểm tra
localStorage.setItem('cartItems', JSON.stringify(initialCartItems));

// Cập nhật lại giỏ hàng với dữ liệu ví dụ
updateCartItems(initialCartItems);


// Giỏ hàng trống
// updateCartItems([]);  // Giỏ hàng trống
