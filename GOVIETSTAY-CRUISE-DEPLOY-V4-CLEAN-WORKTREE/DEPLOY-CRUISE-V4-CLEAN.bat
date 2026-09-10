@echo off
chcp 65001 >nul
title GoVietStay Cruise Deploy V4 Clean

echo.
echo ====================================================================
echo  GoVietStay Cruise Deploy V4 - CLEAN WORKTREE
echo ====================================================================
echo.
echo This version does NOT touch your current working files.
echo It creates a clean temporary copy from latest GitHub main,
echo applies ONLY the two cruise pages, builds, and pushes.
echo.
echo HUONG-DAN.txt is NOT touched.
echo V1/V2/V3/V4/V5 installer folders are NOT touched.
echo tsconfig.json is NOT deployed.
echo NO force push.
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0DEPLOY-CRUISE-V4-CLEAN.ps1"

echo.
echo Press any key to close...
pause >nul
