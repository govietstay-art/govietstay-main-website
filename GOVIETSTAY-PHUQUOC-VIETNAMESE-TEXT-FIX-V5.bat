@echo off
setlocal EnableExtensions EnableDelayedExpansion
chcp 65001 >nul
title GoVietStay - Phu Quoc Vietnamese Text Fix V5

if /I not "%~1"=="RUN" (
  cmd.exe /k call "%~f0" RUN
  exit /b
)

echo.
echo ================================================================
echo  GOVIETSTAY - PHU QUOC VIETNAMESE TEXT FIX V5
echo ================================================================
echo.
echo  Sua loi chu bi vo font / mojibake:
echo   - Chi sua cac dong moi cua Partner Master bi sai encoding
echo   - Khong dung vao logic booking, QR, poster, commission
echo   - Giu 1 Partner Master duy nhat
echo   - Full build PASS moi push Production
echo.

set "PROJECT="
for /f "delims=" %%I in ('git rev-parse --show-toplevel 2^>nul') do set "PROJECT=%%I"
if not defined PROJECT if exist "%USERPROFILE%\Documents\GitHub\govietstay-main-website\.git" set "PROJECT=%USERPROFILE%\Documents\GitHub\govietstay-main-website"
if not defined PROJECT if exist "C:\Users\ADMIN\Documents\GitHub\govietstay-main-website\.git" set "PROJECT=C:\Users\ADMIN\Documents\GitHub\govietstay-main-website"
if not defined PROJECT if exist "%USERPROFILE%\govietstay-main-website\.git" set "PROJECT=%USERPROFILE%\govietstay-main-website"
if not defined PROJECT if exist "%USERPROFILE%\Desktop\govietstay-main-website\.git" set "PROJECT=%USERPROFILE%\Desktop\govietstay-main-website"

if not defined PROJECT (
  echo [STOP] Khong tu tim thay govietstay-main-website.
  set /p "PROJECT=Dan full path project roi Enter: "
)
if not exist "%PROJECT%\.git" (
  echo [STOP] Khong phai Git project: %PROJECT%
  pause
  exit /b 1
)

set "WORKTREE=%TEMP%\gvs_pq_textfix_v5_%RANDOM%_%RANDOM%"
set "GVS_WORKTREE=%WORKTREE%"
set "B64=%TEMP%\gvs_pq_textfix_v5_%RANDOM%_%RANDOM%.b64"
set "PS1=%TEMP%\gvs_pq_textfix_v5_%RANDOM%_%RANDOM%.ps1"

echo [1/9] Fetch origin/main...
git -C "%PROJECT%" fetch origin main
if errorlevel 1 goto FAIL

echo [2/9] Tao worktree sach...
git -C "%PROJECT%" worktree add --detach "%WORKTREE%" origin/main
if errorlevel 1 goto FAIL

