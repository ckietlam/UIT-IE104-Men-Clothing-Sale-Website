# Frontend - Website Bán Đồ Nam

## **Mục tiêu**
Frontend-Member hoàn thành nhiệm vụ xây dựng giao diện người dùng cho website bán đồ nam với các danh mục cần thiết cho dự án.

---

## **Cấu trúc thư mục**
```plaintext
frontend/
├── components/                # Các thành phần giao diện tái sử dụng
│   ├── Header.js              # Phần header của trang
│   ├── Footer.js              # Phần footer của trang
│   └── ProductCard.js         # Thành phần hiển thị sản phẩm
├── pages/                     # Các trang chính
│   ├── index.html             # Trang chủ
│   ├── ao.html                # Trang danh mục Áo
│   ├── quan.html              # Trang danh mục Quần
│   ├── giay.html              # Trang danh mục Giày
│   └── phu-kien.html          # Trang danh mục Phụ kiện
├── styles/                    # Các file CSS
│   ├── global.css             # CSS chung
│   ├── ao.css                 # CSS cho trang Áo
│   ├── quan.css               # CSS cho trang Quần
│   └── giay.css               # CSS cho trang Giày
└── assets/                    # Thư mục chứa tài nguyên
    ├── icons/                 # Icon SVG
    └── images/                # Hình ảnh sản phẩm
```
---

## **Yêu cầu**
- Trình duyệt web hỗ trợ HTML5 và CSS3.
- Editor khuyến nghị dùng cho dự án: **Visual Studio Code**.

---

## **Cách sử dụng**
### **1. Clone dự án**
Tải mã nguồn Frontend từ GitHub:
```bash
git clone <URL-repository-frontend>
cd frontend/
```

### **2. Chạy dự án**
- Tùy chọn 1: Chạy trực tiếp
Mở file index.html trong trình duyệt:
```bash
frontend/pages/index.html
```
- Tùy chọn 2: Dùng Live Server
Cài đặt extension Live Server trong VS Code.
Click chuột phải vào file index.html → Open with Live Server.

---

## **Quy tắc đặt tên và tổ chức code**
1. **Cấu trúc CSS**:
   - **Global styles**: Đặt trong `global.css` để định nghĩa các thành phần tái sử dụng (ví dụ: `body`, `header`, `footer`).
   - **Page-specific styles**: Mỗi trang sẽ có file CSS riêng (ví dụ: `ao.css`, `giay.css`) để giữ code gọn gàng.

2. **Cấu trúc HTML**:
   - Sử dụng chuẩn **BEM (Block-Element-Modifier)** để tên class rõ ràng và dễ đọc theo **quy tắc CamelCase**:
     ```html
     <div class="product-card product-card--highlight">
         <h2 class="product-card__title">Tên sản phẩm</h2>
     </div>
     ```

3. **Thư mục tài nguyên**:
   - **Hình ảnh**: Đặt trong `assets/images/` và sử dụng tên file mô tả rõ ràng, ví dụ: `ao-thun-trang.jpg`.
   - **Icon**: Đặt trong `assets/icons/` với định dạng SVG để tối ưu kích thước.

---

## **Thành viên chịu trách nhiệm**
| **Thành viên** | **Nhiệm vụ**              | **Tệp tin liên quan**         |
|-----------------|---------------------------|--------------------------------|
| Kiết Lâm           | Thiết kế giao diện Trang *name* | `ao.html`, `ao.css`           |
| Vỹ Linh           | Phát triển logic Trang *name* | `quan.html`, `quan.css`       |
| FE-3 (nếu có)  | Tối ưu giao diện Trang Giày và Phụ kiện | `giay.html`, `phu-kien.html` |

---

## **Ghi chú**
- Tất cả các thay đổi cần được commit với message rõ ràng. Ví dụ:
  ```bash
  git commit -m "[FE-1] Update layout for ao.html"

- Sử dụng phần UI trong Code editor: Visual Studio Code để ghi Commit Messages


---

