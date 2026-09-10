GoVietStay Cruise Deploy V2
============================

WHY THE FIRST PUSH FAILED
GitHub rejected main -> main as non-fast-forward because origin/main contains newer commits.
This is normal when another update reached GitHub after the local checkout was last synced.

DO NOT FORCE PUSH.

V2 SAFELY DOES
1. git fetch origin main
2. git rebase origin/main
3. npm run build
4. git push origin main

It checks for uncommitted tracked changes before doing anything.
Untracked installer folders are ignored and are not pushed.

If a rebase conflict happens, V2 automatically aborts the rebase and restores the local state.
Then send the screenshot to ChatGPT.

RUN
Double click:
SYNC-BUILD-PUSH-CRUISE.bat

FINAL URLS
https://www.govietstay.com/en/cruise-port-shore-excursions
https://www.govietstay.com/ru/kruiznye-ekskursii-chan-may-tien-sa
