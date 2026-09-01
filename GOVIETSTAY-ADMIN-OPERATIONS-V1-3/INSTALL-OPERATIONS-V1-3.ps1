$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'

function Step([string]$Text) { Write-Host "`n==> $Text" -ForegroundColor Cyan }
function Ok([string]$Text) { Write-Host "[OK] $Text" -ForegroundColor Green }
function Warn([string]$Text) { Write-Host "[WARN] $Text" -ForegroundColor Yellow }

$PackageRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$PayloadRoot = Join-Path $PackageRoot 'payload'
$ExpectedName = 'govietstay-main-website'
$ExpectedRepoText = 'govietstay-art/govietstay-main-website'
$TargetFiles = @(
  'components/admin-v5/OperationsCenter.tsx',
  'components/admin-v5/operations-v1.css',
  'app/admin/operations/page.tsx'
)

function Is-ProjectRoot([string]$Path) {
  if (-not $Path -or -not (Test-Path $Path)) { return $false }
  $Pkg = Join-Path $Path 'package.json'
  $Admin = Join-Path $Path 'components/admin-v5/AdminV5.tsx'
  if (-not (Test-Path $Pkg) -or -not (Test-Path $Admin)) { return $false }
  try {
    $Json = Get-Content $Pkg -Raw | ConvertFrom-Json
    return $Json.name -eq $ExpectedName
  }
  catch { return $false }
}

function Find-ProjectRoot {
  $Candidates = New-Object System.Collections.Generic.List[string]
  $Cwd = (Get-Location).Path
  $Parent = Split-Path $PackageRoot -Parent
  $Candidates.Add($Cwd)
  $Candidates.Add($Parent)
  $Candidates.Add((Join-Path $Cwd $ExpectedName))
  $Candidates.Add((Join-Path $Parent $ExpectedName))
  $Homes = @(
    $env:USERPROFILE,
    (Join-Path $env:USERPROFILE 'Documents'),
    (Join-Path $env:USERPROFILE 'Desktop'),
    (Join-Path $env:USERPROFILE 'Downloads')
  )
  foreach ($Base in $Homes) {
    if ($Base) { $Candidates.Add((Join-Path $Base $ExpectedName)) }
  }
  foreach ($P in ($Candidates | Select-Object -Unique)) {
    if (Is-ProjectRoot $P) { return (Resolve-Path $P).Path }
  }
  foreach ($Base in $Homes) {
    if (-not $Base -or -not (Test-Path $Base)) { continue }
    try {
      $Found = Get-ChildItem -Path $Base -Directory -Filter $ExpectedName -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1
      if ($Found -and (Is-ProjectRoot $Found.FullName)) { return $Found.FullName }
    }
    catch {}
  }
  return $null
}

function Find-V12SafetyStash {
  $Lines = @(& git stash list --format='%gd|%s' 2>$null)
  foreach ($Line in $Lines) {
    if ($Line -match '^([^|]+)\|.*govietstay-operations-v1-2-auto-stash-') {
      return $Matches[1]
    }
  }
  return $null
}

