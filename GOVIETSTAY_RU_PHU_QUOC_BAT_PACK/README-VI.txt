GoVietStay RU Phu Quoc Help — V3 CLEAN
========================================

V3 này cố tình làm đơn giản để tránh sửa nhiều file cùng lúc.

V3 CHỈ:
1. Xác nhận đúng root govietstay-main-website.
2. Copy đúng 1 file:
   app\ru\phu-quoc-help\page.tsx
3. Chạy npm run build.
4. Ghi TOÀN BỘ kết quả build vào BUILD-RESULT.txt.

V3 KHÔNG:
- sửa app\sitemap.ts
- sửa components\RussianInternalLinks.tsx
- sửa app\ru\layout.tsx
- sửa tracking
- sửa route cũ
- deploy

CÁCH ĐẶT THƯ MỤC
C:\Users\ADMIN\Documents\GitHub\govietstay-main-website\
    package.json
    app\
    components\
    GoVietStay_RU_PhuQuoc_Help_V3_CLEAN\
        BAM-1-LAN-V3-CLEAN.bat
        payload\...

Sau đó double click:
BAM-1-LAN-V3-CLEAN.bat

NẾU BUILD FAIL:
- Không chạy thêm installer nào.
- Gửi file BUILD-RESULT.txt cho ChatGPT.
- File này nằm ngay trong thư mục V3.
