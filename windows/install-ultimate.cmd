@echo off
setlocal
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0install-ultimate.ps1" %*
exit /b %ERRORLEVEL%
