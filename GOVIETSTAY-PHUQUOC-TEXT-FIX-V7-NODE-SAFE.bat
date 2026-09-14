@echo off
setlocal EnableExtensions EnableDelayedExpansion
chcp 65001 >nul
title GoVietStay - Phu Quoc Text Fix V7 Node Safe

if /I not "%~1"=="RUN" (
  cmd.exe /k call "%~f0" RUN
  exit /b
)

echo.
echo ================================================================
echo  GOVIETSTAY - PHU QUOC TEXT FIX V7 - NODE SAFE
echo ================================================================
echo.
echo  V7 KHONG DUNG POWERSHELL PATCH.
echo  Node.js patch ASCII-only + Unicode escape.
echo  Full build PASS moi push Production.
echo.

set "PROJECT="
for /f "delims=" %%I in ('git rev-parse --show-toplevel 2^>nul') do set "PROJECT=%%I"
if not defined PROJECT if exist "%USERPROFILE%\Documents\GitHub\govietstay-main-website\.git" set "PROJECT=%USERPROFILE%\Documents\GitHub\govietstay-main-website"
if not defined PROJECT if exist "C:\Users\ADMIN\Documents\GitHub\govietstay-main-website\.git" set "PROJECT=C:\Users\ADMIN\Documents\GitHub\govietstay-main-website"
if not defined PROJECT if exist "%USERPROFILE%\govietstay-main-website\.git" set "PROJECT=%USERPROFILE%\govietstay-main-website"
if not defined PROJECT if exist "%USERPROFILE%\Desktop\govietstay-main-website\.git" set "PROJECT=%USERPROFILE%\Desktop\govietstay-main-website"

if not defined PROJECT (
  echo [STOP] Khong tu tim thay project.
  set /p "PROJECT=Dan full path project roi Enter: "
)
if not exist "%PROJECT%\.git" (
  echo [STOP] Khong phai Git project: %PROJECT%
  pause
  exit /b 1
)

set "WORKTREE=%TEMP%\gvs_pq_textfix_v7_%RANDOM%_%RANDOM%"
set "GVS_WORKTREE=%WORKTREE%"
set "B64=%TEMP%\gvs_pq_textfix_v7_%RANDOM%_%RANDOM%.b64"
set "JS=%TEMP%\gvs_pq_textfix_v7_%RANDOM%_%RANDOM%.js"

echo [1/9] Fetch origin/main...
git -C "%PROJECT%" fetch origin main
if errorlevel 1 goto FAIL

echo [2/9] Tao worktree sach...
git -C "%PROJECT%" worktree add --detach "%WORKTREE%" origin/main
if errorlevel 1 goto FAIL

