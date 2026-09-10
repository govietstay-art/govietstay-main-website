GoVietStay — 6 English Phu Quoc SEO Landing Pages V1
Date: 10 Sep 2026

Routes
1. /travel/phu-quoc-private-tour
2. /travel/phu-quoc-snorkeling
3. /travel/phu-quoc-sunset-town
4. /travel/phu-quoc-rach-vem-starfish-beach
5. /travel/where-to-stay-phu-quoc
6. /travel/phu-quoc-vinwonders-vs-safari

SEO / conversion features
- One search intent per URL
- Canonical + Open Graph + Twitter metadata
- Article + Breadcrumb + FAQ structured data
- Mobile-first UI
- Internal links across the Phu Quoc cluster
- WhatsApp keyword tracking per landing page
- Private-tour page intentionally uses private quote rather than a fake fixed public price
- Current 2026 operator references included for VinWonders/Safari and Sunset Town
- Starfish page includes responsible wildlife guidance
- Does not overwrite /tours/phu-quoc or Russian pages

How to use
A. Extract this ZIP.
B. Run 01-INSTALL-AND-CHECK.bat.
   - It finds govietstay-main-website
   - Backs up any existing target files
   - Copies only the 9 target files
   - Runs npm run build
   - Does NOT push
C. If build passes, run 02-DEPLOY-PRODUCTION.bat.
   - Syncs main with autostash
   - Runs a fresh build
   - Stages only the 9 target files
   - Commits and pushes main
   - Waits for all 6 public URLs to return HTTP 200

Important
- The current connected GitHub tool returned no accessible repositories, so this pack follows the safe local-repo deployment workflow instead of writing blindly to production.
- The component is new and isolated under components/phu-quoc-seo.
- Existing pages are not deleted.
