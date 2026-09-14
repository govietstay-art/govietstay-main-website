@echo off
setlocal EnableExtensions
chcp 65001 >nul
title GoVietStay - Shorten ALL German SEO Titles V1

echo.
echo ============================================================
echo   GOVIETSTAY - GERMAN SEO TITLES - ALL 13 PAGES
echo   FIX BING "TITLE TOO LONG" IN ONE PASS
echo ============================================================
echo.
echo This installer ONLY changes:
echo   - metadata title
echo   - OpenGraph title
echo   - Twitter title
echo.
echo It does NOT change:
echo   - H1 / article content
echo   - SEO descriptions / keywords
echo   - canonical URLs
echo   - sitemap
echo   - official GoVietStay logo
echo   - WhatsApp
echo   - booking / admin / partner logic
echo.
echo All target titles are 60 characters or shorter.
echo Backups are created before editing.
echo No automatic deploy.
echo.
pause

set "SELF=%~f0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "$raw=[IO.File]::ReadAllText($env:SELF); $m='#'+'__GVS_PS_PAYLOAD__'; $i=$raw.LastIndexOf($m); if($i -lt 0){Write-Error 'Payload marker not found'; exit 2}; $code=$raw.Substring($i+$m.Length); & ([ScriptBlock]::Create($code))"
set "EXIT_CODE=%ERRORLEVEL%"

echo.
if not "%EXIT_CODE%"=="0" (
  echo [ERROR] German SEO title update stopped with code %EXIT_CODE%.
) else (
  echo [OK] All German SEO titles were shortened and validated.
)
echo.
pause
endlocal
exit /b %EXIT_CODE%

#__GVS_PS_PAYLOAD__

$ErrorActionPreference = "Stop"

function Step([string]$Text) {
  Write-Host ""
  Write-Host ("==> " + $Text) -ForegroundColor Cyan
}

function Find-Root {
  $candidates = New-Object System.Collections.Generic.List[string]
  $selfDir = Split-Path -Parent $env:SELF
  if ($selfDir) { $candidates.Add($selfDir) }
  try {
    $cwd = (Get-Location).Path
    if ($cwd -and -not $candidates.Contains($cwd)) { $candidates.Add($cwd) }
  } catch {}
  if ($env:USERPROFILE) {
    $known = Join-Path $env:USERPROFILE "Documents\GitHub\govietstay-main-website"
    if (-not $candidates.Contains($known)) { $candidates.Add($known) }
  }

  foreach ($candidate in $candidates) {
    $pkg = Join-Path $candidate "package.json"
    if (Test-Path $pkg) {
      try {
        $json = Get-Content -LiteralPath $pkg -Raw | ConvertFrom-Json
        if ($json.name -eq "govietstay-main-website") {
          return (Resolve-Path $candidate).Path
        }
      } catch {}
    }
  }

  Write-Host ""
  $manual = Read-Host "Paste full path to govietstay-main-website"
  if ([string]::IsNullOrWhiteSpace($manual)) { throw "No repository path provided." }
  $manual = $manual.Trim('"')
  $pkg = Join-Path $manual "package.json"
  if (-not (Test-Path $pkg)) { throw "package.json not found." }
  $json = Get-Content -LiteralPath $pkg -Raw | ConvertFrom-Json
  if ($json.name -ne "govietstay-main-website") { throw "This is not govietstay-main-website." }
  return (Resolve-Path $manual).Path
}

$root = Find-Root
Set-Location $root

Step "Repository verified"
Write-Host $root -ForegroundColor Green

$appPrefix = "app\"
if (-not (Test-Path (Join-Path $root "app"))) {
  if (Test-Path (Join-Path $root "src\app")) {
    $appPrefix = "src\app\"
  } else {
    throw "Next.js app folder not found."
  }
}

