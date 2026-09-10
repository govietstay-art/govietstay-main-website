@echo off
setlocal
chcp 65001 >nul
title GoVietStay - Check Live After Vercel

echo.
echo =========================================================
echo   CHECK LIVE - 15 TRANG + SITEMAP
echo =========================================================
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
 "$ProgressPreference='SilentlyContinue';$urls=@(" ^
 "'https://www.govietstay.com/ru/phu-quoc'," ^
 "'https://www.govietstay.com/ru/phu-quoc-help'," ^
 "'https://www.govietstay.com/ru/phu-quoc/chto-posmotret'," ^
 "'https://www.govietstay.com/ru/phu-quoc/kuda-poehat'," ^
 "'https://www.govietstay.com/ru/phu-quoc/s-detmi'," ^
 "'https://www.govietstay.com/ru/phu-quoc/3-ili-4-ostrova'," ^
 "'https://www.govietstay.com/ru/phu-quoc/pogoda'," ^
 "'https://www.govietstay.com/ru/phu-quoc/russkiy-gid'," ^
 "'https://www.govietstay.com/ru/phu-quoc/aeroport-transfer'," ^
 "'https://www.govietstay.com/ru/phu-quoc/7-dney'," ^
 "'https://www.govietstay.com/ru/phu-quoc/10-dney'," ^
 "'https://www.govietstay.com/ru/phu-quoc/sunset-town'," ^
 "'https://www.govietstay.com/ru/phu-quoc/from-moscow'," ^
 "'https://www.govietstay.com/ru/phu-quoc/from-almaty'," ^
 "'https://www.govietstay.com/ru/phu-quoc/from-tashkent'," ^
 "'https://www.govietstay.com/ru/phu-quoc/sitemap.xml');" ^
 "foreach($u in $urls){try{$r=Invoke-WebRequest -UseBasicParsing -Uri $u -Method Get -MaximumRedirection 5 -TimeoutSec 25;Write-Host ('[OK '+[int]$r.StatusCode+'] '+$u) -ForegroundColor Green}catch{if($_.Exception.Response){Write-Host ('[LOI '+[int]$_.Exception.Response.StatusCode+'] '+$u) -ForegroundColor Red}else{Write-Host ('[LOI] '+$u+' -> '+$_.Exception.Message) -ForegroundColor Red}}}"

echo.
echo Tat ca can la [OK 200].
echo Neu con 404 ngay sau push, doi Vercel deploy xong roi chay lai.
echo.
pause
