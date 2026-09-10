@echo off
setlocal EnableExtensions
title GoVietStay Universal Partner Kit V4.1 FIX4 - Smart Background Switcher

cd /d "%~dp0"
set "FILE=components\admin-v5\PartnerTools.tsx"
set "BACKUP=components\admin-v5\PartnerTools.tsx.before-v4.1.bak"
set "FLAG=.gvs_v41_patched"
set "LOG=GVS_V4_1_INSTALL_LOG.txt"

> "%LOG%" echo GoVietStay Universal Partner Kit V4.1 FIX4
>>"%LOG%" echo Smart Background Switcher + Mobile First
>>"%LOG%" echo Started: %date% %time%
>>"%LOG%" echo.

echo ============================================================
echo GoVietStay Universal Partner Kit V4.1 FIX4
echo Smart Background Switcher + Mobile First
echo ============================================================
echo.
echo This installer will:
echo  1. Upgrade Partner Kit V4 to V4.1
echo  2. Add destination presets incl. Phu Quoc
echo  3. Fix image stretching with smart crop/focal controls
echo  4. Add Cover/Contain + Focus + Overlay
echo  5. Optimize modal controls for mobile
echo  6. Build production safely
echo  7. Commit ONLY PartnerTools.tsx and push GitHub main
echo     - Vercel will auto-deploy from GitHub
echo.

if not exist "package.json" (
  echo ERROR: Put this BAT in the ROOT of govietstay-main-website.
  >>"%LOG%" echo ERROR: package.json not found.
  goto :FAIL
)
if not exist ".git" (
  echo ERROR: .git folder not found. This is not the repository root.
  >>"%LOG%" echo ERROR: .git folder not found.
  goto :FAIL
)
if not exist "%FILE%" (
  echo ERROR: %FILE% not found.
  >>"%LOG%" echo ERROR: PartnerTools.tsx not found.
  goto :FAIL
)
where powershell.exe >nul 2>&1
if errorlevel 1 (
  echo ERROR: PowerShell not found.
  >>"%LOG%" echo ERROR: PowerShell not found.
  goto :FAIL
)
where npm.cmd >nul 2>&1
if errorlevel 1 (
  echo ERROR: npm not found.
  >>"%LOG%" echo ERROR: npm.cmd not found.
  goto :FAIL
)
where git.exe >nul 2>&1
if errorlevel 1 (
  echo ERROR: Git not found.
  >>"%LOG%" echo ERROR: git.exe not found.
  goto :FAIL
)

del /q "%FLAG%" >nul 2>&1

findstr /C:"Smart Background Switcher" "%FILE%" >nul 2>&1
if errorlevel 1 (
  echo [1/5] Backing up V4...
  copy /Y "%FILE%" "%BACKUP%" >nul
  if errorlevel 1 (
    echo ERROR: Could not create backup.
    >>"%LOG%" echo ERROR: Could not create backup.
    goto :FAIL
  )
) else (
  echo [1/5] V4.1 is already present; keeping existing source.
)

