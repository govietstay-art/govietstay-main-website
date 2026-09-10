@echo off
chcp 65001 >nul
title GoVietStay Cruise Deploy V2

echo.
echo ==============================================================
echo  GoVietStay Cruise Deploy V2 - SYNC + BUILD + PUSH
echo ==============================================================
echo.
echo The previous push failed because GitHub main is newer.
echo This version safely:
echo   1. fetches latest origin/main
echo   2. rebases the local cruise commit
echo   3. rebuilds the website
echo   4. pushes to GitHub
echo.
echo It NEVER uses force push.
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0SYNC-BUILD-PUSH-CRUISE.ps1"

echo.
echo Press any key to close...
pause >nul
