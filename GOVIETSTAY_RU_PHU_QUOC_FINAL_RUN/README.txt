CHỈ CHẠY 1 FILE
===============
1. Giải nén NGUYÊN folder GOVIETSTAY_RU_PHU_QUOC_FINAL_RUN.
2. Đặt nguyên folder bên trong:
   C:\Users\ADMIN\Documents\GitHub\govietstay-main-website\
3. Double-click:
   CHAY-FILE-NAY-DUY-NHAT.bat
4. KHÔNG chạy file CHECK riêng.
5. File này tự:
   sync -> install -> patch visual/logo -> verify -> build -> commit -> push -> chờ Vercel -> check 15 URL.

Nếu kết thúc ở [OK] HUB DA LIVE 200 thì xong.
Nếu kết thúc ở [CHO] GitHub da push, nhưng production chưa live thì gửi ảnh đó cho ChatGPT; lúc đó chỉ kiểm tra Vercel, KHÔNG cài lại cluster.