echo [2/5] FIX4 syntax-check + applying V4.1 patch safely...
set "GVS_SELF=%~f0"
set "GVS_PS1=%TEMP%\gvs_partner_v41_patch_%RANDOM%_%RANDOM%.ps1"
powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "$s=[IO.File]::ReadAllText($env:GVS_SELF,[Text.Encoding]::UTF8);$m=('###GVS_PS1_'+'PAYLOAD###');$i=$s.LastIndexOf($m);if($i -lt 0){Write-Error 'Embedded payload marker not found';exit 9};$p=$s.Substring($i+$m.Length).TrimStart([char]13,[char]10);[IO.File]::WriteAllText($env:GVS_PS1,$p,[Text.Encoding]::Unicode)"
if errorlevel 1 (
  echo.
  echo PAYLOAD EXTRACTION FAILED.
  >>"%LOG%" echo PAYLOAD EXTRACTION FAILED.
  goto :RESTORE_PATCH
)
echo Checking embedded PowerShell syntax...
powershell.exe -NoProfile -Command "$tok=$null;$err=$null;[System.Management.Automation.Language.Parser]::ParseFile($env:GVS_PS1,[ref]$tok,[ref]$err)|Out-Null;if($err.Count -gt 0){$err|ForEach-Object{Write-Host $_.Message};exit 7}" >>"%LOG%" 2>&1
if errorlevel 1 (
  echo.
  echo POWERSHELL SYNTAX CHECK FAILED.
  >>"%LOG%" echo POWERSHELL SYNTAX CHECK FAILED.
  del /q "%GVS_PS1%" >nul 2>&1
  goto :RESTORE_PATCH
)

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%GVS_PS1%" >>"%LOG%" 2>&1
set "PATCH_RC=%ERRORLEVEL%"
del /q "%GVS_PS1%" >nul 2>&1
if not "%PATCH_RC%"=="0" (
  echo.
  echo PATCH FAILED with code %PATCH_RC%.
  >>"%LOG%" echo PATCH FAILED with code %PATCH_RC%.
  goto :RESTORE_PATCH
)

echo [3/5] Building production...
call npm.cmd run build >>"%LOG%" 2>&1
if errorlevel 1 (
  echo.
  echo BUILD FAILED. Nothing was pushed.
  >>"%LOG%" echo BUILD FAILED.
  if exist "%FLAG%" goto :RESTORE_BUILD
  goto :SHOWLOG
)
echo Build OK.
>>"%LOG%" echo BUILD OK.

echo [4/5] Committing PartnerTools.tsx only...
git add -- "%FILE%" >>"%LOG%" 2>&1
git diff --cached --quiet
if not errorlevel 1 (
  echo No new source change to commit.
  >>"%LOG%" echo No staged V4.1 changes.
) else (
  git commit -m "feat(partner): V4.1 smart background switcher mobile" >>"%LOG%" 2>&1
  if errorlevel 1 (
    echo COMMIT FAILED.
    goto :SHOWLOG
  )
)

echo [5/5] Pushing GitHub main...
git push origin main >>"%LOG%" 2>&1
if errorlevel 1 (
  echo.
  echo PUSH FAILED. Local build is OK, but Vercel did not receive this update yet.
  goto :SHOWLOG
)

del /q "%FLAG%" >nul 2>&1
echo.
echo ============================================================
echo SUCCESS: Universal Partner Kit V4.1 pushed to GitHub main.
echo Vercel will deploy automatically.
echo ============================================================
echo.
echo Check in Admin - Partner Deployment Center:
echo  - Smart Background Switcher
echo  - Da Nang / Hoi An / Hue / Phu Quoc / Global presets
echo  - Cover / Contain
echo  - Focus controls
echo  - Overlay controls
echo  - A3 A4 A5 Car Seat Sticker Table Digital
echo.
>>"%LOG%" echo SUCCESS: V4.1 pushed to GitHub main.
pause
exit /b 0

:RESTORE_PATCH
if exist "%BACKUP%" (
  copy /Y "%BACKUP%" "%FILE%" >nul
  echo Original V4 source restored.
  >>"%LOG%" echo Original V4 source restored after patch failure.
)
goto :SHOWLOG

:RESTORE_BUILD
if exist "%BACKUP%" (
  copy /Y "%BACKUP%" "%FILE%" >nul
  del /q "%FLAG%" >nul 2>&1
  echo V4 restored automatically because the V4.1 build failed.
  >>"%LOG%" echo V4 restored automatically after build failure.
)
goto :SHOWLOG

:SHOWLOG
echo.
echo ================= LAST LOG LINES =================
powershell.exe -NoProfile -Command "if(Test-Path '%CD%\%LOG%'){Get-Content -LiteralPath '%CD%\%LOG%' -Tail 18}"
echo ==================================================
echo.
echo Opening the exact install/build log...
start "" notepad.exe "%CD%\%LOG%"
goto :FAIL

:FAIL
echo.
echo V4.1 was NOT pushed to production.
echo Send me a screenshot of the LAST error lines in:
echo %LOG%
pause
exit /b 1