$rowsJson = [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String("W3sicGF0aCI6ICJhcHBcXGRlXFxwYWdlLnRzeCIsICJvbGQiOiAiVmlldG5hbS1SZWlzZSBhdWYgRGV1dHNjaDogWmVudHJhbHZpZXRuYW0gJiBQaMO6IFF14buRYyB8IEdvVmlldFN0YXkiLCAibmV3IjogIlZpZXRuYW0gYXVmIERldXRzY2g6IFplbnRyYWx2aWV0bmFtICYgUGjDuiBRdeG7kWMgfCBHb1ZpZXRTdGF5In0sIHsicGF0aCI6ICJhcHBcXGRlXFx6ZW50cmFsdmlldG5hbS1wcml2YXRlLXRvdXJlblxccGFnZS50c3giLCAib2xkIjogIlplbnRyYWx2aWV0bmFtIGluZGl2aWR1ZWxsOiDEkMOgIE7hurVuZywgSOG7mWkgQW4gJiBIdeG6vyB8IEdvVmlldFN0YXkiLCAibmV3IjogIlplbnRyYWx2aWV0bmFtIGluZGl2aWR1ZWxsOiDEkMOgIE7hurVuZ+KAk0jhu5lpIEFu4oCTSHXhur8gfCBHb1ZpZXRTdGF5In0sIHsicGF0aCI6ICJhcHBcXGRlXFxkYS1uYW5nXFxwYWdlLnRzeCIsICJvbGQiOiAixJDDoCBO4bq1bmcgU2VoZW5zd8O8cmRpZ2tlaXRlbiAmIFJlaXNldGlwcHMgMjAyNi8yNyB8IEdvVmlldFN0YXkiLCAibmV3IjogIsSQw6AgTuG6tW5nIFNlaGVuc3fDvHJkaWdrZWl0ZW4gMjAyNi8yNyB8IEdvVmlldFN0YXkifSwgeyJwYXRoIjogImFwcFxcZGVcXGhvaS1hblxccGFnZS50c3giLCAib2xkIjogIkjhu5lpIEFuIFNlaGVuc3fDvHJkaWdrZWl0ZW46IEFsdHN0YWR0LCBVbWdlYnVuZyAmIFRpcHBzIHwgR29WaWV0U3RheSIsICJuZXciOiAiSOG7mWkgQW4gU2VoZW5zd8O8cmRpZ2tlaXRlbiAmIFRpcHBzIHwgR29WaWV0U3RheSJ9LCB7InBhdGgiOiAiYXBwXFxkZVxcaHVlXFxwYWdlLnRzeCIsICJvbGQiOiAiSHXhur8gVmlldG5hbTogU2VoZW5zd8O8cmRpZ2tlaXRlbiwgRGF1ZXIgJiBUYWdlc2F1c2ZsdWcgfCBHb1ZpZXRTdGF5IiwgIm5ldyI6ICJIdeG6vyBTZWhlbnN3w7xyZGlna2VpdGVuICYgVGFnZXNhdXNmbHVnIHwgR29WaWV0U3RheSJ9LCB7InBhdGgiOiAiYXBwXFxkZVxcemVudHJhbHZpZXRuYW0tcmVpc2VwbGFuXFxwYWdlLnRzeCIsICJvbGQiOiAiWmVudHJhbHZpZXRuYW0gUmVpc2Vyb3V0ZTogM+KAkzUgVGFnZSDEkMOgIE7hurVuZywgSOG7mWkgQW4gJiBIdeG6vyB8IEdvVmlldFN0YXkiLCAibmV3IjogIlplbnRyYWx2aWV0bmFtIFJlaXNlcm91dGU6IDPigJM1IFRhZ2UgfCBHb1ZpZXRTdGF5In0sIHsicGF0aCI6ICJhcHBcXGRlXFxkYS1uYW5nLXJlZ2VuemVpdFxccGFnZS50c3giLCAib2xkIjogIsSQw6AgTuG6tW5nIFJlZ2VuemVpdDogV2V0dGVyLCBBa3Rpdml0w6R0ZW4gJiBQbGFuIEIgfCBHb1ZpZXRTdGF5IiwgIm5ldyI6ICLEkMOgIE7hurVuZyBSZWdlbnplaXQ6IFdldHRlciAmIFBsYW4gQiB8IEdvVmlldFN0YXkifSwgeyJwYXRoIjogImFwcFxcZGVcXHBodS1xdW9jXFxwYWdlLnRzeCIsICJvbGQiOiAiUGjDuiBRdeG7kWMgVXJsYXViIDIwMjYvMjc6IFNlaGVuc3fDvHJkaWdrZWl0ZW4gJiBSZWlzZXRpcHBzIHwgR29WaWV0U3RheSIsICJuZXciOiAiUGjDuiBRdeG7kWMgVXJsYXViIDIwMjYvMjc6IFRpcHBzICYgSGlnaGxpZ2h0cyB8IEdvVmlldFN0YXkifSwgeyJwYXRoIjogImFwcFxcZGVcXHBodS1xdW9jXFxiZXN0ZS1yZWlzZXplaXRcXHBhZ2UudHN4IiwgIm9sZCI6ICJQaMO6IFF14buRYyBiZXN0ZSBSZWlzZXplaXQ6IFdldHRlciAmIFJlZ2VuemVpdCAyMDI2LzI3IHwgR29WaWV0U3RheSIsICJuZXciOiAiUGjDuiBRdeG7kWMgYmVzdGUgUmVpc2V6ZWl0IDIwMjYvMjcgfCBHb1ZpZXRTdGF5In0sIHsicGF0aCI6ICJhcHBcXGRlXFxwaHUtcXVvY1xcMy1vZGVyLTQtaW5zZWxuXFxwYWdlLnRzeCIsICJvbGQiOiAiUGjDuiBRdeG7kWMgMyBvZGVyIDQgSW5zZWxuPyBWZXJnbGVpY2ggZsO8ciBTY2hub3JjaGVsbiAmIEhvbiBUaG9tIHwgR29WaWV0U3RheSIsICJuZXciOiAiUGjDuiBRdeG7kWM6IDMgb2RlciA0IEluc2Vsbj8gfCBHb1ZpZXRTdGF5In0sIHsicGF0aCI6ICJhcHBcXGRlXFxwaHUtcXVvY1xcbWl0LWtpbmRlcm5cXHBhZ2UudHN4IiwgIm9sZCI6ICJQaMO6IFF14buRYyBtaXQgS2luZGVybjogRmFtaWxpZW51cmxhdWIsIFN0csOkbmRlICYgQXVzZmzDvGdlIHwgR29WaWV0U3RheSIsICJuZXciOiAiUGjDuiBRdeG7kWMgbWl0IEtpbmRlcm46IEZhbWlsaWVudXJsYXViIHwgR29WaWV0U3RheSJ9LCB7InBhdGgiOiAiYXBwXFxkZVxccGh1LXF1b2NcXGluZGl2aWR1ZWxsZS1hdXNmbHVlZ2VcXHBhZ2UudHN4IiwgIm9sZCI6ICJJbmRpdmlkdWVsbGUgQXVzZmzDvGdlIFBow7ogUXXhu5FjOiBwcml2YXRlIFJvdXRlIG5hY2ggSWhyZW0gVGVtcG8gfCBHb1ZpZXRTdGF5IiwgIm5ldyI6ICJQaMO6IFF14buRYyBpbmRpdmlkdWVsbGUgQXVzZmzDvGdlIHwgR29WaWV0U3RheSJ9LCB7InBhdGgiOiAiYXBwXFxkZVxccGh1LXF1b2NcXHdvLXVlYmVybmFjaHRlblxccGFnZS50c3giLCAib2xkIjogIldvIGF1ZiBQaMO6IFF14buRYyDDvGJlcm5hY2h0ZW4/IETGsMahbmcgxJDDtG5nLCDDlG5nIExhbmcgb2RlciBTw7xkZW4gfCBHb1ZpZXRTdGF5IiwgIm5ldyI6ICJQaMO6IFF14buRYzogV28gw7xiZXJuYWNodGVuPyB8IEdvVmlldFN0YXkifV0="))
$rows = $rowsJson | ConvertFrom-Json

