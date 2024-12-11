document.querySelector('.continueButton').addEventListener('click', (e) => {
  e.preventDefault();
  // const paymentTypeElements = document.getElementsByName('payment_type');

  let selectedPaymentType = "CASH";
  // for (let i = 0; i < paymentTypeElements.length; i++) {
  //   if (paymentTypeElements[i].checked) {
  //     selectedPaymentType = paymentTypeElements[i].value;
  //     break;
  //   }
  // }
  
  // Lấy dữ liệu từ các trường
  const email = document.getElementById('email').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const firstName = document.getElementById('firstName').value.trim();
  const address = document.getElementById('address').value.trim();
  const city = document.getElementById('city').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const district = document.getElementById('district').value.trim();

  // Khởi tạo thông báo lỗi
  let errorMessage = '';

  // Kiểm tra các trường bắt buộc
  // if (!selectedPaymentType) errorMessage += 'Phương thức thanh toán là bắt buộc điền.\n';
  if (!email) errorMessage += 'Email là bắt buộc điền.\n';
  if (!lastName) errorMessage += 'Họ là bắt buộc điền.\n';
  if (!firstName) errorMessage += 'Tên là bắt buộc điền.\n';
  if (!address) errorMessage += 'Địa chỉ là bắt buộc điền.\n';
  if (!city) errorMessage += 'Thành phố là bắt buộc điền.\n';
  if (!phone) errorMessage += 'Số điện thoại là bắt buộc điền.\n';
  if (!district) errorMessage += 'Huyện là bắt buộc điền.\n';

  // Kiểm tra định dạng email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    errorMessage += 'Email không hợp lệ.\n';
  }

  // Kiểm tra số điện thoại (chỉ chứa số, tối thiểu 9 và tối đa 15 ký tự)
  const phoneRegex = /^\d{9,15}$/;
  if (phone && !phoneRegex.test(phone)) {
    errorMessage += 'Số điện thoại phải là số từ 9 đến 15 ký tự.\n';
  }

  // Nếu có lỗi, hiển thị thông báo và dừng việc chuyển trang
  if (errorMessage) {
    alert(errorMessage);
    return;
  }

  // Nếu không có lỗi, tiếp tục xử lý (truyền dữ liệu)
  const formData = {
    email,
    lastName,
    firstName,
    address,
    city,
    phone,
    district,
    selectedPaymentType
  };

  const queryParams = new URLSearchParams(formData).toString();
  window.location.href = `/payment-delivery?${queryParams}`;
});