###GVS_PS1_PAYLOAD###
$ErrorActionPreference = "Stop"
$repo = (Get-Location).Path
$file = Join-Path $repo "components\admin-v5\PartnerTools.tsx"
$flag = Join-Path $repo ".gvs_v41_patched"

if (!(Test-Path $file)) { throw "PartnerTools.tsx not found: $file" }

$src = [System.IO.File]::ReadAllText($file)
$src = $src.Replace("`r`n","`n")

if ($src.Contains("Smart Background Switcher") -and $src.Contains("BACKGROUND_PRESETS")) {
    Write-Host "V4.1 patch already present - no source patch needed." -ForegroundColor Yellow
    exit 0
}

$v4Anchors = @(
    'type FormatKey = "a3" | "a4" | "a5" | "carSeat" | "sticker" | "table" | "digital";',
    'function partnerMessage(r:PartnerRow,lang:PosterLang)',
    'function customerMessage(r:PartnerRow,lang:PosterLang)'
)
foreach($anchor in $v4Anchors){
    if(!$src.Contains($anchor)){
        throw "Expected Partner Kit V4 anchor was not found: $anchor"
    }
}
Write-Host "V4 source preflight OK." -ForegroundColor Green

function Replace-Exact([string]$old,[string]$new,[string]$label) {
    $old = $old.Replace("`r`n","`n")
    $new = $new.Replace("`r`n","`n")
    if (-not $script:src.Contains($old)) {
        throw "Patch point not found: $label"
    }
    $script:src = $script:src.Replace($old,$new)
    Write-Host "  OK  $label" -ForegroundColor Green
}

# 1) Background types + curated preset library
$old = 'type FormatKey = "a3" | "a4" | "a5" | "carSeat" | "sticker" | "table" | "digital";'
$new = @'
type FormatKey = "a3" | "a4" | "a5" | "carSeat" | "sticker" | "table" | "digital";
type BackgroundKey = "danang-dragon" | "danang-beach" | "hoian-lantern" | "hue-heritage" | "phuquoc-island" | "phuquoc-sunset" | "global" | "vietnam-general" | "custom";
type BackgroundFit = "cover" | "contain";
type BackgroundFocus = "left" | "center" | "right" | "top" | "bottom";
type OverlayLevel = "soft" | "medium" | "strong";

type BackgroundPreset = {
  key:BackgroundKey; label:string; short:string; src:string;
  focus:BackgroundFocus; fit:BackgroundFit; overlay:OverlayLevel;
};