echo [3/9] Tao file sua encoding...
> "%B64%" (
  echo JEVycm9yQWN0aW9uUHJlZmVyZW5jZSA9ICJTdG9wIgoKJHJvb3QgPSAkZW52OkdWU19XT1JLVFJFRQppZiAoLW5vdCAkcm9vdCkgeyB0aHJvdyAiR1ZTX1dPUktUUkVFIGlzIG5vdCBzZXQuIiB9CgokcGF0aCA9IEpvaW4tUGF0aCAkcm9vdCAiY29tcG9uZW50c1xhZG1pbi12NVxQaHVRdW9jU2FsZXNIdWIudHN4IgppZiAoLW5vdCAoVGVzdC1QYXRoICRwYXRoKSkgeyB0aHJvdyAiQ2Fubm90IGZpbmQgUGh1UXVvY1NhbGVzSHViLnRzeCIgfQoKJHV0ZjggPSBOZXctT2JqZWN0IFN5c3RlbS5UZXh0LlVURjhFbmNvZGluZygkZmFsc2UpCiRjcDEyNTIgPSBbU3lzdGVtLlRleHQuRW5jb2RpbmddOjpHZXRFbmNvZGluZygxMjUyKQoKJHMgPSBbSU8uRmlsZV06OlJlYWRBbGxUZXh0KCRwYXRoLCBbU3lzdGVtLlRleHQuRW5jb2RpbmddOjpVVEY4KQokbGluZXMgPSAkcyAtc3BsaXQgImBuIiwgLTEKJGZpeGVkQ291bnQgPSAwCgpmb3IgKCRpID0gMDsgJGkgLWx0ICRsaW5lcy5MZW5ndGg7ICRpKyspIHsKICAgICRsaW5lID0gJGxpbmVzWyRpXQoKICAgICMgT25seSB0b3VjaCBsaW5lcyB0aGF0IGNvbnRhaW4gY2xhc3NpYyBVVEYtOCAtPiBXaW5kb3dzLTEyNTIgbW9qaWJha2UuCiAgICAjIFRoaXMgYXZvaWRzIGNoYW5naW5nIHRoZSBhbHJlYWR5LWNvcnJlY3QgVmlldG5hbWVzZSB0ZXh0IGVsc2V3aGVyZS4KICAgIGlmICgkbGluZSAtbWF0Y2ggJ1vDg8OCw4TDhl0nIC1vcgogICAgICAgICRsaW5lIC1tYXRjaCAnw6LigqzCpicgLW9yCiAgICAgICAgJGxpbmUgLW1hdGNoICfDouKCrOKAnScgLW9yCiAgICAgICAgJGxpbmUgLW1hdGNoICfDouKAoOKAmScgLW9yCiAgICAgICAgJGxpbmUgLW1hdGNoICfDocK6JyAtb3IKICAgICAgICAkbGluZSAtbWF0Y2ggJ8OhwrsnKSB7CiAgICAgICAgdHJ5IHsKICAgICAgICAgICAgJGJ5dGVzID0gJGNwMTI1Mi5HZXRCeXRlcygkbGluZSkKICAgICAgICAgICAgJGNhbmRpZGF0ZSA9IFtTeXN0ZW0uVGV4dC5FbmNvZGluZ106OlVURjguR2V0U3RyaW5nKCRieXRlcykKCiAgICAgICAgICAgICMgQWNjZXB0IG9ubHkgd2hlbiB0aGUgY2FuZGlkYXRlIHJlZHVjZXMgdHlwaWNhbCBtb2ppYmFrZSBtYXJrZXJzLgogICAgICAgICAgICAkYmVmb3JlID0gKFtyZWdleF06Ok1hdGNoZXMoJGxpbmUsICfDg3zDgnzDhHzDhnzDouKCrMKmfMOi4oKs4oCdfMOi4oCg4oCZfMOhwrp8w6HCuycpKS5Db3VudAogICAgICAgICAgICAkYWZ0ZXIgID0gKFtyZWdleF06Ok1hdGNoZXMoJGNhbmRpZGF0ZSwgJ8ODfMOCfMOEfMOGfMOi4oKswqZ8w6LigqzigJ18w6LigKDigJl8w6HCunzDocK7JykpLkNvdW50CiAgICAgICAgICAgIGlmICgkYWZ0ZXIgLWx0ICRiZWZvcmUpIHsKICAgICAgICAgICAgICAgICRsaW5lc1skaV0gPSAkY2FuZGlkYXRlCiAgICAgICAgICAgICAgICAkZml4ZWRDb3VudCsrCiAgICAgICAgICAgIH0KICAgICAgICB9IGNhdGNoIHt9CiAgICB9Cn0KCiRvdXQgPSBbc3RyaW5nXTo6Sm9pbigiYG4iLCAkbGluZXMpCgojIFNhZmV0eSBjaGVja3M6IHRoZSBzaGFyZWQgUGFydG5lciBNYXN0ZXIgY29kZSBtdXN0IHN0aWxsIGV4aXN0LgokcmVxdWlyZWQgPSBAKAogICAgIkdWU19QUV9QQVJUTkVSX01BU1RFUl9WMyIsCiAgICAnYWRtaW5fY3JlYXRlX3BhcnRuZXInLAogICAgJ2xvYWRQYXJ0bmVyTWFzdGVyJywKICAgICdjcmVhdGVQYXJ0bmVyUXVpY2snLAogICAgJ1NpbmdsZSBQYXJ0bmVyIE1hc3RlcicsCiAgICAnUGh1UXVvY1BhcnRuZXJQb3N0ZXJJbmxpbmUnCikKZm9yZWFjaCAoJG5lZWRsZSBpbiAkcmVxdWlyZWQpIHsKICAgIGlmICgtbm90ICRvdXQuQ29udGFpbnMoJG5lZWRsZSkpIHsgdGhyb3cgIlNhZmV0eSBjaGVjayBmYWlsZWQ6IG1pc3NpbmcgJG5lZWRsZSIgfQp9CgojIFRoZXNlIHZpc2libGUgbGFiZWxzIE1VU1Qgbm93IGJlIHJlYWRhYmxlLgokZXhwZWN0ZWRSZWFkYWJsZSA9IEAoCiAgICAiUGFydG5lciBNYXN0ZXIgY2h1bmciLAogICAgIkNo4buNbiBwYXJ0bmVyIiwKICAgICIrIFRow6ptIFBhcnRuZXIiLAogICAgIkPhuq1wIG5o4bqtdCIsCiAgICAiVGjDqm0gUGFydG5lciBt4bubaSIsCiAgICAiVMOqbiDEkeG7kWkgdMOhYyIsCiAgICAiTcOjIMSR4buRaSB0w6FjIiwKICAgICJUw6puIGxpw6puIGjhu4ciLAogICAgIsSQaeG7h24gdGhv4bqhaSAvIFdoYXRzQXBwIiwKICAgICJMb+G6oWkgxJHhu5FpIHTDoWMiLAogICAgIlRo4buLIHRyxrDhu51uZyIsCiAgICAixq91IMSRw6NpIGtow6FjaCIsCiAgICAiTmfDoHkgYuG6r3QgxJHhuqd1IiwKICAgICJU4bqhbyBQYXJ0bmVyIHbDoG8gUGFydG5lciBNYXN0ZXIiCikKZm9yZWFjaCAoJG5lZWRsZSBpbiAkZXhwZWN0ZWRSZWFkYWJsZSkgewogICAgaWYgKC1ub3QgJG91dC5Db250YWlucygkbmVlZGxlKSkgeyB0aHJvdyAiRW5jb2RpbmcgcmVwYWlyIGluY29tcGxldGU6IG1pc3NpbmcgcmVhZGFibGUgbGFiZWwgJyRuZWVkbGUnIiB9Cn0KCiMgTm8gY29tbW9uIG1vamliYWtlIHNob3VsZCByZW1haW4gaW4gdGhlIGluc2VydGVkIFBhcnRuZXIgTWFzdGVyIHNlY3Rpb24uCiRzdGFydCA9ICRvdXQuSW5kZXhPZigiYXN5bmMgZnVuY3Rpb24gbG9hZFBhcnRuZXJNYXN0ZXIiKQokZW5kID0gJG91dC5JbmRleE9mKCc8bGFiZWw+PGRpdiBjbGFzc05hbWU9Imd2YS1taW5pIj5MYW5kaW5nIGxhbmd1YWdlPC9kaXY+JykKaWYgKCRzdGFydCAtbHQgMCAtb3IgJGVuZCAtbGUgJHN0YXJ0KSB7IHRocm93ICJDYW5ub3QgbG9jYXRlIFBhcnRuZXIgTWFzdGVyIHNlY3Rpb24gZm9yIHZlcmlmaWNhdGlvbi4iIH0KJHNlY3Rpb24gPSAkb3V0LlN1YnN0cmluZygkc3RhcnQsICRlbmQgLSAkc3RhcnQpCmlmICgkc2VjdGlvbiAtbWF0Y2ggJ8ODfMOCfMOEfMOGfMOi4oKswqZ8w6LigqzigJ18w6LigKDigJl8w6HCunzDocK7JykgewogICAgdGhyb3cgIk1vamliYWtlIG1hcmtlcnMgc3RpbGwgcmVtYWluIGluIFBhcnRuZXIgTWFzdGVyIHNlY3Rpb24uIgp9CgpbSU8uRmlsZV06OldyaXRlQWxsVGV4dCgkcGF0aCwgJG91dCwgJHV0ZjgpCgpXcml0ZS1Ib3N0ICgiW09LXSBGaXhlZCBlbmNvZGluZyBvbiAiICsgJGZpeGVkQ291bnQgKyAiIHNvdXJjZSBsaW5lcy4iKSAtRm9yZWdyb3VuZENvbG9yIEdyZWVuCldyaXRlLUhvc3QgIltPS10gVmlldG5hbWVzZSBsYWJlbHMgdmVyaWZpZWQgcmVhZGFibGUuIiAtRm9yZWdyb3VuZENvbG9yIEdyZWVuCg==
)
if errorlevel 1 goto FAIL_WORKTREE

