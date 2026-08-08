$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)
$Host.UI.RawUI.WindowTitle = "GoVietStay Local Point V25"

$pushedLocation = $false
$exitCode = 1

function Write-Step {
    param([string]$Number, [string]$Message)
    Write-Host "[$Number/6] $Message" -ForegroundColor Cyan
}

try {
    Write-Host "===============================================================" -ForegroundColor DarkCyan
    Write-Host "   GOVIETSTAY LOCAL POINT V25 - WINDOWS INSTALLER" -ForegroundColor White
    Write-Host "===============================================================" -ForegroundColor DarkCyan
    Write-Host ""

    $installerDir = Split-Path -Parent $MyInvocation.MyCommand.Path
    $payloadZip = Join-Path $installerDir "LOCAL-POINT-PAYLOAD.zip"

    if (-not (Test-Path -LiteralPath $payloadZip)) {
        throw "Khong tim thay LOCAL-POINT-PAYLOAD.zip ben canh file cai dat."
    }

    $candidates = @(
        $installerDir,
        (Split-Path -Parent $installerDir),
        (Get-Location).Path
    ) | Select-Object -Unique

    $target = $null
    foreach ($candidate in $candidates) {
        if ($candidate -and (Test-Path -LiteralPath (Join-Path $candidate "package.json"))) {
            $target = (Resolve-Path -LiteralPath $candidate).Path.TrimEnd([char]92)
            break
        }
    }

    if (-not $target) {
        throw "Khong tim thay thu muc website co package.json. Hay dat 3 file cai dat vao thu muc goc website."
    }

    Write-Host "Website: $target" -ForegroundColor Green
    Write-Host ""

    Push-Location $target
    $pushedLocation = $true

    & git.exe rev-parse --is-inside-work-tree 2>$null | Out-Null
    if ($LASTEXITCODE -ne 0) {
        throw "Thu muc nay khong phai Git repository cua website."
    }

    $preStagedFiles = @(& git.exe diff --cached --name-only)
    if ($LASTEXITCODE -ne 0) {
        throw "Khong kiem tra duoc Git staging area."
    }
    $hasPreStagedFiles = $preStagedFiles.Count -gt 0

    $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
    $repoParent = Split-Path -Parent $target
    $backup = Join-Path $repoParent "BACKUP-LOCAL-POINT-V25-$stamp"

    $localPointFiles = @(
        "components\LocalPointLandingPage.tsx",
        "components\LocalPointLandingPage.css",
        "app\ru\local-point\page.tsx",
        "public\local-point\govietstay-logo.jpg",
        "public\local-point\local-point-tropical-clean-v3.png",
        "public\local-point\local-point-mobile-clean-v3.png"
    )

    Write-Step "1" "Sao luu dung 6 file Local Point hien tai"
    foreach ($relativePath in $localPointFiles) {
        $source = Join-Path $target $relativePath
        if (Test-Path -LiteralPath $source) {
            $destination = Join-Path $backup $relativePath
            $destinationDir = Split-Path -Parent $destination
            New-Item -ItemType Directory -Force -Path $destinationDir | Out-Null
            Copy-Item -LiteralPath $source -Destination $destination -Force
        }
    }
    Write-Host "  Backup: $backup" -ForegroundColor DarkGray

    Write-Step "2" "Dua cac thu muc backup cu ra ngoai Git repository"
    $oldBackups = @(Get-ChildItem -LiteralPath $target -Directory -Filter "BACKUP-LOCAL-POINT-*" -ErrorAction SilentlyContinue)
    if ($oldBackups.Count -gt 0) {
        $recoveryDir = Join-Path $repoParent "GOVIETSTAY-RECOVERED-BACKUPS-$stamp"
        New-Item -ItemType Directory -Force -Path $recoveryDir | Out-Null
        foreach ($oldBackup in $oldBackups) {
            Move-Item -LiteralPath $oldBackup.FullName -Destination $recoveryDir -Force
            Write-Host "  MOVED  $($oldBackup.Name)" -ForegroundColor DarkGray
        }
    } else {
        Write-Host "  Khong co backup cu trong website." -ForegroundColor DarkGray
    }

    Write-Step "3" "Giai nen truc tiep giao dien V25 vao website"
    Expand-Archive -LiteralPath $payloadZip -DestinationPath $target -Force

    $componentPath = Join-Path $target "components\LocalPointLandingPage.tsx"
    if (-not (Test-Path -LiteralPath $componentPath)) {
        throw "Khong tim thay LocalPointLandingPage.tsx sau khi giai nen."
    }

    $componentContent = Get-Content -LiteralPath $componentPath -Raw -Encoding UTF8
    if ($componentContent -notmatch "local-point-v25") {
        throw "File trong website khong phai ma nguon Local Point V25."
    }
    Write-Host "  OK  Da xac nhan local-point-v25 trong thu muc components." -ForegroundColor Green

    $oldPayload = Join-Path $target "_LOCAL_POINT_FILES"
    $oldPayloadMarker = Join-Path $oldPayload "components\LocalPointLandingPage.tsx"
    if (Test-Path -LiteralPath $oldPayloadMarker) {
        Remove-Item -LiteralPath $oldPayload -Recurse -Force
        Write-Host "  REMOVED  _LOCAL_POINT_FILES cua bo cai cu" -ForegroundColor DarkGray
    }

    Write-Step "4" "Cai va ghi dependencies vao package.json"
    & npm.cmd install "lucide-react@^1.30.0" "@svg-maps/vietnam@^2.0.0" --save
    if ($LASTEXITCODE -ne 0) {
        throw "npm install that bai."
    }

    Write-Step "5" "Build kiem tra toan bo website"
    & npm.cmd run build
    if ($LASTEXITCODE -ne 0) {
        throw "npm run build that bai. Khong commit va khong push."
    }

    if ($hasPreStagedFiles) {
        Write-Host ""
        Write-Host "BUILD THANH CONG, NHUNG DA CO FILE STAGED TU TRUOC:" -ForegroundColor Yellow
        $preStagedFiles | ForEach-Object { Write-Host "  $_" -ForegroundColor Yellow }
        Write-Host "Em dung truoc commit de khong tron cong viec khac cua anh." -ForegroundColor Yellow
        $exitCode = 2
    } else {
        Write-Step "6" "Commit rieng Local Point V25 va push len main"

        $gitFiles = @(
            "components/LocalPointLandingPage.tsx",
            "components/LocalPointLandingPage.css",
            "app/ru/local-point/page.tsx",
            "public/local-point/govietstay-logo.jpg",
            "public/local-point/local-point-tropical-clean-v3.png",
            "public/local-point/local-point-mobile-clean-v3.png",
            "package.json"
        )
        if (Test-Path -LiteralPath (Join-Path $target "package-lock.json")) {
            $gitFiles += "package-lock.json"
        }

        & git.exe add -- $gitFiles
        if ($LASTEXITCODE -ne 0) {
            throw "git add cac file Local Point that bai."
        }

        $trackedOldPayload = @(& git.exe ls-files -- "_LOCAL_POINT_FILES")
        if ($trackedOldPayload.Count -gt 0) {
            & git.exe add -A -- "_LOCAL_POINT_FILES"
            if ($LASTEXITCODE -ne 0) {
                throw "Khong stage duoc viec xoa _LOCAL_POINT_FILES."
            }
        }

        & git.exe diff --cached --quiet
        $diffExitCode = $LASTEXITCODE
        if ($diffExitCode -eq 1) {
            & git.exe commit -m "Update Local Point V25 experience"
            if ($LASTEXITCODE -ne 0) {
                throw "git commit that bai."
            }
        } elseif ($diffExitCode -gt 1) {
            throw "Khong kiem tra duoc thay doi Git."
        } else {
            Write-Host "  Ma V25 da co san; se push commit chua dong bo neu co." -ForegroundColor DarkGray
        }

        & git.exe push origin main
        if ($LASTEXITCODE -ne 0) {
            throw "git push origin main that bai."
        }

        Write-Host ""
        Write-Host "===============================================================" -ForegroundColor Green
        Write-Host "        DA BUILD, COMMIT VA PUSH LOCAL POINT V25" -ForegroundColor Green
        Write-Host "===============================================================" -ForegroundColor Green
        & git.exe log -1 --oneline
        Write-Host ""
        Write-Host "Vercel se tu dong deploy. Cuoi trang moi co chu LOCAL POINT V25." -ForegroundColor White
        $exitCode = 0
    }
}
catch {
    Write-Host ""
    Write-Host "LOI: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Khong commit va khong push khi quy trinh chua hoan tat." -ForegroundColor Red
    $exitCode = 1
}
finally {
    if ($pushedLocation) {
        Pop-Location
    }
}

exit $exitCode