const BACKGROUND_PRESETS:BackgroundPreset[] = [
  {key:"danang-dragon",label:"Đà Nẵng / Dragon Bridge",short:"Dragon",src:"/partner-assets/hero-danang-pavel-standard.jpg",focus:"center",fit:"cover",overlay:"medium"},
  {key:"danang-beach",label:"Đà Nẵng / Beach",short:"Beach",src:"https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=2400&q=88",focus:"center",fit:"cover",overlay:"medium"},
  {key:"hoian-lantern",label:"Hội An / Lantern Town",short:"Hội An",src:"/hero-hoian-new.png",focus:"center",fit:"cover",overlay:"medium"},
  {key:"hue-heritage",label:"Huế / Heritage",short:"Huế",src:"https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2400&q=88",focus:"center",fit:"cover",overlay:"medium"},
  {key:"phuquoc-island",label:"Phú Quốc / Island",short:"PQ Island",src:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=90",focus:"center",fit:"cover",overlay:"soft"},
  {key:"phuquoc-sunset",label:"Phú Quốc / Sunset",short:"PQ Sunset",src:"https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=2400&q=90",focus:"center",fit:"cover",overlay:"medium"},
  {key:"global",label:"Global / International",short:"Global",src:"https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2400&q=88",focus:"right",fit:"cover",overlay:"medium"},
  {key:"vietnam-general",label:"Vietnam / General",short:"Vietnam",src:"https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=2400&q=88",focus:"center",fit:"cover",overlay:"medium"}
];

function preserveAspect(fit:BackgroundFit,focus:BackgroundFocus){
  const align=focus==="left"?"xMinYMid":focus==="right"?"xMaxYMid":focus==="top"?"xMidYMin":focus==="bottom"?"xMidYMax":"xMidYMid";
  return `${align} ${fit==="contain"?"meet":"slice"}`;
}
function overlayOpacity(level:OverlayLevel){
  return level==="soft"?.08:level==="strong"?.34:.18;
}
'@
Replace-Exact $old $new "background types + preset library"

# 2) Portrait renderer: preserve aspect ratio + focal point + overlay
$old = 'function portraitSvg(r:PartnerRow,qr:string,lang:PosterLang,hero:string,gvsLogo:string,partnerLogo:string|null){'
$new = 'function portraitSvg(r:PartnerRow,qr:string,lang:PosterLang,hero:string,gvsLogo:string,partnerLogo:string|null,bgFit:BackgroundFit,bgFocus:BackgroundFocus,overlay:OverlayLevel){'
Replace-Exact $old $new "portrait renderer signature"

$old = '    <image href="${hero}" x="0" y="0" width="1240" height="620" preserveAspectRatio="xMidYMid slice"/>'
$new = @'
    <image href="${hero}" x="0" y="0" width="1240" height="620" preserveAspectRatio="${preserveAspect(bgFit,bgFocus)}"/>
    <rect x="0" y="0" width="1240" height="620" fill="${BRAND.navy}" fill-opacity="${overlayOpacity(overlay)}"/>
'@
Replace-Exact $old $new "portrait smart crop"

# 3) Landscape/sticker renderer gets destination image too
$old = 'function landscapeSvg(r:PartnerRow,qr:string,lang:PosterLang,gvsLogo:string,partnerLogo:string|null){'
$new = 'function landscapeSvg(r:PartnerRow,qr:string,lang:PosterLang,hero:string,gvsLogo:string,partnerLogo:string|null,bgFit:BackgroundFit,bgFocus:BackgroundFocus,overlay:OverlayLevel){'
Replace-Exact $old $new "landscape renderer signature"

$old = @'
  <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="530" viewBox="0 0 1600 530">
    <rect width="1600" height="530" rx="26" fill="${BRAND.navy}"/>
'@
$new = @'
  <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="530" viewBox="0 0 1600 530">
    <image href="${hero}" x="0" y="0" width="1600" height="530" preserveAspectRatio="${preserveAspect(bgFit,bgFocus)}"/>
    <rect width="1600" height="530" rx="26" fill="${BRAND.navy}" fill-opacity="${Math.min(.92,overlayOpacity(overlay)+.62)}"/>
'@
Replace-Exact $old $new "sticker destination background"

# 4) Digital renderer
$old = 'function digitalSvg(r:PartnerRow,qr:string,lang:PosterLang,hero:string,gvsLogo:string,partnerLogo:string|null){'
$new = 'function digitalSvg(r:PartnerRow,qr:string,lang:PosterLang,hero:string,gvsLogo:string,partnerLogo:string|null,bgFit:BackgroundFit,bgFocus:BackgroundFocus,overlay:OverlayLevel){'
Replace-Exact $old $new "digital renderer signature"

$old = '    <image href="${hero}" x="0" y="0" width="1080" height="560" preserveAspectRatio="xMidYMid slice"/><rect width="1080" height="560" fill="url(#d)"/>'
$new = '    <image href="${hero}" x="0" y="0" width="1080" height="560" preserveAspectRatio="${preserveAspect(bgFit,bgFocus)}"/><rect width="1080" height="560" fill="${BRAND.navy}" fill-opacity="${overlayOpacity(overlay)}"/><rect width="1080" height="560" fill="url(#d)"/>'
Replace-Exact $old $new "digital smart crop"

# 5) Build pipeline passes background settings through every format
$old = 'function buildSvg(r:PartnerRow,qr:string,lang:PosterLang,format:FormatKey,hero:string,gvsLogo:string,partnerLogo:string|null){'
$new = 'function buildSvg(r:PartnerRow,qr:string,lang:PosterLang,format:FormatKey,hero:string,gvsLogo:string,partnerLogo:string|null,bgFit:BackgroundFit,bgFocus:BackgroundFocus,overlay:OverlayLevel){'
Replace-Exact $old $new "buildSvg signature"

$old = @'
  if(p.family==="landscape")return landscapeSvg(r,qr,lang,gvsLogo,partnerLogo);
  if(p.family==="digital")return digitalSvg(r,qr,lang,hero,gvsLogo,partnerLogo);
  return portraitSvg(r,qr,lang,hero,gvsLogo,partnerLogo);
'@
$new = @'
  if(p.family==="landscape")return landscapeSvg(r,qr,lang,hero,gvsLogo,partnerLogo,bgFit,bgFocus,overlay);
  if(p.family==="digital")return digitalSvg(r,qr,lang,hero,gvsLogo,partnerLogo,bgFit,bgFocus,overlay);
  return portraitSvg(r,qr,lang,hero,gvsLogo,partnerLogo,bgFit,bgFocus,overlay);
'@
Replace-Exact $old $new "buildSvg routing"

$old = 'async function buildArtwork(r:PartnerRow,qr:string,lang:PosterLang,format:FormatKey,partnerLogo:string|null,heroOverride:string|null,full=false){'
$new = 'async function buildArtwork(r:PartnerRow,qr:string,lang:PosterLang,format:FormatKey,partnerLogo:string|null,heroOverride:string|null,full=false,bgFit:BackgroundFit="cover",bgFocus:BackgroundFocus="center",overlay:OverlayLevel="medium"){'
Replace-Exact $old $new "buildArtwork signature"

$old = '  const svg=buildSvg(r,qr,lang,format,hero,gvsLogo,partnerLogo);'
$new = '  const svg=buildSvg(r,qr,lang,format,hero,gvsLogo,partnerLogo,bgFit,bgFocus,overlay);'
Replace-Exact $old $new "buildArtwork background routing"

# 6) Modal state carries selected preset and controls
$old = '  const [kitModal,setKitModal]=useState<{row:PartnerRow;qr:string;lang:PosterLang;format:FormatKey;png:string;svg:string;partnerLogo:string|null;heroOverride:string|null}|null>(null);'
$new = '  const [kitModal,setKitModal]=useState<{row:PartnerRow;qr:string;lang:PosterLang;format:FormatKey;png:string;svg:string;partnerLogo:string|null;heroOverride:string|null;backgroundKey:BackgroundKey;bgFit:BackgroundFit;bgFocus:BackgroundFocus;overlay:OverlayLevel}|null>(null);'
Replace-Exact $old $new "kit modal state"

$old = '  async function openKit(row:PartnerRow,qr:string,lang:PosterLang,format:FormatKey="a4",partnerLogo:string|null=null,heroOverride:string|null=null){'
$new = '  async function openKit(row:PartnerRow,qr:string,lang:PosterLang,format:FormatKey="a4",partnerLogo:string|null=null,heroOverride:string|null=null,backgroundKey:BackgroundKey="danang-dragon",bgFit:BackgroundFit="cover",bgFocus:BackgroundFocus="center",overlay:OverlayLevel="medium"){'
Replace-Exact $old $new "openKit signature"

$old = @'
      const art=await buildArtwork(row,qr,lang,format,partnerLogo,heroOverride,false);
      setKitModal({row,qr,lang,format,png:art.png,svg:art.svg,partnerLogo,heroOverride});
'@
$new = @'
      const art=await buildArtwork(row,qr,lang,format,partnerLogo,heroOverride,false,bgFit,bgFocus,overlay);
      setKitModal({row,qr,lang,format,png:art.png,svg:art.svg,partnerLogo,heroOverride,backgroundKey,bgFit,bgFocus,overlay});
'@
Replace-Exact $old $new "openKit artwork state"

$old = '  async function switchKit(next:{lang?:PosterLang;format?:FormatKey;partnerLogo?:string|null;heroOverride?:string|null}){'
$new = '  async function switchKit(next:{lang?:PosterLang;format?:FormatKey;partnerLogo?:string|null;heroOverride?:string|null;backgroundKey?:BackgroundKey;bgFit?:BackgroundFit;bgFocus?:BackgroundFocus;overlay?:OverlayLevel}){'
Replace-Exact $old $new "switchKit signature"

$old = @'
    const hero=Object.prototype.hasOwnProperty.call(next,"heroOverride")?next.heroOverride!:kitModal.heroOverride;
    await openKit(kitModal.row,kitModal.qr,lang,format,logo,hero);
'@
$new = @'
    const hero=Object.prototype.hasOwnProperty.call(next,"heroOverride")?next.heroOverride!:kitModal.heroOverride;
    const backgroundKey=next.backgroundKey??kitModal.backgroundKey;
    const bgFit=next.bgFit??kitModal.bgFit;
    const bgFocus=next.bgFocus??kitModal.bgFocus;
    const overlay=next.overlay??kitModal.overlay;
    await openKit(kitModal.row,kitModal.qr,lang,format,logo,hero,backgroundKey,bgFit,bgFocus,overlay);
'@
Replace-Exact $old $new "switchKit background state"

$old = @'
  async function changeHero(file:File|null){
    if(!kitModal)return;const data=file?await fileAsDataUrl(file):null;await switchKit({heroOverride:data});
  }
'@
$new = @'
  async function changeHero(file:File|null){
    if(!kitModal)return;
    const data=file?await fileAsDataUrl(file):null;
    await switchKit({heroOverride:data,backgroundKey:file?"custom":"danang-dragon",bgFit:"cover",bgFocus:"center",overlay:"medium"});
  }
  async function changePreset(key:BackgroundKey){
    if(!kitModal||key==="custom")return;
    const preset=BACKGROUND_PRESETS.find(p=>p.key===key);if(!preset)return;
    setWorking("background");setError("");
    try{
      const data=await fetchAsDataUrl(preset.src);
      await openKit(kitModal.row,kitModal.qr,kitModal.lang,kitModal.format,kitModal.partnerLogo,data,preset.key,preset.fit,preset.focus,preset.overlay);
    }catch(e:any){
      setError(e?.message||"Không tải được ảnh nền preset. Hãy thử preset khác hoặc upload ảnh riêng.");
    }finally{setWorking("")}
  }
'@
Replace-Exact $old $new "preset/custom background handlers"

$old = '      const art=await buildArtwork(kitModal.row,kitModal.qr,kitModal.lang,kitModal.format,kitModal.partnerLogo,kitModal.heroOverride,true);'
$new = '      const art=await buildArtwork(kitModal.row,kitModal.qr,kitModal.lang,kitModal.format,kitModal.partnerLogo,kitModal.heroOverride,true,kitModal.bgFit,kitModal.bgFocus,kitModal.overlay);'
Replace-Exact $old $new "full PNG uses smart crop"

# 7) Versioned export names
$script:src = $script:src.Replace('_V4.png`','_V4_1.png`')
$script:src = $script:src.Replace('_V4.svg`','_V4_1.svg`')
$script:src = $script:src.Replace('PARTNER KIT V4</text>','PARTNER KIT V4.1</text>')

# 8) Background upload button and preset switcher UI
$old = @'
          <label className="gva-btn secondary" style={{cursor:"pointer"}}>Ảnh nền / Destination<input type="file" accept="image/*" style={{display:"none"}} onChange={e=>changeHero(e.target.files?.[0]||null)}/></label>
          {kitModal.heroOverride&&<button className="gva-btn secondary" onClick={()=>switchKit({heroOverride:null})}>Về ảnh mặc định</button>}
'@
$new = @'
          <label className="gva-btn secondary" style={{cursor:"pointer",minHeight:44,display:"inline-flex",alignItems:"center"}}>Upload ảnh riêng<input type="file" accept="image/*" style={{display:"none"}} onChange={e=>changeHero(e.target.files?.[0]||null)}/></label>
'@
Replace-Exact $old $new "custom background upload UI"

$old = '        <div style={{display:"flex",gap:7,flexWrap:"wrap",marginTop:10}}>'
$new = @'
        <div style={{marginTop:12,padding:"12px 0",borderTop:"1px solid #e4ebf3"}}>
          <div style={{display:"flex",justifyContent:"space-between",gap:10,alignItems:"center",marginBottom:8}}>
            <div><b>Smart Background Switcher</b><div className="gva-mini">Chạm để đổi destination • ảnh luôn giữ đúng tỷ lệ</div></div>
            <span className="gva-pill">{kitModal.backgroundKey==="custom"?"Custom":BACKGROUND_PRESETS.find(p=>p.key===kitModal.backgroundKey)?.short||"Background"}</span>
          </div>
          <div style={{display:"flex",gap:10,overflowX:"auto",padding:"2px 2px 8px",WebkitOverflowScrolling:"touch"}}>
            {BACKGROUND_PRESETS.map(p=><button type="button" key={p.key} onClick={()=>changePreset(p.key)} style={{minWidth:122,width:122,border:kitModal.backgroundKey===p.key?"3px solid #1d65b8":"1px solid #d8e2ee",background:"#fff",borderRadius:14,padding:6,cursor:"pointer",textAlign:"left",flex:"0 0 auto"}}>
              <img src={p.src} alt={p.label} loading="lazy" style={{width:"100%",height:70,objectFit:"cover",borderRadius:10,display:"block",background:"#e9eef5"}}/>
              <div style={{fontSize:12,fontWeight:800,color:"#10233d",marginTop:6,lineHeight:1.2}}>{p.short}</div>
            </button>)}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:10,marginTop:8}}>
            <div><div className="gva-mini" style={{fontWeight:800,marginBottom:5}}>Fit</div><div style={{display:"flex",gap:6}}>{(["cover","contain"] as BackgroundFit[]).map(v=><button type="button" key={v} className={kitModal.bgFit===v?"gva-btn":"gva-btn secondary"} style={{minHeight:44,flex:1}} onClick={()=>switchKit({bgFit:v})}>{v==="cover"?"Cover":"Contain"}</button>)}</div></div>
            <div><div className="gva-mini" style={{fontWeight:800,marginBottom:5}}>Focus</div><div style={{display:"flex",gap:5,overflowX:"auto"}}>{(["left","center","right","top","bottom"] as BackgroundFocus[]).map(v=><button type="button" key={v} className={kitModal.bgFocus===v?"gva-btn":"gva-btn secondary"} style={{minHeight:44,minWidth:58,padding:"7px 9px"}} onClick={()=>switchKit({bgFocus:v})}>{v==="left"?"Trái":v==="right"?"Phải":v==="top"?"Trên":v==="bottom"?"Dưới":"Giữa"}</button>)}</div></div>
            <div><div className="gva-mini" style={{fontWeight:800,marginBottom:5}}>Overlay</div><div style={{display:"flex",gap:6}}>{(["soft","medium","strong"] as OverlayLevel[]).map(v=><button type="button" key={v} className={kitModal.overlay===v?"gva-btn":"gva-btn secondary"} style={{minHeight:44,flex:1,padding:"7px 8px"}} onClick={()=>switchKit({overlay:v})}>{v==="soft"?"Nhẹ":v==="strong"?"Đậm":"Vừa"}</button>)}</div></div>
          </div>
        </div>
        <div style={{display:"flex",gap:7,flexWrap:"nowrap",overflowX:"auto",marginTop:10,paddingBottom:4,WebkitOverflowScrolling:"touch"}}>
