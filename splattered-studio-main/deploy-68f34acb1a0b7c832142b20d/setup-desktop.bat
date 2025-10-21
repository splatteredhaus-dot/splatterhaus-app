@echo off
echo ========================================
echo 🖥️  Setting up Desktop Integration
echo ========================================
echo.
echo This script will:
echo 1. Copy project files to Desktop
echo 2. Create shortcuts for easy access
echo 3. Set up Windows integration
echo.
echo ========================================

REM Create desktop directory for project
set DESKTOP_DIR=%USERPROFILE%\Desktop\SplatteredStudio
if not exist "%DESKTOP_DIR%" mkdir "%DESKTOP_DIR%"

REM Copy essential files to desktop
echo Copying project files to Desktop...
xcopy /E /I /Y "%~dp0*" "%DESKTOP_DIR%\" >nul 2>&1

REM Create desktop shortcuts
echo Creating desktop shortcuts...

REM Create shortcut for starting server
echo Set oWS = WScript.CreateObject("WScript.Shell") > "%DESKTOP_DIR%\StartServer.vbs"
echo sLinkFile = "%USERPROFILE%\Desktop\Splattered Studio - Start Server.lnk" >> "%DESKTOP_DIR%\StartServer.vbs"
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> "%DESKTOP_DIR%\StartServer.vbs"
echo oLink.TargetPath = "%DESKTOP_DIR%\start-server.bat" >> "%DESKTOP_DIR%\StartServer.vbs"
echo oLink.WorkingDirectory = "%DESKTOP_DIR%" >> "%DESKTOP_DIR%\StartServer.vbs"
echo oLink.IconLocation = "cmd.exe,0" >> "%DESKTOP_DIR%\StartServer.vbs"
echo oLink.Description = "Start Splattered Studio Server" >> "%DESKTOP_DIR%\StartServer.vbs"
echo oLink.Save >> "%DESKTOP_DIR%\StartServer.vbs"

REM Create shortcut for opening browser
echo Set oWS = WScript.CreateObject("WScript.Shell") > "%DESKTOP_DIR%\OpenBrowser.vbs"
echo sLinkFile = "%USERPROFILE%\Desktop\Splattered Studio - Open Browser.lnk" >> "%DESKTOP_DIR%\OpenBrowser.vbs"
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> "%DESKTOP_DIR%\OpenBrowser.vbs"
echo oLink.TargetPath = "%DESKTOP_DIR%\open-browser.bat" >> "%DESKTOP_DIR%\OpenBrowser.vbs"
echo oLink.WorkingDirectory = "%DESKTOP_DIR%" >> "%DESKTOP_DIR%\OpenBrowser.vbs"
echo oLink.IconLocation = "chrome.exe,0" >> "%DESKTOP_DIR%\OpenBrowser.vbs"
echo oLink.Description = "Open Splattered Studio Website" >> "%DESKTOP_DIR%\OpenBrowser.vbs"
echo oLink.Save >> "%DESKTOP_DIR%\OpenBrowser.vbs"

REM Run the VBS scripts to create shortcuts
cscript "%DESKTOP_DIR%\StartServer.vbs" >nul 2>&1
cscript "%DESKTOP_DIR%\OpenBrowser.vbs" >nul 2>&1

REM Clean up VBS files
del "%DESKTOP_DIR%\StartServer.vbs" >nul 2>&1
del "%DESKTOP_DIR%\OpenBrowser.vbs" >nul 2>&1

echo.
echo ✅ Desktop integration complete!
echo.
echo Desktop shortcuts created:
echo - "Splattered Studio - Start Server.lnk"
echo - "Splattered Studio - Open Browser.lnk"
echo.
echo Project files copied to: %DESKTOP_DIR%
echo.
echo You can now run the project from your Desktop!
echo.
pause
