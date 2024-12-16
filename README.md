# IE104-NHOM6

# **Quy Tắc Làm Việc Cho Dự Án**

## **Mục tiêu**
Dự án được thực hiện bởi nhiều thành viên, do đó để đảm bảo sự phối hợp hiệu quả và tránh xung đột code, tất cả các thành viên cần tuân thủ các quy tắc sau.

---

## **Cách Sử Dụng và Quyền Hạn**
### **1. Cách sử dụng Git và các nhánh**
- **Nhánh chính (`main`)**:
  - Đây là nhánh ổn định nhất, chỉ chứa code đã hoàn thiện và qua kiểm duyệt.
  - **Không ai được phép push trực tiếp lên nhánh `main`.**

- **Nhánh phát triển (`develop`)**:
  - Chỉ dành cho các tính năng liên quan đến Frontend hoặc Backend.
  - Code từ các nhánh cá nhân chỉ được merge vào đây sau khi có sự đồng ý của **Lead** và **Reviewer**.

- **Nhánh cá nhân (`feature/<task-name>` hoặc `fix/<task-name>`):**
  - Mỗi thành viên **bắt buộc** làm việc trên nhánh riêng.
  - Tên nhánh phải rõ ràng, ví dụ:
    ```plaintext
    feature/login-page
    fix/cart-bug
    ```
  - Có thể push code lên nhánh cá nhân bao nhiêu lần tùy ý.

### **2. Luật Merge Code**
- **Pull Request (PR)**:
  - Khi muốn merge code từ nhánh cá nhân vào folder `frontend`, `backend` ở **develop**, các thành viên **bắt buộc phải tạo Pull Request**.
  - Pull Request cần bao gồm:
    - **Mô tả thay đổi** rõ ràng (tính năng mới, bug fix,...).
    - **Danh sách file thay đổi**.
    - Gắn tag người review (Lead và Reviewer).

- **Quy trình duyệt Pull Request**:
  - Pull Request chỉ được merge sau khi có ít nhất **2 phiếu đồng ý (YES)** từ:
    1. **Leader: Chung Kiết Lâm**
    2. **Reviewer: Bùi Quốc Lâm**


  **Cấm tuyệt đối**  
```bash
   ❌ Không sử dụng lệnh `git push --force` hoặc `git push -f` ❌

   ⚠️ Điều này có thể gây mất code hoặc làm hỏng lịch sử commit ⚠️
```

---

## **Quyền Hạn Của Các Thành Viên**
| **Thành Viên**   | **Quyền Hạn**                                                |
|-------------------|-------------------------------------------------------------|
| **Chung Kiết Lâm**         | Quản lý toàn bộ dự án, review tất cả Pull Request, phụ trách chính source Frontend.          |
| **Bùi Quốc Lâm** | Hỗ trợ review code, đảm bảo chất lượng trước khi merge, phụ trách chính source Backend.  |
| **Châu Trần Vỹ Linh** | Làm việc trên nhánh Frontend riêng, push code vào nhánh riêng. |
| **Vũ Quang Huy** | Làm việc trên nhánh Backend riêng, push code vào nhánh riêng. |
| **Phan Tuấn Minh** | Làm việc trên nhánh Backend riêng, push code vào nhánh riêng. |

---

## **Hướng Dẫn Làm Việc**
### **1. Bắt đầu công việc**
- **Tạo nhánh cá nhân** từ nhánh phát triển (`develop`):
  ```bash
  Step 1: Mở nhánh phát triển
  git checkout develop

  Step 2:
  Tạo nhánh cá nhân (nếu chưa có): git checkout -b feature/<task-name>
  Nếu đã có nhánh cá nhân: git checkout <address>
  ```
### **2. Commit code**
- Sau khi thực hiện thay đổi, lưu lại các thay đổi bằng cách commit.
- Quy tắc đặt tên commit:
  - **Cú pháp**: `[Task Type] Mô tả ngắn gọn`
    - `[Feature]` - Thêm tính năng mới.
    - `[Fix]` - Sửa lỗi.
    - `[Update]` - Cập nhật hoặc cải tiến code.
    - `[Refactor]` - Tái cấu trúc code.
  
  **Ví dụ**:
  ```bash
  git commit -m "[Feature] Thêm giao diện trang đăng nhập"
  git commit -m "[Fix] Sửa lỗi hiển thị trên trang sản phẩm"
  ```
  
  ### **3. Push code lên nhánh cá nhân**
- Push thay đổi từ nhánh cá nhân lên GitHub:
  ```bash
  git push origin feature/<task-name>
  ```

### **4. Tạo Pull Request (PR)**
- Khi hoàn thành công việc trên nhánh cá nhân, tạo Pull Request để yêu cầu merge vào nhánh phát triển **develop**.

#### **Cách thực hiện:**
1. Truy cập tab **Pull Requests** trên GitHub.
2. Nhấn nút **New Pull Request**.
3. Chọn nhánh **base** là nhánh đích `develop`.
4. Chọn nhánh **compare** là nhánh cá nhân của bạn (`feature/<task-name>`).
5. Điền thông tin Pull Request:
   - **Tiêu đề (Title)**:
     - Quy tắc: `[Task Type] Mô tả ngắn gọn`.
     - Ví dụ: `[Feature] Thêm giao diện trang giỏ hàng`.
   - **Mô tả (Description)**:
     - Tóm tắt những thay đổi đã thực hiện.
     - Liệt kê các file thay đổi hoặc logic chính.
     - Đề cập nếu cần sự hỗ trợ hoặc chú ý đặc biệt.

6. Thêm người review:
   - Gắn tag **Lead** và **Reviewer (bạn B)** vào phần reviewer.
   - Ví dụ: `@LeadUsername`, `@ReviewerUsername`.

7. Nhấn **Create Pull Request** để gửi yêu cầu.
---

#### **Quy trình duyệt Pull Request:**
- Pull Request chỉ được merge nếu:
  1. Có ít nhất **2 phiếu đồng ý (YES)** từ Lead và Reviewer.
  2. Không còn xung đột (conflict) với nhánh đích.
  3. Các quy tắc commit và code review được đảm bảo.
- Nếu Pull Request bị yêu cầu chỉnh sửa:
  - Thực hiện các thay đổi cần thiết trên nhánh cá nhân.
  - Commit và push lại lên GitHub:
    ```bash
    git add .
    git commit -m "[Fix] Chỉnh sửa PR theo phản hồi #123"
    git push origin feature/<task-name>
    ```

---

### **5. Đợi duyệt và phản hồi**
- Sau khi Pull Request được chấp thuận:
  - **Reviewer** hoặc **Lead** sẽ tiến hành merge Pull Request.
  - Nhánh cá nhân có thể được xóa sau khi merge nếu không cần thiết nữa:
    ```bash
    git branch -d feature/<task-name>
    ```
- Trước khi bắt đầu nhiệm vụ mới, đảm bảo đồng bộ code mới nhất từ nhánh phát triển:
  ```bash
  git pull origin develop
  ```
---

### **Liên Hệ**
- Nếu gặp bất kỳ vấn đề nào trong quá trình làm việc, hãy liên hệ **Leader** thông qua nhóm **Zalo** để được hỗ trợ kịp thời.
- **Leader** chịu trách nhiệm giải đáp các thắc mắc về:
  - Quy trình làm việc (workflow Git).
  - Quyền hạn và trách nhiệm của từng thành viên.
  - Xử lý xung đột (conflict) khi merge code.
- Vui lòng tuân thủ các nguyên tắc đã đặt ra để đảm bảo hiệu quả làm việc của toàn nhóm.

---


