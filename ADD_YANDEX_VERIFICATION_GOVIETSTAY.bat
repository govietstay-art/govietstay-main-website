@echo off
setlocal
title GoVietStay - Add Yandex Verification
cd /d "%~dp0"

echo ============================================================
echo   GoVietStay - Yandex Webmaster Verification
echo ============================================================
echo.

if not exist ".git" (
    echo [ERROR] Please put this BAT file in the ROOT folder of
    echo         govietstay-main-website, then run it again.
    echo.
    pause
    exit /b 1
)

if not exist "public" mkdir "public"

echo [1/4] Creating Yandex verification file...
powershell -NoProfile -ExecutionPolicy Bypass -Command "[IO.File]::WriteAllBytes('public\yandex_3d17586f3c7b4825.html',[Convert]::FromBase64String('PGh0bWw+CiAgICA8aGVhZD4KICAgICAgICA8bWV0YSBodHRwLWVxdWl2PSJDb250ZW50LVR5cGUiIGNvbnRlbnQ9InRleHQvaHRtbDsgY2hhcnNldD1VVEYtOCI+CiAgICA8L2hlYWQ+CiAgICA8Ym9keT5WZXJpZmljYXRpb246IDNkMTc1ODZmM2M3YjQ4MjU8L2JvZHk+CjwvaHRtbD4='))"
if errorlevel 1 (
    echo [ERROR] Could not create verification file.
    pause
    exit /b 1
)

echo [2/4] Checking file...
findstr /C:"Verification: 3d17586f3c7b4825" "public\yandex_3d17586f3c7b4825.html" >nul
if errorlevel 1 (
    echo [ERROR] Verification content is incorrect.
    pause
    exit /b 1
)
echo [OK] public\yandex_3d17586f3c7b4825.html

echo.
echo [3/4] Committing to GitHub...
git add "public/yandex_3d17586f3c7b4825.html"
git diff --cached --quiet
if %errorlevel%==0 (
    echo [INFO] File is already committed or unchanged.
) else (
    git commit -m "chore: add Yandex verification file"
    if errorlevel 1 (
        echo [ERROR] Git commit failed.
        pause
        exit /b 1
    )
)

echo.
echo [4/4] Pushing to main...
git push origin main
if errorlevel 1 (
    echo.
    echo [ERROR] Push failed.
    echo If your local branch is behind GitHub, run:
    echo     git pull --rebase origin main
    echo then run this BAT again.
    echo.
    pause
    exit /b 1
)

echo.
echo ============================================================
echo   DONE
echo ============================================================
echo Vercel should deploy automatically from GitHub.
echo.
echo After deployment, verify this URL:
echo https://www.govietstay.com/yandex_3d17586f3c7b4825.html
echo.
echo The page must show:
echo Verification: 3d17586f3c7b4825
echo.
start "" "https://www.govietstay.com/yandex_3d17586f3c7b4825.html"
pause