'@
# This pattern occurs first in modal format row after the background controls in current V4.
Replace-Exact $old $new "mobile preset + format controls"

# 9) Mobile-friendly modal viewport + sticky action bar
$old = '      <div onClick={e=>e.stopPropagation()} style={{width:"min(980px,98vw)",background:"#fff",borderRadius:18,padding:16}}>'
$new = '      <div onClick={e=>e.stopPropagation()} style={{width:"min(980px,100%)",maxHeight:"94vh",overflow:"auto",background:"#fff",borderRadius:18,padding:"clamp(10px,2.5vw,16px)"}}>'
Replace-Exact $old $new "mobile modal viewport"

$old = '          <div><h2 style={{margin:0}}>Universal Partner Kit V4 — {kitModal.row.partner_name}</h2><div className="gva-mini">Một QR • print-safe • typography mới • logo thật • co giãn theo mọi bề mặt</div></div>'
$new = '          <div><h2 style={{margin:0}}>Universal Partner Kit V4.1 — {kitModal.row.partner_name}</h2><div className="gva-mini">Smart Background Switcher • mobile-first • một QR • mọi bề mặt</div></div>'
Replace-Exact $old $new "V4.1 modal title"

$old = '        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:12}}>'
$new = '        <div style={{display:"flex",gap:8,flexWrap:"nowrap",overflowX:"auto",marginTop:12,paddingBottom:4,WebkitOverflowScrolling:"touch"}}>'
# replace only first occurrence after V4.1 title using split
$idx = $script:src.IndexOf('Universal Partner Kit V4.1 —')
if($idx -lt 0){ throw "Could not locate V4.1 modal for language tabs" }
$tail = $script:src.Substring($idx)
$local = $tail.IndexOf($old)
if($local -lt 0){ throw "Could not locate language tab row" }
$abs = $idx + $local
$script:src = $script:src.Substring(0,$abs) + $new + $script:src.Substring($abs+$old.Length)
Write-Host "  OK  mobile language tabs" -ForegroundColor Green

