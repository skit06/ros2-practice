@echo off
chcp 65001 >nul
title ROS 2 记忆练习站

echo 正在启动 ROS 2 记忆练习站...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-server.ps1"
pause
