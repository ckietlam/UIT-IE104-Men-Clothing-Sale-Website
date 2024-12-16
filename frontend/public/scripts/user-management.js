// Lấy tất cả các nút có class .btn-edit
document.querySelectorAll('.btn-edit').forEach((button) => {
    button.addEventListener('click', () => {
      // Lấy userId từ thuộc tính data-user-id
      const userId = button.getAttribute('data-user-id');
  
      // Lấy role từ select tương ứng
      const role = document.querySelector(`#role-${userId}`).value;
  
      // Kiểm tra kết quả
      console.log("Noah check role: ", role, ", userId: ", userId);
  
      // Điều hướng đến URL mới
      const url = `/update-user-role?user_id=${userId}&role=${role}`;
      window.location.href = url;
    });
  });
  