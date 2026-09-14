@echo off
setlocal EnableExtensions EnableDelayedExpansion
chcp 65001 >nul
title GoVietStay - Phu Quoc Text Fix V8 Node Safe

if /I not "%~1"=="RUN" (
  cmd.exe /k call "%~f0" RUN
  exit /b
)

echo.
echo ================================================================
echo  GOVIETSTAY - PHU QUOC TEXT FIX V8 - NODE SAFE
echo ================================================================
echo.
echo  Fix loi V7: replacement ngan da lam hong anchor dai.
echo  V8 thay chu theo thu tu DAI -> NGAN.
echo  Khong dung PowerShell patch.
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

set "WORKTREE=%TEMP%\gvs_pq_textfix_v8_%RANDOM%_%RANDOM%"
set "GVS_WORKTREE=%WORKTREE%"
set "B64=%TEMP%\gvs_pq_textfix_v8_%RANDOM%_%RANDOM%.b64"
set "JS=%TEMP%\gvs_pq_textfix_v8_%RANDOM%_%RANDOM%.js"

echo [1/9] Fetch origin/main...
git -C "%PROJECT%" fetch origin main
if errorlevel 1 goto FAIL

echo [2/9] Tao worktree sach...
git -C "%PROJECT%" worktree add --detach "%WORKTREE%" origin/main
if errorlevel 1 goto FAIL