$old = '        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:12}}>'
$new = '        <div style={{display:"flex",gap:8,flexWrap:"wrap",position:"sticky",bottom:0,zIndex:5,background:"rgba(255,255,255,.97)",borderTop:"1px solid #dfe7f0",padding:"10px 0 4px",marginTop:12}}>'
# replace the action bar after preview only
$idx = $script:src.IndexOf('alt="Partner Kit V4"')
if($idx -lt 0){ throw "Could not locate V4 preview for sticky actions" }
$tail = $script:src.Substring($idx)
$local = $tail.IndexOf($old)
if($local -lt 0){ throw "Could not locate action bar" }
$abs = $idx + $local
$script:src = $script:src.Substring(0,$abs) + $new + $script:src.Substring($abs+$old.Length)
Write-Host "  OK  sticky mobile action bar" -ForegroundColor Green

# 10) Version labels throughout relevant UI/messages
$script:src = $script:src.Replace("Universal Display Kit V4.","Universal Display Kit V4.1.")
$script:src = $script:src.Replace("Universal Kit V4.","Universal Kit V4.1.")
$script:src = $script:src.Replace("Partner Kit V4 is ready","Partner Kit V4.1 is ready")
$script:src = $script:src.Replace("Partner Kit V4 của bạn","Partner Kit V4.1 của bạn")
$script:src = $script:src.Replace("Partner Kit V4 готов","Partner Kit V4.1 готов")
$script:src = $script:src.Replace(">Kit V4<",">Kit V4.1<")
$script:src = $script:src.Replace(">Mở Kit V4<",">Mở Kit V4.1<")
$script:src = $script:src.Replace("V4 • một QR","V4.1 • Smart Background • một QR")
$script:src = $script:src.Replace('alt="Partner Kit V4"','alt="Partner Kit V4.1"')
$script:src = $script:src.Replace('Partner Kit V4."','Partner Kit V4.1."')

# Marker for idempotency + future maintenance
$script:src = $script:src.Replace('"use client";','"use client";' + "`r`n// GOVIETSTAY UNIVERSAL PARTNER KIT V4.1 - Smart Background Switcher / Mobile First")

[System.IO.File]::WriteAllText($file,$script:src,(New-Object System.Text.UTF8Encoding($false)))
New-Item -ItemType File -Path $flag -Force | Out-Null
Write-Host ""
Write-Host "Universal Partner Kit V4.1 source patch completed." -ForegroundColor Cyan
