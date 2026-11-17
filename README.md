# 🛵 Hệ thống quản trị bãi giữ xe thông minh - UEH Mekong (UniSmartPark)

Ứng dụng Web hoàn chỉnh phục vụ đồ án **Design Thinking** tại **Trường Đại học Kinh tế TP.HCM – Phân hiệu Vĩnh Long (UEH Mekong)**.

---

## ✨ Tính năng cốt lõi đã tích hợp

1. **Giao diện chuẩn nhận diện thương hiệu UEH Mekong (`#005f69`, `#0d3b42`, `#f26f21`, `#f4f7f9`)**:
   - **Header**: Logo UEH MEKONG, chuyển đổi nhanh giữa **[🖥️ Màn hình Admin]** và **[📱 App Sinh viên]**, nút **[10 SV & Mã vạch]**, Widget Thời tiết (`28°C - Khả năng mưa: 80%`), Đồng hồ thời gian thực, Chuông thông báo.
   - **Sidebar bên phải (`#0d3b42`)**: Tổng quan, Sơ đồ khuôn viên, Bãi đỗ xe, Lịch sử lượt xe (kèm Quản lý 10 SV), Cảnh báo, Thống kê, Cài đặt, Đăng xuất.
   - **Bố cục 3 cột trực quan**:
     - **Cột trái**: Thiết bị quét tại cổng (2 tab `[Thẻ từ]` và `[Mã vạch UEH Student]`, khung ngắm camera, điều khiển camera đa thiết bị, thông tin sinh viên và trạng thái Check-in / Check-out 2 chiều).
     - **Khu vực trung tâm**: 4 thẻ KPI (`120 Ô trống ~42%`, `150 Đang sử dụng ~53%`, `15 Đã đặt trước ~5%`, `5 Không khả dụng ~2%`), Sơ đồ bãi đỗ xe 2D kỹ thuật số 20 ô (`A01`–`A20`) có `Lối vào ↑` và `↓ Lối ra`, tích hợp **Sơ đồ tổng thể khuôn viên UEH Mekong** với **7 khu vực bãi đỗ xe thực tế**, Thống kê nhanh và Hoạt động gần đây.
     - **Cột phụ bên phải sơ đồ**: Khung **Thông tin ô đỗ** (Đặt chỗ trước, Mô phỏng Camera AI đối chiếu biển số xe vào ô) và khung **Cảnh báo** (Giả lập mưa lớn & ngập nước bãi ngoài trời).

2. **Ba phân hệ thông minh & Camera quét mã vạch đa thiết bị**:
   - **Phân hệ 1 (Check-in/Check-out 2 chiều + Giọng đọc AI Tiếng Việt)**:
     - Tích hợp `html5-qrcode` hỗ trợ quét nhạy mã vạch 1D (`CODE_128`, `CODE_39`, `EAN_13`) trên app **UEH Student** và `QR_CODE`.
     - Có nút chuyển đổi **[📱 Cam Sau Điện Thoại]**, **[💻 Webcam Laptop]**, chọn thiết bị từ danh sách Camera, kèm nút dự phòng **[📸 Chụp / Tải ảnh mã vạch]** (tự động tiền xử lý tăng độ tương phản ảnh) và menu **Quét nhanh 1 trong 10 thành viên nhóm**.
     - Tự động phát giọng đọc AI Tiếng Việt (`window.speechSynthesis` `vi-VN`): **"XÁC THỰC THÀNH CÔNG"** khi MSSV hợp lệ hoặc **"KHÔNG THỂ XÁC THỰC"** khi quét mã lạ.
   - **Phân hệ 2 (Quản lý vị trí đỗ xe & Đối chiếu biển số AI)**:
     - Mô phỏng Camera AI đối chiếu biển số xe đi vào ô với biển số đã đặt trước (VD: ô `A12` của Hồ Thị Mỹ Hường - `68A1-327.45` hoặc `A15` của Nguyễn Hoàng Khả Vy - `664AA323.35`).
     - Khớp biển số: Chuyển ô sang màu Xanh dương (`Đang sử dụng`).
     - Sai biển số: Phát còi & cảnh báo đỏ **"Cảnh báo đỗ sai vị trí đặt trước!"** trên cả màn hình Admin và Nhật ký hoạt động.
   - **Phân hệ 3 (Cảnh báo thời tiết & Ngập nước chủ động đồng bộ App Sinh viên)**:
     - Kích hoạt nút **"🌧️ Giả lập Mưa lớn & Ngập nước bãi ngoài trời"**: Các ô đỗ vùng trũng dọc bờ sông chuyển sang Đỏ (`Không khả dụng / Nguy cơ ngập`), đồng thời bắn **Pop-up Notification** sang **[📱 App Sinh viên]** để sinh viên bấm **"Đồng ý chuyển sang ô trống Khu A"**, tự động điều phối và giữ chỗ mới có mái che.

3. **Nhúng sẵn Database 10 Sinh viên trong nhóm (Hardcode + `localStorage` + `JsBarcode`)**:
   - Đầy đủ 10 thành viên nhóm với MSSV, Họ tên, Ngày sinh, Biển số, Dòng xe, Ô đỗ, Trạng thái gửi, hỗ trợ Thêm/Sửa/Xóa, Xuất/Nhập CSV và tạo mã vạch `CODE_128` bằng `JsBarcode`.

---

## 🚀 Cách chạy và Deploy miễn phí (Có HTTPS cho Camera Điện thoại & Laptop)

### Cách 1: Mở trực tiếp hoặc chạy Server tại máy (Local)
- Nhấp đúp trực tiếp vào file `index.html` để mở trên trình duyệt, hoặc chạy:
  ```bash
  npx serve . -l 3000
  ```

### Cách 2: Deploy miễn phí trong 10 giây lên Netlify Drop (Khuyên dùng cho nhóm)
1. Truy cập [https://app.netlify.com/drop](https://app.netlify.com/drop).
2. Kéo thả toàn bộ thư mục dự án này vào khung trang web.
3. Netlify sẽ cấp ngay một đường link `https://...netlify.app` có sẵn chứng chỉ bảo mật **HTTPS** để cả 10 thành viên trong nhóm mở trên iPhone, Android, Windows, Mac và dùng Camera quét mã vạch trực tiếp.

### Cách 3: Deploy lên Vercel hoặc GitHub Pages
- Đẩy thư mục lên GitHub và bật **GitHub Pages** hoặc kết nối với **Vercel** (đã cấu hình sẵn `vercel.json` và `netlify.toml` cấp quyền Camera).
