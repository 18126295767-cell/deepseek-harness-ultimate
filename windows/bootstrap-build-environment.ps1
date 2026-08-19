[CmdletBinding()]
param(
  [switch]$SkipRuntime
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

if ([Environment]::OSVersion.Platform -ne [PlatformID]::Win32NT) {
  throw "This bootstrap script must run on Windows 10 or Windows 11."
}
if (-not (Get-Command winget.exe -ErrorAction SilentlyContinue)) {
  throw "winget is required. Install App Installer from the Microsoft Store first."
}

function Install-WingetPackage {
  param([Parameter(Mandatory = $true)][string]$Id)
  $installed = winget list --id $Id --exact --accept-source-agreements 2>$null
  if (-not ($installed | Select-String -SimpleMatch $Id)) {
    winget install --id $Id --exact --source winget --accept-source-agreements --accept-package-agreements
    if ($LASTEXITCODE -ne 0) { throw "winget failed to install $Id with exit code $LASTEXITCODE." }
  }
}

Install-WingetPackage "Git.Git"
Install-WingetPackage "OpenJS.NodeJS.LTS"
Install-WingetPackage "NSIS.NSIS"

$node = Get-Command node.exe -ErrorAction SilentlyContinue
if ($null -eq $node) { throw "Node.js was installed but is not visible in this PowerShell session. Reopen PowerShell." }
$version = (& $node.Source --version).Trim()
if ($version -notmatch '^v(\d+)\.' -or [int]$Matches[1] -lt 22) {
  throw "Node.js 22 or newer is required; found $version."
}

$nsisCandidates = @(
  (Join-Path ${env:ProgramFiles(x86)} "NSIS\makensis.exe"),
  (Join-Path $env:ProgramFiles "NSIS\makensis.exe")
) | Where-Object { $_ -and (Test-Path -LiteralPath $_) }
if ($nsisCandidates.Count -eq 0) { throw "NSIS installation did not provide makensis.exe." }

if (-not $SkipRuntime) {
  $runtime = Join-Path $env:USERPROFILE "dsh-runtime"
  New-Item -ItemType Directory -Force -Path $runtime | Out-Null
  Push-Location $runtime
  try {
    if (-not (Test-Path -LiteralPath "package.json")) { npm init -y | Out-Host }
    npm install --save-exact @deepseek-ai/dsh@0.1.0-rc.7 | Out-Host
    if ($LASTEXITCODE -ne 0) { throw "npm failed to install the official DSH runtime." }
  } finally {
    Pop-Location
  }
  if (-not (Test-Path -LiteralPath (Join-Path $runtime "node_modules\@deepseek-ai\dsh\lib\bin.js") -PathType Leaf)) {
    throw "The official DSH runtime was not installed at $runtime."
  }
}

Write-Host "Windows environment is ready for DeepSeek Harness Ultimate."
Write-Host "Node.js: $version"
Write-Host "NSIS: $($nsisCandidates[0])"
if (-not $SkipRuntime) { Write-Host "DSH runtime: $runtime" }
