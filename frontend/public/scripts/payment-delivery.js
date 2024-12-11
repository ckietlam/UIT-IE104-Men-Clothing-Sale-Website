function getQueryParams() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const data = Object.fromEntries(urlParams.entries());
    return data;
  }
  
  // Hiển thị dữ liệu trên giao diện
  document.addEventListener('DOMContentLoaded', () => {
    const formData = getQueryParams();
  
    // Ví dụ: Điền dữ liệu vào input fields nếu cần
    document.getElementById('email').value = formData.email || '';
    document.getElementById('firstName').value = formData.firstName || '';
    document.getElementById('lastName').value = formData.lastName || '';
    document.getElementById('address').value = formData.address || '';
    document.getElementById('city').value = formData.city || '';
    document.getElementById('phone').value = formData.phone || '';
    document.getElementById('district').value = formData.district || '';
  
    console.log('Dữ liệu nhận được:', formData);
  });
  