@echo off
setlocal EnableExtensions EnableDelayedExpansion
chcp 65001 >nul
title GoVietStay - Staff Booking Request Flow

echo.
echo ================================================================
echo  GOVIETSTAY - VLAD/TOMMY BOOKING REQUEST FLOW
echo ================================================================
echo.
echo  One click on staff page:
echo  1. Save Staff Booking Request to Admin as PENDING
echo  2. Open WhatsApp to David with booking details
echo  3. Admin must APPROVE before it becomes Booking Master
echo  4. Approved booking flows to Operations -> Finance -> Payroll
echo.

set "PROJECT="
for /f "delims=" %%I in ('git rev-parse --show-toplevel 2^>nul') do set "PROJECT=%%I"
if not defined PROJECT if exist "%USERPROFILE%\Documents\GitHub\govietstay-main-website\.git" set "PROJECT=%USERPROFILE%\Documents\GitHub\govietstay-main-website"
if not defined PROJECT if exist "%USERPROFILE%\govietstay-main-website\.git" set "PROJECT=%USERPROFILE%\govietstay-main-website"
if not defined PROJECT if exist "%USERPROFILE%\Desktop\govietstay-main-website\.git" set "PROJECT=%USERPROFILE%\Desktop\govietstay-main-website"

if not defined PROJECT (
  echo Khong tu tim thay thu muc project.
  set /p "PROJECT=Dan duong dan thu muc govietstay-main-website roi Enter: "
)
if not exist "%PROJECT%\.git" (
  echo [STOP] Khong tim thay Git project: %PROJECT%
  pause
  exit /b 1
)

set "WORKTREE=%TEMP%\gvs_staff_request_%RANDOM%_%RANDOM%"
set "GVS_WORKTREE=%WORKTREE%"

echo [1/7] Fetch origin/main...
git -C "%PROJECT%" fetch origin main
if errorlevel 1 goto FAIL

echo [2/7] Tao worktree sach...
git -C "%PROJECT%" worktree add --detach "%WORKTREE%" origin/main
if errorlevel 1 goto FAIL

