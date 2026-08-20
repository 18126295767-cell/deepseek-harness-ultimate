[CmdletBinding()]
param(
  [string]$ProfileDir = "$env:USERPROFILE\.dsh\profiles\ultimate",
  [string]$RuntimeDir = "",
  [switch]$IncludeOptional,
  [string[]]$Include = @(),
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

if ([Environment]::OSVersion.Platform -ne [PlatformID]::Win32NT) {
  throw "This installer must run on Windows 10 or Windows 11."
}

function Resolve-NodePath {
  $node = Get-Command node.exe -ErrorAction SilentlyContinue
  if ($null -ne $node) { return $node.Source }
  $candidate = @(
    (Join-Path $env:ProgramFiles "nodejs\node.exe"),
    (Join-Path ${env:ProgramFiles(x86)} "nodejs\node.exe")
  ) | Where-Object { $_ -and (Test-Path -LiteralPath $_) } | Select-Object -First 1
  if ($candidate) { return $candidate }
  throw "Node.js 22 or newer was not found. Install Node.js LTS and reopen PowerShell."
}

$node = Resolve-NodePath
$nodeVersion = (& $node --version).Trim()
if ($nodeVersion -notmatch '^v(\d+)\.') {
  throw "Unable to determine the Node.js version from '$nodeVersion'."
}
if ([int]$Matches[1] -lt 22) {
  throw "Node.js 22 or newer is required; found $nodeVersion."
}

$repo = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$manifest = Join-Path $repo "profile\manifest.json"
$installer = Join-Path $repo "scripts\install-ultimate.mjs"
if (-not (Test-Path -LiteralPath $manifest -PathType Leaf) -or
    -not (Test-Path -LiteralPath $installer -PathType Leaf)) {
  throw "The Ultimate package is incomplete. Keep windows, profile, and scripts together."
}

$resolvedProfile = [IO.Path]::GetFullPath($ProfileDir)
$arguments = @($installer, "--profile-dir", $resolvedProfile, "--platform", "windows")
if ($RuntimeDir) { $arguments += @("--runtime-dir", [IO.Path]::GetFullPath($RuntimeDir)) }
if ($IncludeOptional) { $arguments += "--include-optional" }
foreach ($package in $Include) {
  if ([string]::IsNullOrWhiteSpace($package)) { continue }
  $arguments += @("--include", $package)
}
if ($DryRun) { $arguments += "--dry-run" }

Write-Host "DeepSeek Harness Ultimate Windows installer"
Write-Host "Node.js: $nodeVersion"
Write-Host "Profile: $resolvedProfile"
if ($DryRun) { Write-Host "Mode: dry run (no packages will be downloaded)" }

Push-Location $repo
try {
  & $node @arguments
  if ($LASTEXITCODE -ne 0) {
    throw "Ultimate profile installer failed with exit code $LASTEXITCODE."
  }
} finally {
  Pop-Location
}

if (-not $DryRun) {
  $packageJson = Join-Path $resolvedProfile "package.json"
  $componentList = Join-Path $resolvedProfile "COMPONENTS.json"
  if (-not (Test-Path -LiteralPath $packageJson -PathType Leaf) -or
      -not (Test-Path -LiteralPath $componentList -PathType Leaf)) {
    throw "The profile installer completed without producing package.json and COMPONENTS.json."
  }
  Write-Host "Installed profile metadata to $resolvedProfile"
  Write-Host "Provider settings and credentials remain in your local DSH runtime."
}