echo [3/9] Tao Node patch ASCII-only...
> "%B64%" (
  echo Y29uc3QgZnMgPSByZXF1aXJlKCJmcyIpOwpjb25zdCBwYXRoID0gcmVxdWlyZSgicGF0aCIpOwpjb25zdCByb290ID0gcHJvY2Vzcy5lbnYuR1ZTX1dPUktUUkVFOwppZiAoIXJvb3QpIHRocm93IG5ldyBFcnJvcigiR1ZTX1dPUktUUkVFIGlzIG5vdCBzZXQiKTsKY29uc3QgdGFyZ2V0ID0gcGF0aC5qb2luKHJvb3QsICJjb21wb25lbnRzIiwgImFkbWluLXY1IiwgIlBodVF1b2NTYWxlc0h1Yi50c3giKTsKbGV0IHMgPSBmcy5yZWFkRmlsZVN5bmModGFyZ2V0LCAidXRmOCIpOwoKY29uc3QgcmVwbGFjZW1lbnRzID0gWwogIFsiR2lhbyBkaVx1MDBlMVx1MDBiYlx1MjAyMW4gUGhcdTAwYzNcdTAwYmEgUXVcdTAwZTFcdTAwYmJcdTIwMThjIHRcdTAwYzNcdTAwYTFjaCByaVx1MDBjM1x1MDBhYW5nLCBuaFx1MDBjNlx1MDBiMG5nIGRcdTAwZTFcdTAwYmJcdTAwYWYgbGlcdTAwZTFcdTAwYmJcdTIwMjF1IHBhcnRuZXIgdlx1MDBlMVx1MDBiYVx1MDBhYm4gZ2hpIHZcdTAwYzNcdTAwYTBvIG1cdTAwZTFcdTAwYmJcdTIxMjJ0IFBhcnRuZXIgTWFzdGVyIGR1eSBuaFx1MDBlMVx1MDBiYVx1MDBhNXQuIiwgIkdpYW8gZGlcdTFlYzduIFBoXHUwMGZhIFF1XHUxZWQxYyB0XHUwMGUxY2ggcmlcdTAwZWFuZywgbmhcdTAxYjBuZyBkXHUxZWVmIGxpXHUxZWM3dSBwYXJ0bmVyIHZcdTFlYWJuIGdoaSB2XHUwMGUwbyBtXHUxZWQ5dCBQYXJ0bmVyIE1hc3RlciBkdXkgbmhcdTFlYTV0LiJdLAogIFsiXHUwMGM0XHUyMDE4XHUwMGMzXHUwMGEzIGNcdTAwYzNcdTAwYjMgdHJvbmcgUGFydG5lciBNYXN0ZXIuIFx1MDBjNFx1MDA5MFx1MDBjM1x1MDBhMyBjaFx1MDBlMVx1MDBiYlx1MDA4ZG4gcGFydG5lciBoaVx1MDBlMVx1MDBiYlx1MjAyMW4gY1x1MDBjM1x1MDBiMywga2hcdTAwYzNcdTAwYjRuZyB0XHUwMGUxXHUwMGJhXHUwMGExbyB0clx1MDBjM1x1MDBiOW5nLiIsICJcdTAxMTFcdTAwZTMgY1x1MDBmMyB0cm9uZyBQYXJ0bmVyIE1hc3Rlci4gXHUwMTEwXHUwMGUzIGNoXHUxZWNkbiBwYXJ0bmVyIGhpXHUxZWM3biBjXHUwMGYzLCBraFx1MDBmNG5nIHRcdTFlYTFvIHRyXHUwMGY5bmcuIl0sCiAgWyJMXHUwMGM2XHUwMGIwdSB0clx1MDBlMVx1MDBiYlx1MDBiMWMgdGlcdTAwZTFcdTAwYmFcdTAwYmZwIHZcdTAwYzNcdTAwYTBvIFBhcnRuZXJzIHRoXHUwMGM2XHUwMGIwXHUwMGUxXHUwMGJiXHUwMDlkbmcgLyBRUiBcdTAwZTJcdTIwMjBcdTIwMTkgUGFydG5lciBEZXBsb3ltZW50IENlbnRlci4iLCAiTFx1MDFiMHUgdHJcdTFlZjFjIHRpXHUxZWJmcCB2XHUwMGUwbyBQYXJ0bmVycyB0aFx1MDFiMFx1MWVkZG5nIC8gUVIgXHUyMTkyIFBhcnRuZXIgRGVwbG95bWVudCBDZW50ZXIuIl0sCiAgWyIgdlx1MDBjM1x1MDBhMG8gUGFydG5lciBNYXN0ZXIgY2h1bmcgdlx1MDBjM1x1MDBhMCBjaFx1MDBlMVx1MDBiYlx1MDA4ZG4gY2hvIFBoXHUwMGMzXHUwMGJhIFF1XHUwMGUxXHUwMGJiXHUyMDE4YyBTYWxlcy4iLCAiIHZcdTAwZTBvIFBhcnRuZXIgTWFzdGVyIGNodW5nIHZcdTAwZTAgY2hcdTFlY2RuIGNobyBQaFx1MDBmYSBRdVx1MWVkMWMgU2FsZXMuIl0sCiAgWyJLaFx1MDBjM1x1MDBiNG5nIHRcdTAwZTFcdTAwYmFcdTAwYTFvIFx1MDBjNFx1MjAxOFx1MDBjNlx1MDBiMFx1MDBlMVx1MDBiYlx1MDBhM2MgcGFydG5lciB0cm9uZyBQYXJ0bmVyIE1hc3Rlci4iLCAiS2hcdTAwZjRuZyB0XHUxZWExbyBcdTAxMTFcdTAxYjBcdTFlZTNjIHBhcnRuZXIgdHJvbmcgUGFydG5lciBNYXN0ZXIuIl0sCiAgWyJLaFx1MDBjM1x1MDBiNG5nIHRcdTAwZTFcdTAwYmFcdTAwYTNpIFx1MDBjNFx1MjAxOFx1MDBjNlx1MDBiMFx1MDBlMVx1MDBiYlx1MDBhM2MgUGFydG5lciBNYXN0ZXIuIiwgIktoXHUwMGY0bmcgdFx1MWVhM2kgXHUwMTExXHUwMWIwXHUxZWUzYyBQYXJ0bmVyIE1hc3Rlci4iXSwKICBbIkNcdTAwZTFcdTAwYmFcdTAwYTduIHRcdTAwYzNcdTAwYWFuIHBhcnRuZXIgdlx1MDBjM1x1MDBhMCBtXHUwMGMzXHUwMGEzIHBhcnRuZXIuIiwgIkNcdTFlYTduIHRcdTAwZWFuIHBhcnRuZXIgdlx1MDBlMCBtXHUwMGUzIHBhcnRuZXIuIl0sCiAgWyJUaFx1MDBjM1x1MDBhYW0gUGFydG5lciBtXHUwMGUxXHUwMGJiXHUyMDNhaSBcdTAwYzJcdTAwYjcgUGhcdTAwYzNcdTAwYmEgUXVcdTAwZTFcdTAwYmJcdTIwMThjIiwgIlRoXHUwMGVhbSBQYXJ0bmVyIG1cdTFlZGJpIFx1MDBiNyBQaFx1MDBmYSBRdVx1MWVkMWMiXSwKICBbIlRcdTAwZTFcdTAwYmFcdTAwYTFvIFBhcnRuZXIgdlx1MDBjM1x1MDBhMG8gUGFydG5lciBNYXN0ZXIiLCAiVFx1MWVhMW8gUGFydG5lciB2XHUwMGUwbyBQYXJ0bmVyIE1hc3RlciJdLAogIFsiUGFydG5lciBcdTAwYzJcdTAwYjcgUGFydG5lciBNYXN0ZXIgY2h1bmciLCAiUGFydG5lciBcdTAwYjcgUGFydG5lciBNYXN0ZXIgY2h1bmciXSwKICBbIlx1MDBjNFx1MDA5MGFuZyB0XHUwMGUxXHUwMGJhXHUwMGEzaSBQYXJ0bmVyIE1hc3Rlclx1MDBlMlx1MjBhY1x1MDBhNiIsICJcdTAxMTBhbmcgdFx1MWVhM2kgUGFydG5lciBNYXN0ZXJcdTIwMjYiXSwKICBbIlRcdTAwYzNcdTAwYWFuIFx1MDBjNFx1MjAxOFx1MDBlMVx1MDBiYlx1MjAxOGkgdFx1MDBjM1x1MDBhMWMgLyBXZWJzaXRlICoiLCAiVFx1MDBlYW4gXHUwMTExXHUxZWQxaSB0XHUwMGUxYyAvIFdlYnNpdGUgKiJdLAogIFsiVFx1MDBjM1x1MDBhYW4gbmdcdTAwYzZcdTAwYjBcdTAwZTFcdTAwYmJcdTAwOWRpIHBoXHUwMGUxXHUwMGJiXHUwMGE1IHRyXHUwMGMzXHUwMGExY2giLCAiVFx1MDBlYW4gbmdcdTAxYjBcdTFlZGRpIHBoXHUxZWU1IHRyXHUwMGUxY2giXSwKICBbIlx1MDBjNFx1MDA5MGlcdTAwZTFcdTAwYmJcdTIwMjFuIHRob1x1MDBlMVx1MDBiYVx1MDBhMWkgLyBXaGF0c0FwcCIsICJcdTAxMTBpXHUxZWM3biB0aG9cdTFlYTFpIC8gV2hhdHNBcHAiXSwKICBbIlx1MDBlMlx1MjBhY1x1MjAxZCBDaFx1MDBlMVx1MDBiYlx1MDA4ZG4gcGFydG5lciBcdTAwZTJcdTIwYWNcdTIwMWQiLCAiXHUyMDE0IENoXHUxZWNkbiBwYXJ0bmVyIFx1MjAxNCJdLAogIFsiXHUwMGM2XHUwMGFmdSBcdTAwYzRcdTIwMThcdTAwYzNcdTAwYTNpIGtoXHUwMGMzXHUwMGExY2ggKCUpIiwgIlx1MDFhZnUgXHUwMTExXHUwMGUzaSBraFx1MDBlMWNoICglKSJdLAogIFsiTG9cdTAwZTFcdTAwYmFcdTAwYTFpIFx1MDBjNFx1MjAxOFx1MDBlMVx1MDBiYlx1MjAxOGkgdFx1MDBjM1x1MDBhMWMiLCAiTG9cdTFlYTFpIFx1MDExMVx1MWVkMWkgdFx1MDBlMWMiXSwKICBbIk5nXHUwMGMzXHUwMGEweSBiXHUwMGUxXHUwMGJhXHUwMGFmdCBcdTAwYzRcdTIwMThcdTAwZTFcdTAwYmFcdTAwYTd1IiwgIk5nXHUwMGUweSBiXHUxZWFmdCBcdTAxMTFcdTFlYTd1Il0sCiAgWyJNXHUwMGMzXHUwMGEzIFx1MDBjNFx1MjAxOFx1MDBlMVx1MDBiYlx1MjAxOGkgdFx1MDBjM1x1MDBhMWMgKiIsICJNXHUwMGUzIFx1MDExMVx1MWVkMWkgdFx1MDBlMWMgKiJdLAogIFsiVFx1MDBjM1x1MDBhYW4gbGlcdTAwYzNcdTAwYWFuIGhcdTAwZTFcdTAwYmJcdTIwMjEiLCAiVFx1MDBlYW4gbGlcdTAwZWFuIGhcdTFlYzciXSwKICBbIlRoXHUwMGUxXHUwMGJiXHUyMDM5IHRyXHUwMGM2XHUwMGIwXHUwMGUxXHUwMGJiXHUwMDlkbmciLCAiVGhcdTFlY2IgdHJcdTAxYjBcdTFlZGRuZyJdLAogIFsiKyBUaFx1MDBjM1x1MDBhYW0gUGFydG5lciIsICIrIFRoXHUwMGVhbSBQYXJ0bmVyIl0sCiAgWyJcdTAwYzRcdTAwOTBhbmcgdFx1MDBlMVx1MDBiYVx1MDBhMW9cdTAwZTJcdTIwYWNcdTAwYTYiLCAiXHUwMTEwYW5nIHRcdTFlYTFvXHUyMDI2Il0sCiAgWyJDXHUwMGUxXHUwMGJhXHUwMGFkcCBuaFx1MDBlMVx1MDBiYVx1MDBhZHQiLCAiQ1x1MWVhZHAgbmhcdTFlYWR0Il0sCiAgWyJcdTAwYzRcdTAwOTBcdTAwYzNcdTAwYTMgdFx1MDBlMVx1MDBiYVx1MDBhMW8gIiwgIlx1MDExMFx1MDBlMyB0XHUxZWExbyAiXSwKICBbIlx1MDBjNFx1MDA5MFx1MDBjM1x1MDBiM25nIiwgIlx1MDExMFx1MDBmM25nIl0sCiAgWyJ2aVx1MDBlMVx1MDBiYlx1MjAyMXQiLCAidmlcdTFlYzd0Il0sCiAgWyIrODRcdTAwZTJcdTIwYWNcdTAwYTYiLCAiKzg0XHUyMDI2Il0sCiAgWyIgXHUwMGMyXHUwMGI3ICIsICIgXHUwMGI3ICJdCl07CgpsZXQgY2hhbmdlZCA9IDA7CmZvciAoY29uc3QgW2JhZCwgZ29vZF0gb2YgcmVwbGFjZW1lbnRzKSB7CiAgaWYgKHMuaW5jbHVkZXMoYmFkKSkgewogICAgY29uc3QgY291bnQgPSBzLnNwbGl0KGJhZCkubGVuZ3RoIC0gMTsKICAgIHMgPSBzLnNwbGl0KGJhZCkuam9pbihnb29kKTsKICAgIGNoYW5nZWQgKz0gY291bnQ7CiAgfQp9Cgpjb25zdCByZXF1aXJlZCA9IFsKICAiR1ZTX1BRX1BBUlRORVJfTUFTVEVSX1YzIiwKICAiYWRtaW5fY3JlYXRlX3BhcnRuZXIiLAogICJsb2FkUGFydG5lck1hc3RlciIsCiAgImNyZWF0ZVBhcnRuZXJRdWljayIsCiAgIlNpbmdsZSBQYXJ0bmVyIE1hc3RlciIsCiAgIlBodVF1b2NQYXJ0bmVyUG9zdGVySW5saW5lIiwKICAiUGFydG5lciBNYXN0ZXIgY2h1bmciLAogICIrIFRoXHUwMGVhbSBQYXJ0bmVyIiwKICAiQ1x1MWVhZHAgbmhcdTFlYWR0IiwKICAiVFx1MWVhMW8gUGFydG5lciB2XHUwMGUwbyBQYXJ0bmVyIE1hc3RlciIKXTsKZm9yIChjb25zdCBuZWVkbGUgb2YgcmVxdWlyZWQpIHsKICBpZiAoIXMuaW5jbHVkZXMobmVlZGxlKSkgdGhyb3cgbmV3IEVycm9yKCJWZXJpZmljYXRpb24gZmFpbGVkOiBtaXNzaW5nICIgKyBuZWVkbGUpOwp9Cgpjb25zdCBzdGFydCA9IHMuaW5kZXhPZigiYXN5bmMgZnVuY3Rpb24gbG9hZFBhcnRuZXJNYXN0ZXIiKTsKY29uc3QgZW5kID0gcy5pbmRleE9mKCc8bGFiZWw+PGRpdiBjbGFzc05hbWU9Imd2YS1taW5pIj5MYW5kaW5nIGxhbmd1YWdlPC9kaXY+
  echo Jyk7CmlmIChzdGFydCA8IDAgfHwgZW5kIDw9IHN0YXJ0KSB0aHJvdyBuZXcgRXJyb3IoIkNhbm5vdCBsb2NhdGUgUGFydG5lciBNYXN0ZXIgc2VjdGlvbiIpOwpjb25zdCBzZWN0aW9uID0gcy5zbGljZShzdGFydCwgZW5kKTsKCmNvbnN0IGJhZE1hcmtlcnMgPSBbIlx1MDBjMyIsICJcdTAwYzIiLCAiXHUwMGM0IiwgIlx1MDBjNiIsICJcdTAwZTJcdTIwYWNcdTAwYTYiLCAiXHUwMGUyXHUyMGFjXHUyMDFkIiwgIlx1MDBlMlx1MjAyMFx1MjAxOSIsICJcdTAwZTFcdTAwYmEiLCAiXHUwMGUxXHUwMGJiIl07CmZvciAoY29uc3QgYmFkIG9mIGJhZE1hcmtlcnMpIHsKICBpZiAoc2VjdGlvbi5pbmNsdWRlcyhiYWQpKSB0aHJvdyBuZXcgRXJyb3IoIk1vamliYWtlIHJlbWFpbnMgaW4gUGFydG5lciBNYXN0ZXIgc2VjdGlvbjogIiArIEpTT04uc3RyaW5naWZ5KGJhZCkpOwp9Cgpmcy53cml0ZUZpbGVTeW5jKHRhcmdldCwgcywgInV0ZjgiKTsKY29uc29sZS5sb2coIltPS10gVGV4dCBlbmNvZGluZyByZXBhaXJlZC4gUmVwbGFjZW1lbnRzOiIsIGNoYW5nZWQpOwpjb25zb2xlLmxvZygiW09LXSBQYXJ0bmVyIE1hc3RlciBsb2dpYyBwcmVzZXJ2ZWQuIik7Cg==
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
echo  THANH CONG - V8
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