echo [3/7] Standardize Vlad/Tommy booking request flow...
set "PATCH_B64=%TEMP%\gvs_staff_request_%RANDOM%_%RANDOM%.b64"
set "PATCH_PS1=%TEMP%\gvs_staff_request_%RANDOM%_%RANDOM%.ps1"
> "%PATCH_B64%" (
  echo 77u/JEVycm9yQWN0aW9uUHJlZmVyZW5jZSA9ICJTdG9wIgokcm9vdCA9ICRlbnY6R1ZTX1dPUktUUkVFCmlmICgtbm90ICRyb290KSB7IHRocm93ICJHVlNfV09SS1RSRUUgaXMgbm90IHNldC4iIH0KCiR1dGY4ID0gTmV3LU9iamVjdCBTeXN0ZW0uVGV4dC5VVEY4RW5jb2RpbmcoJGZhbHNlKQokdGFyZ2V0cyA9IEAoCiAgKEpvaW4tUGF0aCAkcm9vdCAiYXBwXHJ1XFZsYWRccGFnZS50c3giKSwKICAoSm9pbi1QYXRoICRyb290ICJhcHBccnVcVG9tbXlccGFnZS50c3giKQopCgpmb3JlYWNoICgkcGF0aCBpbiAkdGFyZ2V0cykgewogIGlmICgtbm90IChUZXN0LVBhdGggJHBhdGgpKSB7IHRocm93ICJDYW5ub3QgZmluZCAkcGF0aCIgfQogICR0ZXh0ID0gW0lPLkZpbGVdOjpSZWFkQWxsVGV4dCgkcGF0aCwgJHV0ZjgpLlJlcGxhY2UoImByYG4iLCAiYG4iKQoKICBpZiAoJHRleHQuQ29udGFpbnMoIi8vIEdWUy1TVEFGRi1CT09LSU5HLVBFTkRJTkctV0hBVFNBUFAtVjEiKSkgewogICAgV3JpdGUtSG9zdCAiW09LXSBBbHJlYWR5IGluc3RhbGxlZDogJHBhdGgiIC1Gb3JlZ3JvdW5kQ29sb3IgR3JlZW4KICAgIGNvbnRpbnVlCiAgfQoKICAkc3VibWl0UG9zID0gJHRleHQuSW5kZXhPZigiYXdhaXQgc3VibWl0U3RhZmZCb29raW5nUmVxdWVzdCIpCiAgJHdoYXRzUG9zID0gJHRleHQuSW5kZXhPZigiY29uc3Qgd2hhdHNBcHBVcmwiKQogIGlmICgkc3VibWl0UG9zIC1sdCAwIC1vciAkd2hhdHNQb3MgLWx0IDAgLW9yICRzdWJtaXRQb3MgLWd0ICR3aGF0c1BvcykgewogICAgdGhyb3cgIlNhZmV0eSBjaGVjayBmYWlsZWQ6IFN0YWZmIEJvb2tpbmcgUmVxdWVzdCBtdXN0IHNhdmUgQkVGT1JFIFdoYXRzQXBwIG9wZW5zIGluICRwYXRoIgogIH0KCiAgJG9sZERlc2MgPSAnPHA+0JfQsNC/0L7Qu9C90LjRgtC1INC+0YHQvdC+0LLQvdGL0LUg0LTQsNC90L3Ri9C1INC4INC+0YLQv9GA0LDQstGM0YLQtSDQs9C+0YLQvtCy0YvQuSDQt9Cw0L/RgNC+0YEgRGF2aWQg0L/RgNGP0LzQviDQsiBXaGF0c0FwcC48L3A+JwogICRuZXdEZXNjID0gJzxwPtCe0LTQuNC9INC60LvQuNC6OiDQt9Cw0L/RgNC+0YEg0YHQvtGF0YDQsNC90Y/QtdGC0YHRjyDQsiBBZG1pbiDRgdC+INGB0YLQsNGC0YPRgdC+0LwgUGVuZGluZyDQuCDQvtC00L3QvtCy0YDQtdC80LXQvdC90L4g0L7RgtC60YDRi9Cy0LDQtdGC0YHRjyBXaGF0c0FwcCDQtNC70Y8gRGF2aWQuINCe0YTQuNGG0LjQsNC70YzQvdGL0LkgYm9va2luZyDRgdC+0LfQtNCw0ZHRgtGB0Y8g0YLQvtC70YzQutC+INC/0L7RgdC70LUg0L/QvtC00YLQstC10YDQttC00LXQvdC40Y8gQWRtaW4uPC9wPicKICBpZiAoLW5vdCAkdGV4dC5Db250YWlucygkb2xkRGVzYykpIHsgdGhyb3cgIkRlc2NyaXB0aW9uIHBhdGNoIHBvaW50IG5vdCBmb3VuZCBpbiAkcGF0aCIgfQogICR0ZXh0ID0gJHRleHQuUmVwbGFjZSgkb2xkRGVzYywgJG5ld0Rlc2MpCgogICRvbGRTdWNjZXNzID0gJ3tib29raW5nUmVzdWx0ICYmIDxwIGNsYXNzTmFtZT17Y3goIndoYXRzYXBwLXJlYWR5Iil9PuKckyBCb29raW5nINGB0L7RhdGA0LDQvdGR0L0g0LIgQWRtaW4uIFdoYXRzQXBwINC+0YLQutGA0YvRgiDigJQg0L/RgNC+0LLQtdGA0YzRgtC1INGB0L7QvtCx0YnQtdC90LjQtSDQuCDQvdCw0LbQvNC40YLQtSBTZW5kLjwvcD59JwogICRuZXdTdWNjZXNzID0gJ3tib29raW5nUmVzdWx0ICYmIDxwIGNsYXNzTmFtZT17Y3goIndoYXRzYXBwLXJlYWR5Iil9PuKckyBCb29raW5nIFJlcXVlc3Qg0YHQvtGF0YDQsNC90ZHQvSDQsiBBZG1pbiDQutCw0LogUGVuZGluZy4gV2hhdHNBcHAg0LTQu9GPIERhdmlkINC+0YLQutGA0YvRgi4g0J/QvtGB0LvQtSBBcHByb3ZlINC30LDQv9GA0L7RgSDRgdGC0LDQvdC10YIgQm9va2luZyBNYXN0ZXIg0Lgg0L/QvtC/0LDQtNGR0YIg0LIgT3BlcmF0aW9ucy48L3A+fScKICBpZiAoLW5vdCAkdGV4dC5Db250YWlucygkb2xkU3VjY2VzcykpIHsgdGhyb3cgIlN1Y2Nlc3MtbWVzc2FnZSBwYXRjaCBwb2ludCBub3QgZm91bmQgaW4gJHBhdGgiIH0KICAkdGV4dCA9ICR0ZXh0LlJlcGxhY2UoJG9sZFN1Y2Nlc3MsICRuZXdTdWNjZXNzKQoKICAkb2xkQnV0dG9uID0gJzxidXR0b24gY2xhc3NOYW1lPXtjeCgiYnV0dG9uIHllbGxvdyBmdWxsIHdoYXRzYXBwLXN1Ym1pdCIpfSB0eXBlPSJzdWJtaXQiPtCh0L7RhdGA0LDQvdC40YLRjCDQsiBBZG1pbiArINC+0YLQv9GA0LDQstC40YLRjCBEYXZpZDwvYnV0dG9uPicKICAkbmV3QnV0
  echo dG9uID0gJzxidXR0b24gY2xhc3NOYW1lPXtjeCgiYnV0dG9uIHllbGxvdyBmdWxsIHdoYXRzYXBwLXN1Ym1pdCIpfSB0eXBlPSJzdWJtaXQiPtCe0YLQv9GA0LDQstC40YLRjCBCb29raW5nIFJlcXVlc3Qg0LIgR29WaWV0U3RheTwvYnV0dG9uPicKICBpZiAoLW5vdCAkdGV4dC5Db250YWlucygkb2xkQnV0dG9uKSkgeyB0aHJvdyAiQnV0dG9uIHBhdGNoIHBvaW50IG5vdCBmb3VuZCBpbiAkcGF0aCIgfQogICR0ZXh0ID0gJHRleHQuUmVwbGFjZSgkb2xkQnV0dG9uLCAkbmV3QnV0dG9uKQoKICAkb2xkU3RhdHVzID0gJyLwn5OMIFN0YXR1cyAvINCh0YLQsNGC0YPRgTogUGVuZGluZyBjb25maXJtYXRpb24gZnJvbSBEYXZpZCAvINCe0LbQuNC00LDQtdGCINC/0L7QtNGC0LLQtdGA0LbQtNC10L3QuNGPINCU0Y3QstC40LTQsCIsJwogICRuZXdTdGF0dXMgPSAnIvCfk4wgU3RhdHVzIC8g0KHRgtCw0YLRg9GBOiBQZW5kaW5nIEFkbWluIGFwcHJvdmFsIC8g0J7QttC40LTQsNC10YIg0L/QvtC00YLQstC10YDQttC00LXQvdC40Y8gQWRtaW4gLyBEYXZpZCIsJwogIGlmICgtbm90ICR0ZXh0LkNvbnRhaW5zKCRvbGRTdGF0dXMpKSB7IHRocm93ICJXaGF0c0FwcCBzdGF0dXMgcGF0Y2ggcG9pbnQgbm90IGZvdW5kIGluICRwYXRoIiB9CiAgJHRleHQgPSAkdGV4dC5SZXBsYWNlKCRvbGRTdGF0dXMsICRuZXdTdGF0dXMpCgogICRtYXJrZXIgPSAnInVzZSBjbGllbnQiOycKICAkdGV4dCA9ICR0ZXh0LlJlcGxhY2UoJG1hcmtlciwgJG1hcmtlciArICJgbi8vIEdWUy1TVEFGRi1CT09LSU5HLVBFTkRJTkctV0hBVFNBUFAtVjEiKQoKICBbSU8uRmlsZV06OldyaXRlQWxsVGV4dCgkcGF0aCwgJHRleHQsICR1dGY4KQogIFdyaXRlLUhvc3QgIltQQVRDSEVEXSAkcGF0aCIgLUZvcmVncm91bmRDb2xvciBDeWFuCn0K
)
certutil -f -decode "%PATCH_B64%" "%PATCH_PS1%" >nul
if errorlevel 1 goto FAIL_WORKTREE
powershell -NoProfile -ExecutionPolicy Bypass -File "%PATCH_PS1%"
set "PATCH_RC=%ERRORLEVEL%"
del /q "%PATCH_B64%" "%PATCH_PS1%" >nul 2>&1
if not "%PATCH_RC%"=="0" goto FAIL_WORKTREE

