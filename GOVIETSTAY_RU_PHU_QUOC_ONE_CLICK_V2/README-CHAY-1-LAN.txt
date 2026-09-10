GOVIETSTAY RU PHU QUOC — ONE CLICK V2
====================================

Vì ảnh lỗi cho thấy cluster CHƯA được cài vào project, bản V2 này gộp toàn bộ thành 1 lần chạy:

1. Tự tìm govietstay-main-website
2. Fetch/rebase GitHub main TRƯỚC khi sửa file
3. Tự giải nén payload 14 trang mới
4. Backup file cũ nếu trùng
5. Copy cluster vào đúng project
6. Đổi hero /ru/phu-quoc-help sang ảnh Phú Quốc mới
7. Dùng logo official /brand/govietstay-official-logo.jpg
8. Thêm “Гид по Фукуоку” vào RussianInternalLinks
9. npm run build
10. Chỉ stage cluster Phú Quốc
11. Commit
12. Push origin/main
13. KHÔNG force push

CÁCH DÙNG
---------
1. Giải nén NGUYÊN folder này.
2. Đặt nguyên folder GOVIETSTAY_RU_PHU_QUOC_ONE_CLICK_V2 bên trong:
   C:\Users\ADMIN\Documents\GitHub\govietstay-main-website\
3. Double-click:
   ONE-CLICK-INSTALL-BUILD-DEPLOY.bat
4. Khi thấy [OK] HOAN TAT - DA PUSH CLUSTER LEN GITHUB:
   đợi Vercel deploy xong.
5. Chạy:
   CHECK-LIVE-AFTER-VERCEL.bat
6. Khi 15 trang + sitemap đều [OK 200], mới submit Search Console.

KHÔNG chạy lại các file 01/07 cũ.