powershell -NoProfile -ExecutionPolicy Bypass -Command "$b=(Get-Content -Raw -LiteralPath '%B64%') -replace '\s',''; [IO.File]::WriteAllBytes('%PS1%',[Convert]::FromBase64String($b))"
if errorlevel 1 goto FAIL_WORKTREE

echo [4/9] Sua chu tieng Viet...
powershell -NoProfile -ExecutionPolicy Bypass -File "%PS1%"
if errorlevel 1 goto FAIL_WORKTREE

echo [5/9] Kiem tra diff...
git -C "%WORKTREE%" diff -- "components/admin-v5/PhuQuocSalesHub.tsx"
if errorlevel 1 goto FAIL_WORKTREE

echo [6/9] npm ci...
call npm --prefix "%WORKTREE%" ci
if errorlevel 1 goto FAIL_WORKTREE

echo [7/9] FULL BUILD...
call npm --prefix "%WORKTREE%" run build
if errorlevel 1 goto FAIL_WORKTREE

echo [8/9] Commit...
git -C "%WORKTREE%" config user.name "GoVietStay Automation"
git -C "%WORKTREE%" config user.email "govietstay-art@users.noreply.github.com"
git -C "%WORKTREE%" add -- "components/admin-v5/PhuQuocSalesHub.tsx"
git -C "%WORKTREE%" diff --cached --quiet
if not errorlevel 1 goto VERIFY