function Restore-V12SafetyStash([string]$StashRef, [string]$ProjectRoot) {
  if (-not $StashRef) { return }
  Step 'Recover local work saved by the previous V1.2 run'
  Write-Host "Safety stash found: $StashRef" -ForegroundColor DarkGray

  $TrackedNow = @(& git status --porcelain --untracked-files=no)
  if ($TrackedNow.Count -eq 0) {
    $IndexRef = $StashRef + '^2'
    & git restore --source=$IndexRef --staged -- .
    if ($LASTEXITCODE -ne 0) { throw 'Could not restore the saved index state from the V1.2 safety stash.' }
    & git restore --source=$StashRef --worktree -- .
    if ($LASTEXITCODE -ne 0) { throw 'Could not restore the saved tracked working files from the V1.2 safety stash.' }
    Ok 'Tracked local work from V1.2 was restored.'
  }
  else {
    Warn 'Tracked local changes already exist, so V1.3 will not overwrite them.'
  }

  $UntrackedRef = $StashRef + '^3'
  & git rev-parse --verify $UntrackedRef *> $null
  if ($LASTEXITCODE -eq 0) {
    $Stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
    $Zip = Join-Path $env:TEMP ("gvs-v12-untracked-" + $Stamp + '.zip')
    $Extract = Join-Path $env:TEMP ("gvs-v12-untracked-" + $Stamp)
    try {
      & git archive --format=zip --output=$Zip $UntrackedRef
      if ($LASTEXITCODE -eq 0 -and (Test-Path $Zip)) {
        Expand-Archive -Path $Zip -DestinationPath $Extract -Force
        Get-ChildItem -Path $Extract -File -Recurse | ForEach-Object {
          $Rel = $_.FullName.Substring($Extract.Length).TrimStart('\')
          $Dest = Join-Path $ProjectRoot $Rel
          if (-not (Test-Path $Dest)) {
            New-Item -ItemType Directory -Force -Path (Split-Path -Parent $Dest) | Out-Null
            Copy-Item -LiteralPath $_.FullName -Destination $Dest -Force
          }
        }
        Ok 'Missing untracked files from V1.2 were restored without overwriting existing files.'
      }
    }
    finally {
      if (Test-Path $Zip) { Remove-Item -Force $Zip -ErrorAction SilentlyContinue }
      if (Test-Path $Extract) { Remove-Item -Recurse -Force $Extract -ErrorAction SilentlyContinue }
    }
  }
  Write-Host 'The V1.2 safety stash is intentionally kept as a backup.' -ForegroundColor DarkGray
}

$ProjectRoot = $null
$Worktree = $null
$WorktreeAdded = $false
$LocationPushed = $false
$ExitCode = 0

try {
  Step 'Find the GoVietStay project'
  $ProjectRoot = Find-ProjectRoot
  if (-not $ProjectRoot) {
    $Manual = Read-Host 'Paste the full path to govietstay-main-website'
    if (-not (Is-ProjectRoot $Manual)) { throw 'The selected folder is not the GoVietStay project.' }
    $ProjectRoot = (Resolve-Path $Manual).Path
  }
  Ok "Project: $ProjectRoot"

  if (-not (Get-Command git.exe -ErrorAction SilentlyContinue)) { throw 'Git is not available in PATH.' }
  $Npm = Get-Command npm.cmd -ErrorAction SilentlyContinue
  if (-not $Npm) { $Npm = Get-Command npm -ErrorAction SilentlyContinue }
  if (-not $Npm) { throw 'Node.js/npm is not available in PATH.' }
  $NpmCmd = $Npm.Source

  Push-Location $ProjectRoot
  $LocationPushed = $true

  Step 'Verify repository only - current working files will not be changed'
  $Inside = (& git rev-parse --is-inside-work-tree 2>$null).Trim()
  if ($Inside -ne 'true') { throw 'This folder is not a Git repository.' }
  $Remote = (& git remote get-url origin 2>$null).Trim()
  if (-not $Remote -or $Remote -notmatch 'govietstay-art/govietstay-main-website|govietstay-art\govietstay-main-website') {
    throw "Git origin does not match $ExpectedRepoText. Current origin: $Remote"
  }
  Ok "Repository verified: $Remote"

  foreach ($Rel in $TargetFiles) {
    $Src = Join-Path $PayloadRoot $Rel
    if (-not (Test-Path $Src)) { throw "Installer payload is missing: $Rel" }
  }

  $SafetyStash = Find-V12SafetyStash
  if ($SafetyStash) { Restore-V12SafetyStash $SafetyStash $ProjectRoot }
  else { Ok 'No V1.2 safety stash needs recovery.' }

  Step 'Fetch the latest production main'
  & git fetch origin main
  if ($LASTEXITCODE -ne 0) { throw 'git fetch failed. Check internet/GitHub login and run again.' }
  $RemoteHead = (& git rev-parse origin/main).Trim()
  if (-not $RemoteHead) { throw 'Could not resolve origin/main.' }
  Ok "origin/main: $RemoteHead"

  $Stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
  $Worktree = Join-Path $env:TEMP ("govietstay-operations-v1-3-" + $Stamp)
  if (Test-Path $Worktree) { Remove-Item -Recurse -Force $Worktree }

  Step 'Create an isolated clean worktree in Windows TEMP'
  & git worktree add --detach $Worktree origin/main
  if ($LASTEXITCODE -ne 0) { throw 'Could not create isolated Git worktree.' }
  $WorktreeAdded = $true
  Ok "Isolated worktree: $Worktree"

  Step 'Copy only the 3 Operations frontend files into the isolated worktree'
  foreach ($Rel in $TargetFiles) {
    $Src = Join-Path $PayloadRoot $Rel
    $Dest = Join-Path $Worktree $Rel
    New-Item -ItemType Directory -Force -Path (Split-Path -Parent $Dest) | Out-Null
    Copy-Item -LiteralPath $Src -Destination $Dest -Force
  }
  Ok 'Operations files copied only to the isolated worktree.'

  Step 'Copy local environment files for build only'
  Get-ChildItem -Path $ProjectRoot -File -Filter '.env*' -ErrorAction SilentlyContinue | ForEach-Object {
    Copy-Item -LiteralPath $_.FullName -Destination (Join-Path $Worktree $_.Name) -Force
  }
  Ok 'Build environment prepared.'

  Step 'Install dependencies in the isolated worktree'
  Push-Location $Worktree
  try {
    & $NpmCmd ci --no-audit --no-fund
    if ($LASTEXITCODE -ne 0) { throw 'npm ci failed in the isolated worktree.' }

    Step 'Run the full production build'
    & $NpmCmd run build
    if ($LASTEXITCODE -ne 0) { throw 'Production build failed. Nothing was pushed.' }
    Ok 'Production build passed.'

    $Unexpected = @(& git status --porcelain | Where-Object {
      $Path = ($_ -replace '^..\s+', '')
      $TargetFiles -notcontains $Path
    })
    if ($Unexpected.Count -gt 0) {
      Write-Host ($Unexpected -join "`n") -ForegroundColor Yellow
      throw 'Unexpected files changed in the isolated worktree. Nothing was pushed.'
    }

    & git add -- $TargetFiles
    if ($LASTEXITCODE -ne 0) { throw 'git add failed in isolated worktree.' }

    & git diff --cached --quiet -- $TargetFiles
    if ($LASTEXITCODE -eq 0) {
      Ok 'Operations V1.3 is already present on origin/main. No commit is needed.'
    }
    else {
      Step 'Commit only the Operations files'
      & git commit -m 'feat(admin): add operations center v1.3' -- $TargetFiles
      if ($LASTEXITCODE -ne 0) { throw 'git commit failed.' }
      $NewCommit = (& git rev-parse HEAD).Trim()
      Ok "Clean Operations commit: $NewCommit"

      Step 'Push the isolated clean commit to production main'
      & git push origin HEAD:main
      if ($LASTEXITCODE -ne 0) { throw 'git push was rejected or failed. Nothing from the dirty working tree was included.' }
      Ok 'Push completed. Vercel can deploy from GitHub.'
    }
  }
  finally {
    Pop-Location
  }

  Step 'Refresh origin/main reference without touching your working files'
  & git fetch origin main | Out-Null
  Ok 'Your current Korean/Turkish working files were not stashed, deleted, committed, or overwritten by V1.3.'

  Write-Host "`nSUCCESS" -ForegroundColor Green
  Write-Host 'Open after Vercel deployment:' -ForegroundColor Green
  Write-Host 'https://www.govietstay.com/admin/operations' -ForegroundColor Green
  $ExitCode = 0
}
catch {
  Write-Host "`n[STOP] $($_.Exception.Message)" -ForegroundColor Red
  Write-Host 'No failed Operations build was pushed by V1.3.' -ForegroundColor DarkGray
  if ($ProjectRoot) {
    Write-Host 'The current project working files were not cleaned or stashed by V1.3.' -ForegroundColor DarkGray
  }
  $ExitCode = 1
}
finally {
  if ($LocationPushed) {
    try {
      if ($WorktreeAdded -and $Worktree -and (Test-Path $Worktree)) {
        & git worktree remove --force $Worktree 2>$null | Out-Null
      }
      & git worktree prune 2>$null | Out-Null
    }
    catch {}
    Pop-Location
  }
}

exit $ExitCode
