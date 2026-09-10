GoVietStay Cruise Landing V5
================================

WHY V4 FAILED
Windows reported that GOVIETSTAY-CRUISE-LANDING-EN-RU-V2 was in use by another process.
V4 tried to delete it and therefore stopped.

WHY V5 IS DIFFERENT
V5 DOES NOT DELETE any V1/V2/V3/V4 installer folder.

The project tsconfig currently includes **/*.tsx, so TypeScript scans .tsx files even
inside extracted installer packages. V5 adds this safe exclusion:

GOVIETSTAY-CRUISE-LANDING-EN-RU-V*/**/*

This means old installer folders may remain on disk without affecting Next.js type checking.

V5 also:
- backs up tsconfig.json to tsconfig.before-cruise-v5.json
- installs the real English page
- installs the real Russian page
- clears .next if possible
- runs npm run build

HOW TO USE
1. Extract V5 anywhere.
2. Double click INSTALL-CRUISE-V5.bat.
3. If asked, select:
   C:\Users\ADMIN\Documents\GitHub\govietstay-main-website
4. Wait for SUCCESS - BUILD OK.

FINAL ROUTES
EN:
https://www.govietstay.com/en/cruise-port-shore-excursions

RU:
https://www.govietstay.com/ru/kruiznye-ekskursii-chan-may-tien-sa

If build still fails, send a screenshot beginning at the first red error.