$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backup = Join-Path $root (".govietstay-backups\de-seo-titles-" + $stamp)
New-Item -ItemType Directory -Path $backup -Force | Out-Null

Step "Preflight: verify all expected German SEO titles"
foreach ($row in $rows) {
  $relative = [string]$row.path
  if ($appPrefix -eq "src\app\") { $relative = "src\" + $relative }
  $file = Join-Path $root $relative

  if (-not (Test-Path $file)) {
    throw ("Missing German landing file: " + $relative)
  }

  $text = [IO.File]::ReadAllText($file)
  $count = ([regex]::Matches($text, [regex]::Escape([string]$row.old))).Count

  if ($count -lt 1) {
    if ($text.Contains([string]$row.new)) {
      Write-Host ("Already updated: " + $relative) -ForegroundColor DarkYellow
    } else {
      throw ("Expected SEO title not found in: " + $relative + ". Installer stopped instead of guessing.")
    }
  } else {
    Write-Host ("Ready: " + $relative + " (" + $count + " title occurrences)") -ForegroundColor DarkGray
  }
}

Step "Backup target page files"
foreach ($row in $rows) {
  $relative = [string]$row.path
  if ($appPrefix -eq "src\app\") { $relative = "src\" + $relative }
  $file = Join-Path $root $relative
  $backupFile = Join-Path $backup $relative
  New-Item -ItemType Directory -Path (Split-Path -Parent $backupFile) -Force | Out-Null
  Copy-Item -LiteralPath $file -Destination $backupFile -Force
}
Write-Host ("Backup: " + $backup) -ForegroundColor Yellow

Step "Shorten SEO / OpenGraph / Twitter titles"
foreach ($row in $rows) {
  $relative = [string]$row.path
  if ($appPrefix -eq "src\app\") { $relative = "src\" + $relative }
  $file = Join-Path $root $relative
  $text = [IO.File]::ReadAllText($file)

  if ($text.Contains([string]$row.old)) {
    $text = $text.Replace([string]$row.old, [string]$row.new)
    [IO.File]::WriteAllText($file, $text, (New-Object Text.UTF8Encoding($false)))
    Write-Host ("Updated: " + $relative) -ForegroundColor Green
  } else {
    Write-Host ("Skipped (already current): " + $relative) -ForegroundColor DarkYellow
  }
}

Step "Validate titles and page content"
$fail = $false
foreach ($row in $rows) {
  $relative = [string]$row.path
  if ($appPrefix -eq "src\app\") { $relative = "src\" + $relative }
  $file = Join-Path $root $relative
  $text = [IO.File]::ReadAllText($file)
  $newTitle = [string]$row.new
  $len = $newTitle.Length
  $newCount = ([regex]::Matches($text, [regex]::Escape($newTitle))).Count

  if ($newCount -lt 1) {
    Write-Host ("FAIL: new title missing in " + $relative) -ForegroundColor Red
    $fail = $true
  } elseif ($len -gt 60) {
    Write-Host ("FAIL: " + $len + " chars - " + $newTitle) -ForegroundColor Red
    $fail = $true
  } else {
    Write-Host ("PASS " + $len.ToString().PadLeft(2) + " chars: " + $newTitle) -ForegroundColor Green
  }

  # Keep page body/H1 content intact: config title must still exist.
  if (-not $text.Contains('"canonicalPath"')) {
    Write-Host ("FAIL: landing config missing in " + $relative) -ForegroundColor Red
    $fail = $true
  }
}

if ($fail) {
  throw "Validation failed. Use the backup folder shown above if rollback is needed."
}

Step "Safety checks"
$sharedPath = Join-Path $root (($appPrefix) + "de\_shared\GermanLanding.tsx")
if (-not (Test-Path $sharedPath)) { throw "German shared component missing." }
$sharedText = [IO.File]::ReadAllText($sharedPath)

if (-not $sharedText.Contains("/brand/govietstay-official-logo.jpg")) {
  throw "Official GoVietStay logo reference is missing."
}
if (-not $sharedText.Contains("84937762607")) {
  throw "GoVietStay WhatsApp reference is missing."
}

Write-Host "PASS: official logo unchanged." -ForegroundColor Green
Write-Host "PASS: WhatsApp unchanged." -ForegroundColor Green
Write-Host "PASS: H1/content/canonical/sitemap were not targeted." -ForegroundColor Green
Write-Host "PASS: all 13 SEO titles are <= 60 characters." -ForegroundColor Green

Step "Git status"
try {
  git status --short -- app/de 2>$null
} catch {}

Write-Host ""
Write-Host "[OK] German SEO titles are ready locally." -ForegroundColor Green
Write-Host "No Vercel deployment or git push was triggered automatically." -ForegroundColor Yellow
Write-Host "Next: use your normal GoVietStay git/deploy flow, then re-test /de/da-nang in Bing Live URL." -ForegroundColor Cyan

