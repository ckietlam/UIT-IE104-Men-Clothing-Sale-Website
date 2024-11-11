# Backend - Website Bán Đồ Nam
## **Mục tiêu**
Tạo các chức năng cần thiết cho một website bán đồ nam.

---
## **Cấu trúc thư mục**
```plaintext
backend/                       # Chứa toàn bộ mã nguồn của Backend
├── src/                     
│   ├── config/                # Lưu trữ các tệp cấu hình phía Backend.
│   ├── controller/            # Chứa các controller, là các hàm xử lý logic cho các route của ứng dụng.
│   ├── middlewares/           # Chứa các middleware của ứng dụng. Middleware là các hàm xử lý được gọi trong chuỗi các yêu cầu HTTP. 
│   ├── migrations/            # Lưu trữ các tệp migration dùng để thay đổi cấu trúc của cơ sở dữ liệu theo thời gian.
│   ├── models/                # Chứa các mô hình dữ liệu (models). Mô hình này là các lớp đại diện cho dữ liệu trong cơ sở dữ liệu.
│   ├── public/                # Chứa các file tĩnh (static files) như ảnh, CSS, JavaScript, font, v.v. 
│   ├── route/                 # Lưu trữ các tệp định nghĩa các route của ứng dụng.
│   ├── seeders/               # Chứa các tệp seeding dữ liệu, giúp tạo dữ liệu giả để thử nghiệm hoặc khởi tạo cơ sở dữ liệu với dữ liệu mẫu.
│   ├── services/              # Chứa các logic nghiệp vụ của ứng dụng. 
│   ├── views/                 # Chứa các file view (template) mà ứng dụng sẽ render để gửi phản hồi HTML về cho client.
│   ├── server.js              # Cấu hình và khởi động server cho ứng dụng  
├── .env                       # Chứa các biến môi trường nhạy cảm và cấu hình.
├── .env.example               # Cung cấp một ví dụ về các biến môi trường.
├── .sequelizerc               # Cấu hình cho Sequelize ORM.
├── package-lock.json          # Ghi lại các phiên bản chính xác của các phụ thuộc.
├── package.json               # Cấu hình chính của dự án Node.js, bao gồm các phụ thuộc và scripts.
├── README.md                  # Cung cấp tài liệu cho dự án, hướng dẫn cách cài đặt và sử dụng.
```
---

## **Yêu cầu**
1. **Node.js** (phiên bản >= 14.x.x):
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
---

## **Cách sử dụng**
### 1. **Clone repo**:
   - Clone nhánh `backend` từ repo:
     ```bash
     git clone -b backend https://github.com/your-repo-name.git
     ```

### 2. **Cài đặt phụ thuộc**:
   - Chạy lệnh sau để cài đặt tất cả các gói phụ thuộc:
     ```bash
     npm install
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
1. **Cấu trúc thư mục**:
   - `src/`: Thư mục chứa tất cả mã nguồn của backend.
   - `config/`: Các cấu hình của ứng dụng, ví dụ như kết nối cơ sở dữ liệu, cấu hình môi trường.
   - `controllers/`: Logic xử lý các API requests.
   - `models/`: Các mô hình dữ liệu cho Sequelize.
   - `middlewares/`: Các middleware cho ứng dụng (xác thực, kiểm tra quyền, v.v.).
   - `routes/`: Các định tuyến API.

2. **Các công cụ phát triển**:
   - **Nodemon**: Dùng để tự động tái khởi động server khi có thay đổi trong mã nguồn.
---

## **Thành viên chịu trách nhiệm**
| **Thành viên** | **Nhiệm vụ**              | **Tệp tin liên quan**         |
|-----------------|---------------------------|--------------------------------|
| Bùi Quốc Lâm           | Phụ trách phần Products, Order sản phẩm, Cart |         |
| Huy           |                     |   |
| Minh  |  |  |

---

## **Ghi chú**
- Tất cả các thay đổi cần được commit với message rõ ràng. Ví dụ:
  ```bash
  git commit -m "[BE-1] Update layout for xxx"

- Sử dụng phần UI trong Code editor: Visual Studio Code để ghi Commit Messages


---
