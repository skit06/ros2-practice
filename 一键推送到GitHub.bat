@echo off
cd /d "%~dp0"
echo ===================================================
echo Pushing ROS 2 practice platform to GitHub...
echo Repository: https://github.com/skit06/ros2-practice
echo ===================================================
echo.

git push -u origin main

echo.
echo ===================================================
echo Process finished. Please check above for success!
echo ===================================================
pause
