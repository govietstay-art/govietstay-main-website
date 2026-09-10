GOVIETSTAY — RUSSIAN PHU QUOC SEO CLUSTER V1
==============================================

MỤC TIÊU
- Tổng cluster: 15 trang tiếng Nga.
- 14 trang mới + /ru/phu-quoc-help hiện có.
- Nội dung viết trực tiếp bằng tiếng Nga tự nhiên, không dịch máy từ English.
- Give-first: thông tin hữu ích trước, tour/booking ở phần sau.
- Logo chuẩn trên hero: /brand/govietstay-official-logo.jpg
- 2 hero Phú Quốc mới:
  /public/phu-quoc/ru-cluster/hero-sunset.png
  /public/phu-quoc/ru-cluster/hero-islands.png
- Sitemap riêng để submit Google Search Console:
  https://www.govietstay.com/ru/phu-quoc/sitemap.xml

15 URL
------
1. /ru/phu-quoc
2. /ru/phu-quoc-help
3. /ru/phu-quoc/chto-posmotret
4. /ru/phu-quoc/kuda-poehat
5. /ru/phu-quoc/s-detmi
6. /ru/phu-quoc/3-ili-4-ostrova
7. /ru/phu-quoc/pogoda
8. /ru/phu-quoc/russkiy-gid
9. /ru/phu-quoc/aeroport-transfer
10. /ru/phu-quoc/7-dney
11. /ru/phu-quoc/10-dney
12. /ru/phu-quoc/sunset-town
13. /ru/phu-quoc/from-moscow
14. /ru/phu-quoc/from-almaty
15. /ru/phu-quoc/from-tashkent

CÁCH CHẠY AN TOÀN
-----------------
Để nguyên folder GOVIETSTAY_RU_PHU_QUOC_CLUSTER_V1 bên trong govietstay-main-website.
Payload là ZIP, không có .tsx nằm lộ trong installer nên Next/TypeScript không quét nhầm như lần trước.

Thứ tự:
1) 01-INSTALL-RU-PHU-QUOC-CLUSTER.bat
2) 02-PATCH-HELP-VISUAL-LOGO.bat
3) 03-CHECK-FILES-RU-PHU-QUOC.bat
4) 04-BUILD-CHECK-RU-PHU-QUOC.bat
5) 05-COMMIT-PUSH-RU-PHU-QUOC.bat
6) Chờ Vercel deploy
7) 06-CHECK-LIVE-URLS.bat
8) 08-OPEN-GOOGLE-SEARCH-CONSOLE.bat

OPTIONAL
--------
07-ADD-RU-PHU-QUOC-INTERNAL-LINK.bat
- Thêm “Гид по Фукуоку” vào RussianInternalLinks.tsx.
- Sau khi chạy, build lại và commit file này riêng nếu muốn.

09-GIT-STATUS-RU-PHU-QUOC.bat
- Xem status Git và local có đi trước/đi sau origin/main hay không.

SEO ĐÃ CÓ TRONG CODE
--------------------
- Russian title / description / keywords
- canonical
- robots index/follow
- OpenGraph + Twitter
- Breadcrumb schema
- Article/CollectionPage schema
- FAQ schema
- Internal links giữa các trang trong cluster
- Link về /ru/phu-quoc-help
- Dedicated XML sitemap
- Sources section trên từng page
- Cập nhật nội dung: 10/09/2026

NGUỒN KIỂM CHỨNG
----------------
- Фукуок 24: routes, weather, Safari, VinWonders, Sunset Town, 7 days, 2 weeks
- АТОР
- КД МИД России
- Аэрофлот: Moscow–Phu Quoc announced from 15/10/2026
- Air Astana / Yandex schedules: Almaty
- Yandex schedules: Tashkent

LƯU Ý
-----
- Không tự động sửa app/sitemap.ts gốc. Cluster có sitemap riêng để giảm rủi ro.
- Google Search Console không thể “ép index” toàn bộ bằng BAT. Submit sitemap và Request Indexing hub /ru/phu-quoc.
- Sau 7–14 ngày xem Performance trong Search Console: query / page / country / impressions.
