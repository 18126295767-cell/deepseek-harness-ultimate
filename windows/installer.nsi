Unicode true
SetCompressor /SOLID lzma

!ifndef VERSION
  !define VERSION "1.0.0"
!endif
!ifndef STAGE_DIR
  !error "STAGE_DIR is required"
!endif
!ifndef OUT_FILE
  !error "OUT_FILE is required"
!endif

Name "DeepSeek Harness Ultimate"
OutFile "${OUT_FILE}"
InstallDir "$LOCALAPPDATA\DeepSeek Harness Ultimate"
InstallDirRegKey HKCU "Software\DeepSeek Harness Ultimate" "InstallDir"
RequestExecutionLevel user
ShowInstDetails show
ShowUninstDetails show

VIProductVersion "${VERSION}.0"
VIAddVersionKey /LANG=1033 "ProductName" "DeepSeek Harness Ultimate"
VIAddVersionKey /LANG=1033 "FileDescription" "Reproducible DeepSeek Harness profile installer"
VIAddVersionKey /LANG=1033 "FileVersion" "${VERSION}"
VIAddVersionKey /LANG=1033 "ProductVersion" "${VERSION}"

Page directory
Page instfiles
UninstPage uninstConfirm
UninstPage instfiles

Section "DeepSeek Harness Ultimate"
  SetOutPath "$INSTDIR"
  File /r "${STAGE_DIR}\*"
  WriteRegStr HKCU "Software\DeepSeek Harness Ultimate" "InstallDir" "$INSTDIR"
  WriteUninstaller "$INSTDIR\Uninstall.exe"
  CreateDirectory "$SMPROGRAMS\DeepSeek Harness Ultimate"
  CreateShortcut "$SMPROGRAMS\DeepSeek Harness Ultimate\Install Ultimate Profile.lnk" "$INSTDIR\windows\install-ultimate.cmd"
  CreateShortcut "$SMPROGRAMS\DeepSeek Harness Ultimate\Windows Guide.lnk" "$INSTDIR\windows\README.zh-CN.md"
SectionEnd

Section "Uninstall"
  Delete "$SMPROGRAMS\DeepSeek Harness Ultimate\Install Ultimate Profile.lnk"
  Delete "$SMPROGRAMS\DeepSeek Harness Ultimate\Windows Guide.lnk"
  RMDir "$SMPROGRAMS\DeepSeek Harness Ultimate"
  RMDir /r "$INSTDIR"
  DeleteRegKey HKCU "Software\DeepSeek Harness Ultimate"
SectionEnd
