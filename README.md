# Ôn Nhẹ — website ôn thi tốt nghiệp THPT

Website tĩnh bằng HTML, CSS và JavaScript thuần, có thể chạy trực tiếp trên **GitHub Pages**. Không cần cài framework, không cần build, không gọi API bên ngoài.

## Chạy thử trên máy

1. Tải hoặc clone thư mục này.
2. Mở `index.html` bằng trình duyệt; hoặc chạy server tĩnh:

   ```bash
   python3 -m http.server 8000
   ```

3. Mở `http://localhost:8000`.

## Đưa lên GitHub Pages

1. Tạo một repository mới trên GitHub.
2. Đưa các file `index.html`, `styles.css`, `content.js`, `app.js`, `README.md` và `.nojekyll` vào thư mục gốc của nhánh `main`.
3. Mở **Settings → Pages**.
4. Trong **Build and deployment**, chọn **Deploy from a branch**.
5. Chọn nhánh `main`, thư mục `/(root)`, bấm **Save**.
6. Đợi GitHub Pages cấp đường dẫn. Mỗi lần cập nhật rồi `git push`, trang sẽ tự đăng bản mới.

## Có gì trong bản này?

- 4 khu vực ôn tập: Toán, Ngữ văn, Tiếng Anh, Tin học.
- 16 bài học ngắn ban đầu, có mục tiêu, kiến thức cốt lõi, ví dụ và cách làm.
- 4 bài luyện mini: Toán, Văn, Anh, Tin học. Bài trắc nghiệm có đồng hồ, tự chấm và giải thích; bài Văn có đề viết và phiếu tự đánh giá.
- Tìm kiếm, lọc môn, lưu bài, đánh dấu hoàn thành và theo dõi tiến độ.
- Giao diện sáng/tối; đồng hồ tập trung 25 phút.
- Bình luận dưới bài học, hồ sơ tên hiển thị, ghi chú tự thêm và sao lưu/nhập dữ liệu JSON.
- Biểu mẫu góp ý mở ứng dụng email mặc định của người học.
- Ảnh minh họa dạng SVG ở chân trang cho năm thành viên.

## Cập nhật nội dung

- **Cập nhật chung cho tất cả người truy cập:** chỉnh `content.js`, sau đó commit/push lên GitHub. Bài học nằm trong `STUDY_DATA.lessons`; bài luyện nằm trong `STUDY_DATA.tests`; nguồn tham khảo nằm trong `STUDY_DATA.sources`.
- **Thêm ghi chú ngay trên trang:** dùng nút **Thêm kiến thức**. Ghi chú dạng này chỉ lưu trong trình duyệt hiện tại. Có thể dùng **Xuất dữ liệu** / **Nhập dữ liệu** để chuyển ghi chú và tiến độ giữa thiết bị.
- Không nhập đề/đáp án khi chưa kiểm tra nguồn, năm áp dụng và quyền sử dụng. Hãy ghi rõ nguồn ở `STUDY_DATA.sources`.

## Cấu hình email góp ý

Trong `app.js`, đổi dòng:

```js
const FEEDBACK_EMAIL = "";
```

thành email chung của nhóm, ví dụ:

```js
const FEEDBACK_EMAIL = "email-cua-nhom@example.com";
```

Thay địa chỉ ví dụ bằng email thật trước khi triển khai. Nếu chưa cấu hình, người học có thể tự nhập email nhận góp ý trong biểu mẫu. Nút gửi mở ứng dụng email để người học xem lại và gửi; website tĩnh không tự chuyển email trên máy chủ.

## Lưu ý về tài khoản và bình luận

GitHub Pages chỉ phục vụ file tĩnh. Bản này có chế độ khách và hồ sơ tên hiển thị **lưu trong trình duyệt**, không phải đăng nhập bảo mật. Tiến độ, bài đã lưu, bài tự thêm, bản nháp và bình luận không được đồng bộ giữa thiết bị, cũng không gửi lên máy chủ. Muốn có đăng nhập thật, bình luận dùng chung hoặc cập nhật từ trang quản trị cho tất cả mọi người, cần bổ sung backend như Firebase/Supabase hoặc một API riêng và cấu hình bảo mật phù hợp.

## Nguồn và phạm vi nội dung

Bài giải thích, ví dụ và bài luyện trong trang được nhóm tự biên soạn theo hướng ôn tập; **các bài luyện không phải đề thi chính thức**. Trang liên kết tới nguồn Bộ GDĐT/Cục Quản lý chất lượng để người học tra cứu cấu trúc, đề tham khảo và đáp án. Hãy ưu tiên văn bản mới nhất của Bộ khi có cập nhật.

Các trang tham khảo chính:

- Cấu trúc, định dạng đề thi từ năm 2025: <https://vqa.moet.gov.vn/vi/news/thong-bao/cau-truc-dinh-dang-de-thi-tot-nghiep-thpt-tu-nam-2025-74.html>
- Đề thi tham khảo từ năm 2025: <https://vqa.moet.gov.vn/vi/news/tin-tuc-su-kien/de-thi-tham-khao-ky-thi-tot-nghiep-thpt-tu-nam-2025-159.html>
- Đáp án kỳ thi tốt nghiệp THPT 2025: <https://vqa.moet.gov.vn/vi/news/tin-tuc-su-kien/cong-bo-dap-an-cac-mon-thi-cua-ky-thi-tot-nghiep-thpt-2025-208.html>
- Thông tin không công bố đề minh họa mới cho kỳ thi năm 2026: <https://moet.gov.vn/tin-tuc/tin-tong-hop2/khong-cong-bo-de-minh-hoa-ki-thi-tot-nghiep-trung-hoc-pho-thong-nam-2026.html>
- Hướng dẫn tổ chức kỳ thi năm 2026: <https://moet.gov.vn/tin-tuc/tin-tong-hop2/bo-gddt-ban-hanh-huong-dan-to-chuc-ki-thi-tot-nghiep-thpt-nam-2026.html>

## Thành viên

Tiến Hùng · Đắc Kiên · Anh Khuê · Anh Hoàng · Nhật Khánh.

Ảnh SVG ở chân trang là hình minh họa, không phải ảnh chân dung thật. Có thể thay bằng ảnh được nhóm cung cấp và có quyền sử dụng.