echo [3/9] Tao Node patch ASCII-only...
> "%B64%" (
  echo Y29uc3QgZnMgPSByZXF1aXJlKCJmcyIpOwpjb25zdCBwYXRoID0gcmVxdWlyZSgicGF0aCIpOwpjb25zdCByb290ID0gcHJvY2Vzcy5lbnYuR1ZTX1dPUktUUkVFOwppZiAoIXJvb3QpIHRocm93IG5ldyBFcnJvcigiR1ZTX1dPUktUUkVFIGlzIG5vdCBzZXQiKTsKY29uc3QgdGFyZ2V0ID0gcGF0aC5qb2luKHJvb3QsICJjb21wb25lbnRzIiwgImFkbWluLXY1IiwgIlBodVF1b2NTYWxlc0h1Yi50c3giKTsKbGV0IHMgPSBmcy5yZWFkRmlsZVN5bmModGFyZ2V0LCAidXRmOCIpOwoKY29uc3QgcmVwbGFjZW1lbnRzID0gWwogIFsiS2hcdTAwYzNcdTAwYjRuZyB0XHUwMGUxXHUwMGJhXHUwMGEzaSBcdTAwYzRcdTIwMThcdTAwYzZcdTAwYjBcdTAwZTFcdTAwYmJcdTAwYTNjIFBhcnRuZXIgTWFzdGVyLiIsICJLaFx1MDBmNG5nIHRcdTFlYTNpIFx1MDExMVx1MDFiMFx1MWVlM2MgUGFydG5lciBNYXN0ZXIuIl0sCiAgWyJDXHUwMGUxXHUwMGJhXHUwMGE3biB0XHUwMGMzXHUwMGFhbiBwYXJ0bmVyIHZcdTAwYzNcdTAwYTAgbVx1MDBjM1x1MDBhMyBwYXJ0bmVyLiIsICJDXHUxZWE3biB0XHUwMGVhbiBwYXJ0bmVyIHZcdTAwZTAgbVx1MDBlMyBwYXJ0bmVyLiJdLAogIFsiXHUwMGM0XHUyMDE4XHUwMGMzXHUwMGEzIGNcdTAwYzNcdTAwYjMgdHJvbmcgUGFydG5lciBNYXN0ZXIuIFx1MDBjNFx1MDA5MFx1MDBjM1x1MDBhMyBjaFx1MDBlMVx1MDBiYlx1MDA4ZG4gcGFydG5lciBoaVx1MDBlMVx1MDBiYlx1MjAyMW4gY1x1MDBjM1x1MDBiMywga2hcdTAwYzNcdTAwYjRuZyB0XHUwMGUxXHUwMGJhXHUwMGExbyB0clx1MDBjM1x1MDBiOW5nLiIsICJcdTAxMTFcdTAwZTMgY1x1MDBmMyB0cm9uZyBQYXJ0bmVyIE1hc3Rlci4gXHUwMTEwXHUwMGUzIGNoXHUxZWNkbiBwYXJ0bmVyIGhpXHUxZWM3biBjXHUwMGYzLCBraFx1MDBmNG5nIHRcdTFlYTFvIHRyXHUwMGY5bmcuIl0sCiAgWyJ2aVx1MDBlMVx1MDBiYlx1MjAyMXQiLCAidmlcdTFlYzd0Il0sCiAgWyJcdTAwYzRcdTAwOTBcdTAwYzNcdTAwYTMgdFx1MDBlMVx1MDBiYVx1MDBhMW8gIiwgIlx1MDExMFx1MDBlMyB0XHUxZWExbyAiXSwKICBbIiB2XHUwMGMzXHUwMGEwbyBQYXJ0bmVyIE1hc3RlciBjaHVuZyB2XHUwMGMzXHUwMGEwIGNoXHUwMGUxXHUwMGJiXHUwMDhkbiBjaG8gUGhcdTAwYzNcdTAwYmEgUXVcdTAwZTFcdTAwYmJcdTIwMThjIFNhbGVzLiIsICIgdlx1MDBlMG8gUGFydG5lciBNYXN0ZXIgY2h1bmcgdlx1MDBlMCBjaFx1MWVjZG4gY2hvIFBoXHUwMGZhIFF1XHUxZWQxYyBTYWxlcy4iXSwKICBbIktoXHUwMGMzXHUwMGI0bmcgdFx1MDBlMVx1MDBiYVx1MDBhMW8gXHUwMGM0XHUyMDE4XHUwMGM2XHUwMGIwXHUwMGUxXHUwMGJiXHUwMGEzYyBwYXJ0bmVyIHRyb25nIFBhcnRuZXIgTWFzdGVyLiIsICJLaFx1MDBmNG5nIHRcdTFlYTFvIFx1MDExMVx1MDFiMFx1MWVlM2MgcGFydG5lciB0cm9uZyBQYXJ0bmVyIE1hc3Rlci4iXSwKICBbIlBhcnRuZXIgXHUwMGMyXHUwMGI3IFBhcnRuZXIgTWFzdGVyIGNodW5nIiwgIlBhcnRuZXIgXHUwMGI3IFBhcnRuZXIgTWFzdGVyIGNodW5nIl0sCiAgWyJcdTAwYzRcdTAwOTBhbmcgdFx1MDBlMVx1MDBiYVx1MDBhM2kgUGFydG5lciBNYXN0ZXJcdTAwZTJcdTIwYWNcdTAwYTYiLCAiXHUwMTEwYW5nIHRcdTFlYTNpIFBhcnRuZXIgTWFzdGVyXHUyMDI2Il0sCiAgWyJcdTAwZTJcdTIwYWNcdTIwMWQgQ2hcdTAwZTFcdTAwYmJcdTAwOGRuIHBhcnRuZXIgXHUwMGUyXHUyMGFjXHUyMDFkIiwgIlx1MjAxNCBDaFx1MWVjZG4gcGFydG5lciBcdTIwMTQiXSwKICBbIiBcdTAwYzJcdTAwYjcgIiwgIiBcdTAwYjcgIl0sCiAgWyJcdTAwYzRcdTAwOTBcdTAwYzNcdTAwYjNuZyIsICJcdTAxMTBcdTAwZjNuZyJdLAogIFsiKyBUaFx1MDBjM1x1MDBhYW0gUGFydG5lciIsICIrIFRoXHUwMGVhbSBQYXJ0bmVyIl0sCiAgWyJDXHUwMGUxXHUwMGJhXHUwMGFkcCBuaFx1MDBlMVx1MDBiYVx1MDBhZHQiLCAiQ1x1MWVhZHAgbmhcdTFlYWR0Il0sCiAgWyJHaWFvIGRpXHUwMGUxXHUwMGJiXHUyMDIxbiBQaFx1MDBjM1x1MDBiYSBRdVx1MDBlMVx1MDBiYlx1MjAxOGMgdFx1MDBjM1x1MDBhMWNoIHJpXHUwMGMzXHUwMGFhbmcsIG5oXHUwMGM2XHUwMGIwbmcgZFx1MDBlMVx1MDBiYlx1MDBhZiBsaVx1MDBlMVx1MDBiYlx1MjAyMXUgcGFydG5lciB2XHUwMGUxXHUwMGJhXHUwMGFibiBnaGkgdlx1MDBjM1x1MDBhMG8gbVx1MDBlMVx1MDBiYlx1MjEyMnQgUGFydG5lciBNYXN0ZXIgZHV5IG5oXHUwMGUxXHUwMGJhXHUwMGE1dC4iLCAiR2lhbyBkaVx1MWVjN24gUGhcdTAwZmEgUXVcdTFlZDFjIHRcdTAwZTFjaCByaVx1MDBlYW5nLCBuaFx1MDFiMG5nIGRcdTFlZWYgbGlcdTFlYzd1IHBhcnRuZXIgdlx1MWVhYm4gZ2hpIHZcdTAwZTBvIG1cdTFlZDl0IFBhcnRuZXIgTWFzdGVyIGR1eSBuaFx1MWVhNXQuIl0sCiAgWyJUaFx1MDBjM1x1MDBhYW0gUGFydG5lciBtXHUwMGUxXHUwMGJiXHUyMDNhaSBcdTAwYzJcdTAwYjcgUGhcdTAwYzNcdTAwYmEgUXVcdTAwZTFcdTAwYmJcdTIwMThjIiwgIlRoXHUwMGVhbSBQYXJ0bmVyIG1cdTFlZGJpIFx1MDBiNyBQaFx1MDBmYSBRdVx1MWVkMWMiXSwKICBbIkxcdTAwYzZcdTAwYjB1IHRyXHUwMGUxXHUwMGJiXHUwMGIxYyB0aVx1MDBlMVx1MDBiYVx1MDBiZnAgdlx1MDBjM1x1MDBhMG8gUGFydG5lcnMgdGhcdTAwYzZcdTAwYjBcdTAwZTFcdTAwYmJcdTAwOWRuZyAvIFFSIFx1MDBlMlx1MjAyMFx1MjAxOSBQYXJ0bmVyIERlcGxveW1lbnQgQ2VudGVyLiIsICJMXHUwMWIwdSB0clx1MWVmMWMgdGlcdTFlYmZwIHZcdTAwZTBvIFBhcnRuZXJzIHRoXHUwMWIwXHUxZWRkbmcgLyBRUiBcdTIxOTIgUGFydG5lciBEZXBsb3ltZW50IENlbnRlci4iXSwKICBbIlRcdTAwYzNcdTAwYWFuIFx1MDBjNFx1MjAxOFx1MDBlMVx1MDBiYlx1MjAxOGkgdFx1MDBjM1x1MDBhMWMgLyBXZWJzaXRlICoiLCAiVFx1MDBlYW4gXHUwMTExXHUxZWQxaSB0XHUwMGUxYyAvIFdlYnNpdGUgKiJdLAogIFsiTVx1MDBjM1x1MDBhMyBcdTAwYzRcdTIwMThcdTAwZTFcdTAwYmJcdTIwMThpIHRcdTAwYzNcdTAwYTFjICoiLCAiTVx1MDBlMyBcdTAxMTFcdTFlZDFpIHRcdTAwZTFjICoiXSwKICBbIlRcdTAwYzNcdTAwYWFuIGxpXHUwMGMzXHUwMGFhbiBoXHUwMGUxXHUwMGJiXHUyMDIxIiwgIlRcdTAwZWFuIGxpXHUwMGVhbiBoXHUxZWM3Il0sCiAgWyJUXHUwMGMzXHUwMGFhbiBuZ1x1MDBjNlx1MDBiMFx1MDBlMVx1MDBiYlx1MDA5ZGkgcGhcdTAwZTFcdTAwYmJcdTAwYTUgdHJcdTAwYzNcdTAwYTFjaCIsICJUXHUwMGVhbiBuZ1x1MDFiMFx1MWVkZGkgcGhcdTFlZTUgdHJcdTAwZTFjaCJdLAogIFsiXHUwMGM0XHUwMDkwaVx1MDBlMVx1MDBiYlx1MjAyMW4gdGhvXHUwMGUxXHUwMGJhXHUwMGExaSAvIFdoYXRzQXBwIiwgIlx1MDExMGlcdTFlYzduIHRob1x1MWVhMWkgLyBXaGF0c0FwcCJdLAogIFsiKzg0XHUwMGUyXHUyMGFjXHUwMGE2IiwgIis4NFx1MjAyNiJdLAogIFsiTG9cdTAwZTFcdTAwYmFcdTAwYTFpIFx1MDBjNFx1MjAxOFx1MDBlMVx1MDBiYlx1MjAxOGkgdFx1MDBjM1x1MDBhMWMiLCAiTG9cdTFlYTFpIFx1MDExMVx1MWVkMWkgdFx1MDBlMWMiXSwKICBbIlRoXHUwMGUxXHUwMGJiXHUyMDM5IHRyXHUwMGM2XHUwMGIwXHUwMGUxXHUwMGJiXHUwMDlkbmciLCAiVGhcdTFlY2IgdHJcdTAxYjBcdTFlZGRuZyJdLAogIFsiXHUwMGM2XHUwMGFmdSBcdTAwYzRcdTIwMThcdTAwYzNcdTAwYTNpIGtoXHUwMGMzXHUwMGExY2ggKCUpIiwgIlx1MDFhZnUgXHUwMTExXHUwMGUzaSBraFx1MDBlMWNoICglKSJdLAogIFsiTmdcdTAwYzNcdTAwYTB5IGJcdTAwZTFcdTAwYmFcdTAwYWZ0IFx1MDBjNFx1MjAxOFx1MDBlMVx1MDBiYVx1MDBhN3UiLCAiTmdcdTAwZTB5IGJcdTFlYWZ0IFx1MDExMVx1MWVhN3UiXSwKICBbIlx1MDBjNFx1MDA5MGFuZyB0XHUwMGUxXHUwMGJhXHUwMGExb1x1MDBlMlx1MjBhY1x1MDBhNiIsICJcdTAxMTBhbmcgdFx1MWVhMW9cdTIwMjYiXSwKICBbIlRcdTAwZTFcdTAwYmFcdTAwYTFvIFBhcnRuZXIgdlx1MDBjM1x1MDBhMG8gUGFydG5lciBNYXN0ZXIiLCAiVFx1MWVhMW8gUGFydG5lciB2XHUwMGUwbyBQYXJ0bmVyIE1hc3RlciJdCl07CgpsZXQgY2hhbmdlZCA9IDA7CmZvciAoY29uc3QgW2JhZCwgZ29vZF0gb2YgcmVwbGFjZW1lbnRzKSB7CiAgaWYgKHMuaW5jbHVkZXMoYmFkKSkgewogICAgcyA9IHMuc3BsaXQoYmFkKS5qb2luKGdvb2QpOwogICAgY2hhbmdlZCsrOwogIH0KfQoKY29uc3QgcmVxdWlyZWQgPSBbCiAgIkdWU19QUV9QQVJUTkVSX01BU1RFUl9WMyIsCiAgImFkbWluX2NyZWF0ZV9wYXJ0bmVyIiwKICAibG9hZFBhcnRuZXJNYXN0ZXIiLAogICJjcmVhdGVQYXJ0bmVyUXVpY2siLAogICJTaW5nbGUgUGFydG5lciBNYXN0ZXIiLAogICJQaHVRdW9jUGFydG5lclBvc3RlcklubGluZSIsCiAgIkNoXHUxZWNkbiBwYXJ0bmVyIiwKICAiKyBUaFx1MDBlYW0gUGFydG5lciIsCiAgIkNcdTFlYWRwIG5oXHUxZWFkdCIsCiAgIlRoXHUwMGVhbSBQYXJ0bmVyIG1cdTFlZGJpIFx1MDBiNyBQaFx1MDBmYSBRdVx1MWVkMWMiLAogICJUXHUwMGVhbiBcdTAxMTFcdTFlZDFpIHRcdTAwZTFjIC8gV2Vic2l0ZSAqIiwKICAiVFx1MWVhMW8gUGFydG5lciB2XHUwMGUwbyBQYXJ0bmVyIE1hc3RlciIKXTsKZm9yIChjb25zdCBuZWVkbGUgb2YgcmVxdWlyZWQpIHsKICBpZiAoIXMuaW5jbHVkZXMobmVlZGxlKSkgdGhyb3cgbmV3IEVycm9yKCJWZXJpZmljYXRpb24gZmFpbGVkOiBtaXNzaW5nICIgKyBuZWVkbGUpOwp9Cgpjb25zdCBiYWRNYXJrZXJzID0gWyJcdTAwYzMiLCAiXHUwMGMyIiwgIlx1MDBjNCIsICJcdTAwYzYiLCAiXHUwMGUyXHUyMGFjXHUwMGE2IiwgIlx1
  echo MDBlMlx1MjBhY1x1MjAxZCIsICJcdTAwZTJcdTIwMjBcdTIwMTkiLCAiXHUwMGUxXHUwMGJhIiwgIlx1MDBlMVx1MDBiYiJdOwpjb25zdCBzdGFydCA9IHMuaW5kZXhPZigiYXN5bmMgZnVuY3Rpb24gbG9hZFBhcnRuZXJNYXN0ZXIiKTsKY29uc3QgZW5kID0gcy5pbmRleE9mKCc8bGFiZWw+PGRpdiBjbGFzc05hbWU9Imd2YS1taW5pIj5MYW5kaW5nIGxhbmd1YWdlPC9kaXY+Jyk7CmlmIChzdGFydCA8IDAgfHwgZW5kIDw9IHN0YXJ0KSB0aHJvdyBuZXcgRXJyb3IoIkNhbm5vdCBsb2NhdGUgUGFydG5lciBNYXN0ZXIgc2VjdGlvbiIpOwpjb25zdCBzZWN0aW9uID0gcy5zbGljZShzdGFydCwgZW5kKTsKZm9yIChjb25zdCBiYWQgb2YgYmFkTWFya2VycykgewogIGlmIChzZWN0aW9uLmluY2x1ZGVzKGJhZCkpIHRocm93IG5ldyBFcnJvcigiTW9qaWJha2UgcmVtYWlucyIpOwp9Cgpmcy53cml0ZUZpbGVTeW5jKHRhcmdldCwgcywgInV0ZjgiKTsKY29uc29sZS5sb2coIltPS10gRW5jb2RpbmcgcmVwYWlyZWQuIFJlcGxhY2VtZW50IGdyb3VwcyBhcHBsaWVkOiIsIGNoYW5nZWQpOwpjb25zb2xlLmxvZygiW09LXSBTaGFyZWQgUGFydG5lciBNYXN0ZXIgbG9naWMgcHJlc2VydmVkLiIpOwo=
)
if errorlevel 1 goto FAIL_WORKTREE

