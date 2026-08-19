[CmdletBinding()]
param(
  [string]$Version = "1.0.0",
  [string]$OutputDirectory = ""
)

$ErrorActionPreference = "Stop"
if ([Environment]::OSVersion.Platform -ne [PlatformID]::Win32NT) {
  throw "This release script must run on Windows."
}
if ($Version -notmatch '^\d+\.\d+\.\d+$') {
  throw "Version must use numeric major.minor.patch format."
}

$repo = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$output = if ($OutputDirectory) { [IO.Path]::GetFullPath($OutputDirectory) } else { Join-Path $repo "releases" }
$stage = Join-Path $output "DeepSeek-Harness-Ultimate-Windows"
New-Item -ItemType Directory -Force -Path $output | Out-Null
if (Test-Path -LiteralPath $stage) { Remove-Item -LiteralPath $stage -Recurse -Force }
New-Item -ItemType Directory -Force -Path $stage | Out-Null

$node = Get-Command node.exe -ErrorAction SilentlyContinue
if ($null -eq $node) { throw "Node.js 22 or newer is required to verify the release." }
& $node.Source (Join-Path $repo "scripts\audit-manifest.mjs")
if ($LASTEXITCODE -ne 0) { throw "Manifest audit failed." }
& $node.Source (Join-Path $repo "scripts\audit-installed-profile.mjs") --help | Out-Null

$files = @(
  "COMPONENTS.md", "EXCLUDED_COMPONENTS.md", "LICENSE", "LICENSE.zh-CN", "NOTICE",
  "README.md", "README.zh-CN.md", "TUTORIAL.md", "TUTORIAL.zh-CN.md", "UPSTREAM.md",
  "package.json", "package-lock.json"
)
foreach ($file in $files) { Copy-Item -LiteralPath (Join-Path $repo $file) -Destination (Join-Path $stage $file) -Force }
foreach ($directory in @("profile", "scripts", "tests")) {
  Copy-Item -LiteralPath (Join-Path $repo $directory) -Destination (Join-Path $stage $directory) -Recurse -Force
}
New-Item -ItemType Directory -Force -Path (Join-Path $stage "windows") | Out-Null
Get-ChildItem -LiteralPath $PSScriptRoot -File | Where-Object { $_.Name -notmatch '^README.*\.md$' } |
  Copy-Item -Destination (Join-Path $stage "windows") -Force
Get-ChildItem -LiteralPath $PSScriptRoot -Filter "README*.md" -File |
  Copy-Item -Destination (Join-Path $stage "windows") -Force

$zip = Join-Path $output "DeepSeek-Harness-Ultimate-Windows-x64-v$Version.zip"
if (Test-Path -LiteralPath $zip) { Remove-Item -LiteralPath $zip -Force }
Compress-Archive -Path (Join-Path $stage "*") -DestinationPath $zip -CompressionLevel Optimal

$zipCheck = Join-Path $env:TEMP ("dsh-ultimate-zip-" + [guid]::NewGuid().ToString("N"))
try {
  Expand-Archive -LiteralPath $zip -DestinationPath $zipCheck
  foreach ($required in @(
    "windows\install-ultimate.ps1",
    "windows\install-ultimate.cmd",
    "profile\manifest.json",
    "README.md",
    "README.zh-CN.md",
    "LICENSE"
  )) {
    if (-not (Test-Path -LiteralPath (Join-Path $zipCheck $required))) {
      throw "The portable archive is missing $required."
    }
  }
  $guideCount = @(Get-ChildItem -LiteralPath (Join-Path $zipCheck "windows") -Filter "README*.md" -File).Count
  if ($guideCount -lt 12) { throw "Portable ZIP contains only $guideCount language guides; expected at least 12." }
} finally {
  if (Test-Path -LiteralPath $zipCheck) { Remove-Item -LiteralPath $zipCheck -Recurse -Force }
}

$makensis = Get-Command makensis.exe -ErrorAction SilentlyContinue
if ($null -eq $makensis) {
  $candidates = @(
    (Join-Path ${env:ProgramFiles(x86)} "NSIS\makensis.exe"),
    (Join-Path $env:ProgramFiles "NSIS\makensis.exe")
  ) | Where-Object { $_ -and (Test-Path -LiteralPath $_) }
  if ($candidates.Count -gt 0) { $makensis = Get-Command $candidates[0] }
}
if ($null -eq $makensis) { throw "NSIS is required to build the installer. Install NSIS first." }

$installer = Join-Path $output "DeepSeek-Harness-Ultimate-Setup-v$Version-x64.exe"
if (Test-Path -LiteralPath $installer) { Remove-Item -LiteralPath $installer -Force }
& $makensis.Source "/DVERSION=$Version" "/DSTAGE_DIR=$stage" "/DOUT_FILE=$installer" (Join-Path $PSScriptRoot "installer.nsi")
if (-not (Test-Path -LiteralPath $installer -PathType Leaf)) { throw "NSIS installer was not produced." }

$hashFile = Join-Path $output "DeepSeek-Harness-Ultimate-Windows-x64-v$Version.sha256"
@($zip, $installer) | ForEach-Object {
  "{0}  {1}" -f (Get-FileHash -Algorithm SHA256 -LiteralPath $_).Hash.ToLowerInvariant(), ([IO.Path]::GetFileName($_))
} | Set-Content -LiteralPath $hashFile -Encoding ascii

Remove-Item -LiteralPath $stage -Recurse -Force

Write-Host "Built Windows artifacts:"
Write-Host "  $zip"
Write-Host "  $installer"
Write-Host "  $hashFile"