if exist "%PROJECT%\.env.local" copy /Y "%PROJECT%\.env.local" "%WORKTREE%\.env.local" >nul
if exist "%PROJECT%\node_modules" (
  echo [4/7] Dung node_modules hien tai...
  cmd /c mklink /J "%WORKTREE%\node_modules" "%PROJECT%\node_modules" >nul 2>&1
) else (
  echo [4/7] Cai dependencies...
  pushd "%WORKTREE%"
  if exist package-lock.json (call npm ci) else (call npm install)
  if errorlevel 1 (popd & goto FAIL_WORKTREE)
  popd
)

echo [5/7] Production build check...
pushd "%WORKTREE%"
call npm run build
if errorlevel 1 (
  popd
  echo [STOP] BUILD FAILED. Khong push production.
  goto FAIL_WORKTREE
)
popd

echo [6/7] Commit Vlad + Tommy pages...
git -C "%WORKTREE%" add -- "app/ru/Vlad/page.tsx" "app/ru/Tommy/page.tsx"
git -C "%WORKTREE%" diff --cached --quiet
if not errorlevel 1 goto CLEAN_SUCCESS
git -C "%WORKTREE%" -c user.name="GoVietStay Installer" -c user.email="govietstay@gmail.com" commit -m "feat(staff): pending booking request plus WhatsApp approval flow" -- "app/ru/Vlad/page.tsx" "app/ru/Tommy/page.tsx"
if errorlevel 1 goto FAIL_WORKTREE

echo [7/7] Push main - Vercel auto deploy...
git -C "%WORKTREE%" push origin HEAD:main
if errorlevel 1 goto FAIL_WORKTREE

:CLEAN_SUCCESS
echo.
echo ================================================================
echo  SUCCESS - STAFF BOOKING REQUEST FLOW
echo ================================================================
echo  Test on:
echo  https://www.govietstay.com/ru/Vlad
echo  https://www.govietstay.com/ru/Tommy
echo.
echo  Expected:
echo  - Button: Send Booking Request to GoVietStay
echo  - Request appears in Admin as Pending
echo  - WhatsApp opens to David
echo  - Only Admin Approve converts it to Booking Master
echo.
git -C "%PROJECT%" worktree remove --force "%WORKTREE%" >nul 2>&1
git -C "%PROJECT%" worktree prune >nul 2>&1
pause
exit /b 0

:FAIL_WORKTREE
echo.
echo [STOP] Co loi. Khong push production.
git -C "%PROJECT%" worktree remove --force "%WORKTREE%" >nul 2>&1
git -C "%PROJECT%" worktree prune >nul 2>&1
pause
exit /b 1

:FAIL
echo.
echo [STOP] Khong the chuan bi source. Khong push production.
pause
exit /b 1
