GoVietStay Cruise Landing EN + RU V3
=====================================

WHY V3
V2 required the BAT to be launched from the website project root.
V3 no longer requires that.

HOW TO USE
1. Extract the ZIP anywhere.
2. Double-click INSTALL-CRUISE-LANDING.bat.
3. The installer tries to find govietstay-main-website automatically.
4. If it cannot find it, a folder picker opens.
5. Select the govietstay-main-website folder — the one containing:
   - app
   - package.json
6. The installer copies both landing pages and runs npm run build.

FINAL ROUTES
EN:
https://www.govietstay.com/en/cruise-port-shore-excursions

RU:
https://www.govietstay.com/ru/kruiznye-ekskursii-chan-may-tien-sa

NOTE
The installer removes the obsolete local V1 route:
app/ru/cruise-port-shore-excursions
if it exists.