git -C "%WORKTREE%" commit -m "fix(admin): repair Phu Quoc Partner Master Vietnamese encoding"
if errorlevel 1 goto FAIL_WORKTREE

echo [9/9] Push origin main...
git -C "%WORKTREE%" push origin HEAD:main
if errorlevel 1 goto FAIL_WORKTREE

:VERIFY
echo.
echo ================================================================
echo  THANH CONG - V5 TEXT FIX
echo ================================================================
echo.
echo  Sau khi Vercel deploy:
echo   Admin ^> Phu Quoc Sales
echo   Chu phai hien dung: Chon partner / Them Partner / Cap nhat...
echo.
start "" "https://www.govietstay.com/admin"

git -C "%PROJECT%" worktree remove --force "%WORKTREE%" >nul 2>&1
del /q "%B64%" "%PS1%" >nul 2>&1
pause
exit /b 0

:FAIL_WORKTREE
echo.
echo [STOP] CO LOI - KHONG PUSH PRODUCTION.
echo Worktree: %WORKTREE%
del /q "%B64%" "%PS1%" >nul 2>&1
echo.
echo Cua so giu nguyen. Chup man hinh gui em.
pause
exit /b 1

:FAIL
echo.
echo [STOP] CO LOI TRUOC KHI PUSH. Production khong thay doi.
del /q "%B64%" "%PS1%" >nul 2>&1
pause
exit /b 1
