GoVietStay Cruise Deploy V1
============================

USE THIS ONLY AFTER V5 SHOWS:
SUCCESS - BUILD OK

WHAT IT DOES
- Finds C:\Users\ADMIN\Documents\GitHub\govietstay-main-website
- Stages ONLY:
  app/en/cruise-port-shore-excursions/page.tsx
  app/ru/kruiznye-ekskursii-chan-may-tien-sa/page.tsx
  tsconfig.json
- Creates a Git commit
- Pushes the CURRENT branch to origin
- Vercel should automatically deploy from the connected GitHub repository

WHAT IT DOES NOT PUSH
- GOVIETSTAY-CRUISE-LANDING-EN-RU-V1
- GOVIETSTAY-CRUISE-LANDING-EN-RU-V2
- GOVIETSTAY-CRUISE-LANDING-EN-RU-V3...
- GOVIETSTAY-CRUISE-LANDING-EN-RU-V4...
- GOVIETSTAY-CRUISE-LANDING-EN-RU-V5...
- tsconfig.before-cruise-v5.json
unless those were already separately staged before running.

RECOMMENDATION
Before running this BAT, make sure no unrelated files are already staged in Git.
The script shows staged files before committing.

FINAL URLS
https://www.govietstay.com/en/cruise-port-shore-excursions
https://www.govietstay.com/ru/kruiznye-ekskursii-chan-may-tien-sa
