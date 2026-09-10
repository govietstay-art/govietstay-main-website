GOVIETSTAY RU PHU QUOC BAT PACK
=================================

Đây là bộ tổng hợp các file .BAT liên quan tới trang Russian Phu Quoc Help
và các bước build / push / deploy mà mình đã dùng.

FILE NÀO DÙNG ĐỂ LÀM GÌ
-----------------------
1) BAM-1-LAN-V3-CLEAN.bat
   - Cài page app\ru\phu-quoc-help\page.tsx vào project
   - Không sửa sitemap / layout / internal links
   - Dùng để cài page lần đầu

2) FIX-RU-PHU-QUOC-BUILD.bat
   - Xóa các folder installer cũ gây lỗi TypeScript
   - Build lại project
   - Dùng khi đã cài page nhưng build bị quét nhầm file .tsx trong installer

3) BAM-DEPLOY-RU-PHU-QUOC-HELP.bat
   - Build -> commit đúng 1 page -> push main
   - Dùng sau khi page đã cài và build ổn

4) FIX-PUSH-RU-PHU-QUOC-HELP.bat
   - Sửa lỗi push bị rejected non-fast-forward
   - Fetch -> rebase -> build -> push
   - Bản này dừng nếu phát hiện thay đổi local tracked/staged

5) FIX-PUSH-RU-PHU-QUOC-V2-AUTOSTASH.bat
   - Bản linh hoạt hơn của số 4
   - Bỏ qua file ?? (untracked)
   - Tự autostash file tracked nếu có
   - Dùng khi repo có nhiều file phụ bên ngoài

6) BAM-1-LAN-CAP-NHAT-VA-DEPLOY-V22.bat
   - File cũ dành cho LOCAL POINT V22
   - KHÔNG dùng cho Russian Phu Quoc Help
   - Chỉ để anh lưu lại vì anh có yêu cầu xuất luôn file này

THỨ TỰ NÊN DÙNG
---------------
A. Cài page:
   BAM-1-LAN-V3-CLEAN.bat

B. Nếu build lỗi do installer cũ:
   FIX-RU-PHU-QUOC-BUILD.bat

C. Push bình thường:
   BAM-DEPLOY-RU-PHU-QUOC-HELP.bat

D. Nếu push bị non-fast-forward:
   FIX-PUSH-RU-PHU-QUOC-HELP.bat
   hoặc dùng luôn:
   FIX-PUSH-RU-PHU-QUOC-V2-AUTOSTASH.bat

LƯU Ý
-----
- Đặt các file này trong hoặc cạnh project:
  C:\Users\ADMIN\Documents\GitHub\govietstay-main-website\
- File V22 là cho Local Point, không phải cho cluster Phú Quốc.
- Bộ này là batch tools; còn phần nội dung / payload page nằm ở gói V3 CLEAN installer.