node -e "const fs=require('fs');fs.writeFileSync(process.argv[2],Buffer.from(fs.readFileSync(process.argv[1],'utf8').replace(/\s/g,''),'base64'));" "%B64%" "%JS%"
if errorlevel 1 goto FAIL_WORKTREE

echo [4/9] Sua encoding bang Node.js...
node "%JS%"
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

git -C "%WORKTREE%" commit -m "fix(admin): repair Phu Quoc Partner Master text encoding"
if errorlevel 1 goto FAIL_WORKTREE

echo [9/9] Push origin main...
git -C "%WORKTREE%" push origin HEAD:main
if errorlevel 1 goto FAIL_WORKTREE

:VERIFY
echo.
echo ================================================================
echo  THANH CONG - V7
echo ================================================================
echo.
echo  Refresh Admin sau khi Vercel deploy.
echo.
start "" "https://www.govietstay.com/admin"

git -C "%PROJECT%" worktree remove --force "%WORKTREE%" >nul 2>&1
del /q "%B64%" "%JS%" >nul 2>&1
pause
exit /b 0

:FAIL_WORKTREE
echo.
echo [STOP] CO LOI - KHONG PUSH PRODUCTION.
echo Worktree: %WORKTREE%
del /q "%B64%" "%JS%" >nul 2>&1
echo.
echo Cua so giu nguyen. Chup man hinh gui em.
pause
exit /b 1

:FAIL
echo.
echo [STOP] CO LOI TRUOC KHI PUSH. Production khong thay doi.
del /q "%B64%" "%JS%" >nul 2>&1
pause
exit /b 1
