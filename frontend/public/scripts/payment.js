
const editAddressLink = document.querySelector(".deliveryAddress .editLink");
const deliveryAddressElement = document.querySelector(".deliveryAddress p");
const editContactLink = document.querySelector(".contactInformation .editLink");
const contactInformationElement = document.querySelector(".contactInformation p");
const totalAmountElement = document.querySelector(".totalAmount span:last-child");
const totalItemsElement = document.querySelector(".cartSummary p:first-child span:last-child");

// Hàm cập nhật địa chỉ giao hàng
function updateAddress(newAddress) {
  deliveryAddressElement.textContent = newAddress;
}

// Hàm cập nhật thông tin liên hệ
function updateContactInfo(newContactInfo) {
  contactInformationElement.textContent = newContactInfo;
}

// Xử lý việc chỉnh sửa địa chỉ
if (editAddressLink) {
  editAddressLink.addEventListener("click", (event) => {
    event.preventDefault();

    const newAddress = prompt("Nhập địa chỉ mới của bạn:");
    if (newAddress && newAddress.trim() !== "") {
      updateAddress(newAddress.trim());
    }
  });
}

// Xử lý việc chỉnh sửa thông tin liên hệ
if (editContactLink) {
  editContactLink.addEventListener("click", (event) => {
    event.preventDefault();

    const newContactInfo = prompt("Nhập thông tin liên hệ mới (ví dụ: email):");
    if (newContactInfo && newContactInfo.trim() !== "") {
      updateContactInfo(newContactInfo.trim());
    }
  });
}

// Hàm cập nhật số lượng sản phẩm và tổng số tiền
function updateQuantity(cartItem, change) {
  const quantityElement = cartItem.querySelector(".quantity");
  const priceElement = cartItem.querySelector(".itemPrice");
  const pricePerItem = parseInt(priceElement.dataset.price, 10);
  const quantity = parseInt(quantityElement.textContent, 10) + change;

  if (quantity >= 1) {
    quantityElement.textContent = quantity;

    // Cập nhật lại giá trị của sản phẩm
    const updatedPrice = quantity * pricePerItem;
    priceElement.textContent = `${updatedPrice.toLocaleString()}đ`;

    // Tính toán lại tổng số tiền
    recalculateTotal();
  }
}

// Hàm tính toán lại tổng giá trị của tất cả sản phẩm trong giỏ hàng
function recalculateTotal() {
  let totalAmount = 0;
  let totalItems = 0;

  // Lấy lại các cartItems sau khi có sự thay đổi trong DOM (kể cả khi đã xóa sản phẩm)
  const updatedCartItems = document.querySelectorAll(".cartItem");

  updatedCartItems.forEach((cartItem) => {
    const quantityElement = cartItem.querySelector(".quantity");
    const priceElement = cartItem.querySelector(".itemPrice");
    const quantity = parseInt(quantityElement.textContent, 10);
    const price = parseInt(priceElement.dataset.price, 10);

    totalAmount += quantity * price;
    totalItems += quantity;
  });

  totalAmountElement.textContent = `${totalAmount.toLocaleString()}đ`;
  totalItemsElement.textContent = totalItems;
}

// Thêm sự kiện vào các nút điều khiển số lượng sản phẩm
document.querySelectorAll(".cartItem").forEach((cartItem) => {
  const decreaseBtn = cartItem.querySelector(".decreaseBtn");
  const increaseBtn = cartItem.querySelector(".increaseBtn");
  const removeBtn = cartItem.querySelector(".removeItemBtn");

  // Xử lý nút giảm số lượng
  decreaseBtn.addEventListener("click", () => {
    updateQuantity(cartItem, -1);
  });

  // Xử lý nút tăng số lượng
  increaseBtn.addEventListener("click", () => {
    updateQuantity(cartItem, 1);
  });

  // Xử lý xóa sản phẩm
  removeBtn.addEventListener("click", () => {
    cartItem.remove(); // Xóa sản phẩm khỏi DOM
    recalculateTotal(); // Tính lại tổng sau khi xóa sản phẩm
  });
});

// Tính toán lại tổng số tiền khi trang được tải lần đầu
recalculateTotal();

document.getElementById("continueButton").addEventListener("click", function() {
    // Thực hiện kiểm tra dữ liệu form (nếu cần)
    // ví dụ: Kiểm tra xem tất cả các trường đã được điền chưa

    // Chuyển sang trang thanh toán tiếp theo
    window.location.href = "payment-delivery.html";  // Thay đường dẫn với trang thanh toán tiếp theo
});


document.getElementById("continueButton").addEventListener("click", function() {
    // Thực hiện kiểm tra dữ liệu form (nếu cần)
    // ví dụ: Kiểm tra xem tất cả các trường đã được điền chưa

    // Chuyển sang trang thanh toán tiếp theo
    window.location.href = "payment-delivery.html";  // Thay đường dẫn với trang thanh toán tiếp theo
});

