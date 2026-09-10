GoVietStay Cruise Deploy V3 - STASH SAFE
===========================================

CURRENT PROBLEM
The project has an unrelated tracked local modification:
M HUONG-DAN.txt

That file should NOT be included in the cruise landing deployment.

V3 SOLUTION
1. Temporarily git-stash tracked local modifications.
2. Fetch latest origin/main.
3. Rebase the already-created cruise commit on top of remote main.
4. Run npm run build.
5. Push main to GitHub without force.
6. Restore the user's local modifications after the push.

Untracked V1/V2/V3/V4/V5 installer folders are NOT included by the normal git stash
and are NOT staged/pushed by this script.

RUN
Double-click:
DEPLOY-CRUISE-V3-STASH-SAFE.bat

SUCCESS MESSAGE
PUSH SUCCESSFUL - VERCEL DEPLOY SHOULD START AUTOMATICALLY

FINAL URLS
https://www.govietstay.com/en/cruise-port-shore-excursions
https://www.govietstay.com/ru/kruiznye-ekskursii-chan-may-tien-sa
