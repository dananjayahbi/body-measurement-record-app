@echo off
cd /d "%~dp0"
echo Running Next.js Production Server with Portable Node.js...
set PATH=%~dp0\nodejs;%PATH%
node server.js
pause
