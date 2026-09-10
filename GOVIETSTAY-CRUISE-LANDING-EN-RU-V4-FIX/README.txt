GoVietStay Cruise Landing V4 FIX
================================

THE ERROR THIS FIXES
Next.js was type-checking a leftover installer copy such as:

GOVIETSTAY-CRUISE-LANDING-EN-RU-V2/payload/app/en/cruise-port-shore-excursions/page.tsx

That payload copy is NOT the real landing route. Because it lived inside the project root,
TypeScript scanned it and its relative import to components/JsonLd failed.

WHAT V4 DOES
1. Finds govietstay-main-website.
2. Deletes ONLY leftover folders whose names start with:
   GOVIETSTAY-CRUISE-LANDING-EN-RU-V...
   when they are inside the project root.
3. Keeps/reinstalls the real pages under:
   app/en/cruise-port-shore-excursions/page.tsx
   app/ru/kruiznye-ekskursii-chan-may-tien-sa/page.tsx
4. Removes obsolete:
   app/ru/cruise-port-shore-excursions
5. Runs npm run build.

HOW TO USE
Extract V4 OUTSIDE the govietstay-main-website folder if possible.
Double click:
FIX-AND-INSTALL-CRUISE-LANDING.bat

If asked, select the govietstay-main-website folder.

NOTE ABOUT MULTIPLE LOCKFILES
The warning about C:\Users\ADMIN\package-lock.json is separate.
It does not cause this TypeScript failure. If the build succeeds, it can be cleaned later.
