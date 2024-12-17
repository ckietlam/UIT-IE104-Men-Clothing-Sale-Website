# Frontend - Website Bán Đồ Nam

## **Mục tiêu**
Xây dựng giao diện người dùng cho website bán đồ nam với các danh mục cần thiết cho dự án.

---

## **Cấu trúc thư mục**
```plaintext

frontend/ 
├── public/           # Thư mục chứa tài nguyên tĩnh 
│ ├── fonts/          # Chứa các file phông chữ 
│ ├── icons/          # Chứa các icon 
│ ├── images/         # Chứa các hình ảnh 
│ ├── scripts/        # Chứa các script JavaScript 
│ └── styles/         # Chứa các file CSS 
├── src/              # Thư mục chứa mã nguồn 
│ ├── pages/          # Chứa các trang web 
│ └── partials/       # Chứa các thành phần giao diện tái sử dụng

```
---

## **Yêu cầu**
1. **Node.js** (phiên bản >= 16.x.x):
   - Dự án này yêu cầu Node.js để chạy server và xử lý các phụ thuộc. Bạn có thể tải Node.js tại [https://nodejs.org](https://nodejs.org).

2. **npm** (Node Package Manager):
   - npm sẽ giúp bạn cài đặt các phụ thuộc của dự án. npm đi kèm với Node.js, vì vậy bạn sẽ tự động có npm khi cài đặt Node.js. Bạn có thể kiểm tra phiên bản npm bằng lệnh:
     ```bash
     npm -v
     ```

3. **Database** (Tuỳ chọn, nếu sử dụng cơ sở dữ liệu):
   - Dự án sử dụng **XAMPP** để khởi tạo và quản lý cơ sở dữ liệu MySQL. Bạn có thể tải và cài đặt XAMPP tại [https://www.apachefriends.org/index.html](https://www.apachefriends.org/index.html).
   - Sau khi cài đặt XAMPP, hãy khởi động **Apache** và **MySQL** trong XAMPP Control Panel để đảm bảo rằng server web và cơ sở dữ liệu MySQL hoạt động.
   - **MySQL Database**: Dự án này sử dụng **MySQL** làm hệ quản trị cơ sở dữ liệu. Bạn có thể truy cập phpMyAdmin để quản lý cơ sở dữ liệu thông qua trình duyệt tại [http://localhost/phpmyadmin](http://localhost/phpmyadmin).
   - Ngoài ra bạn có thể chỉ dùng MySQL thuần thôi cũng được
    
4. **Editor (tuỳ chọn)**:
     - **Visual Studio Code**: [https://code.visualstudio.com/](https://code.visualstudio.com/)

5. **Postman / API Testing Tool (tuỳ chọn)**:
   - Để kiểm tra các API endpoints, bạn có thể sử dụng công cụ như [Postman](https://www.postman.com/) để gửi yêu cầu HTTP và kiểm tra kết quả.

6. **Git** (tuỳ chọn):
   - Nếu bạn sử dụng Git để quản lý mã nguồn, bạn có thể cần cài đặt Git từ [https://git-scm.com/](https://git-scm.com/).

7. **HTML5 & CSS3 & EJS**  
   - Trình duyệt web hỗ trợ HTML5 và CSS3. 
   - Quá trình phát triển bắt đầu bằng việc tạo các trang tĩnh với HTML5. Sau đó, chúng tôi chuyển đổi những trang này sang định dạng EJS để phục vụ render trên server.

---

## **Cách sử dụng**
### 1. **Clone repo**:
   - Clone repo:
     ```bash
     git clone https://github.com/ckietlam/UIT-IE104-Men-Clothing-Sale-Website.git
     cd backend
     ```

### 2. **Cài đặt phụ thuộc**:
   - Chạy lệnh sau để cài đặt tất cả các gói phụ thuộc:
     ```bash
     npm install
     npm install express-session
     ```
### 3. **Tạo database**:
   - Chạy lệnh sau để cài đặt database:
     ```bash
     npx sequelize-cli db:create
     ```
### 4. **Tạo các table**:
   - Chạy lệnh sau để cài đặt database:
     ```bash
     npx sequelize-cli db:migrate
     ```
### 5. **Tạo dữ liệu ảo**:
   - Chạy lệnh sau để cài đặt database:
     ```bash
     npx sequelize db:seed:all
     ```
### 6. **Khởi động server**:
   - Chạy lệnh dưới đây để khởi động server:
     ```bash
     npm start
     ```

---

## **Quy tắc đặt tên và tổ chức code**
- **Cấu trúc CSS**: 
  - Mỗi trang sẽ có file *CSS* riêng để giữ code gọn gàng và đặt trong thư mục `/public/styles/`.

- **Cấu trúc EJS**: 
  - Sử dụng chuẩn *BEM (Block-Element-Modifier)* với tên class theo **quy tắc CamelCase** để tạo sự rõ ràng và dễ đọc. Ví dụ:
    ```html
    <div class="product-card product-card--highlight">
        <h2 class="product-card__title">Tên sản phẩm</h2>
    </div>
    ```

- **Thư mục tài nguyên**: 
  - **Hình ảnh**: Các file ảnh nên được đặt trong thư mục `/public/images/`.
  - **Icon**: Các icon nên được đặt trong thư mục `/public/icons/` và sử dụng định dạng SVG để tối ưu hóa kích thước và chất lượng.

---

## **Thành viên chịu trách nhiệm**
| **Thành viên** | **Nhiệm vụ**              | 
|-----------------|---------------------------|
| Kiết Lâm           | Thiết kế giao diện các trang: Admin;  Homepage; Payment | 
| Vỹ Linh           | Thiết kế giao diện các trang: Product | 
| Tuấn Minh  | Thiết kế giao diện các trang: Success; Header; Footer  | 

---

## **Ghi chú**
- Tất cả các thay đổi cần được commit với message rõ ràng. Ví dụ:
  ```bash
  git commit -m "add/fix/feat/delete: <short-details>"
   ```
---

