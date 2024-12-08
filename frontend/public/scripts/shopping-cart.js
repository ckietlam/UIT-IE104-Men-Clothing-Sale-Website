// shopping-cart.js

// Các phần tử trong DOM
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

// Khi nhấn vào giỏ hàng, hiển thị/đóng popup giỏ hàng
cartButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Ngăn không cho sự kiện click propagating

    // Kiểm tra xem giỏ hàng có đang mở không
    if (cartPopup.style.display === 'flex') {
        // Nếu giỏ hàng đang mở, đóng nó
        cartPopup.style.display = 'none';
    } else {
        // Nếu giỏ hàng đang đóng, mở nó và cập nhật giỏ hàng
        fetchCartItems();  // Fetch from server and update UI
        cartPopup.style.display = 'flex';  // Hiển thị giỏ hàng
    }
});

// Đóng giỏ hàng
closeCartButton.addEventListener('click', function(event) {
    event.stopPropagation();  // Ngăn không cho sự kiện click propagating
    cartPopup.style.display = 'none';
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
                <img src="${item.productCartData.image}" alt="${item.productCartData.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <p class="cart-item-name">${item.productCartData.name}</p>
                    <p class="cart-item-price">${numberFormatter.format(item.productCartData.price)}₫</p>
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
            li.querySelector('.remove-item-btn').addEventListener('click', function (event) {
                event.stopPropagation();  // Ngăn không cho sự kiện click propagating ra ngoài
                removeItem(index);
            });
        });

        // Tính tổng tiền giỏ hàng
        const totalPrice = items.reduce((acc, item) => acc + (item.productCartData.price * item.quantity), 0);
        totalPriceElement.textContent = `${numberFormatter.format(totalPrice)} ₫`;
    }
}

const numberFormatter = new Intl.NumberFormat('de-DE');

// Hàm cập nhật số lượng sản phẩm sau khi thay đổi
function updateCartItemQuantity(index, newQuantity) {
    fetch('/api/update-cart-item-quantity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index, quantity: newQuantity })
    })
    .then(response => response.json())
    .then(updatedItems => {
        updateCartItems(updatedItems);
    })
    .catch(error => console.error('Error updating cart item:', error));
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
    fetch('/api/change-cart-item-quantity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index, change })
    })
    .then(response => response.json())
    .then(updatedItems => {
        updateCartItems(updatedItems);
    })
    .catch(error => console.error('Error changing cart item quantity:', error));
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeItem(index) {
    fetch('/api/remove-cart-item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index })
    })
    .then(response => response.json())
    .then(updatedItems => {
        updateCartItems(updatedItems);
    })
    .catch(error => console.error('Error removing cart item:', error));
}

async function fetchID() 
{
    const response = await fetch('/api/get-user-id');
    return response;
}
async function fetchCartItems() {
  
    let USERID = await fetchID();
    
    console.log('userId', USERID);
    const response = await fetch(`/api/get-cart-by-user-id?user_id=${USERID}`);
    const cartItems = await response.json();
    updateCartItems(cartItems);
    
}

// Lưu sản phẩm vào localStorage để kiểm tra (Not needed anymore)
localStorage.removeItem('cartItems');

// Thêm sự kiện để đóng giỏ hàng khi click ra ngoài
document.addEventListener('click', (event) => {
    if (!cartPopup.contains(event.target) && event.target !== cartButton) {
        cartPopup.style.display = 'none';  // Đóng giỏ hàng nếu click ra ngoài
    }
});
