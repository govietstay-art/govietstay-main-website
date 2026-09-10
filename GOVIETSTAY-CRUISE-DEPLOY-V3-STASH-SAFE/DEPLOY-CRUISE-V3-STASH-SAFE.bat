@echo off
chcp 65001 >nul
title GoVietStay Cruise Deploy V3 Safe

echo.
echo ==================================================================
echo  GoVietStay Cruise Deploy V3 - STASH + SYNC + BUILD + PUSH
echo ==================================================================
echo.
echo This fixes the HUONG-DAN.txt issue safely.
echo.
echo It will:
echo   1. temporarily stash unrelated tracked local changes
echo   2. sync latest GitHub main
echo   3. rebase the cruise commit
echo   4. build the website
echo   5. push to GitHub
echo   6. restore your local changes
echo.
echo It NEVER force-pushes and does NOT commit HUONG-DAN.txt.
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0DEPLOY-CRUISE-V3-STASH-SAFE.ps1"

echo.
echo Press any key to close...
pause >nul
