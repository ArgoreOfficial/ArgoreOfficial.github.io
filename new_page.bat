@echo off

echo|(set /p="") > new_page.html
echo|(set /p="<!DOCTYPE html>" & echo.) >> new_page.html
echo|(set /p="<html lang="en">" & echo.) >> new_page.html
echo|(set /p="<head>" & echo.) >> new_page.html
echo|(set /p="    <meta charset="UTF-8">" & echo.) >> new_page.html
echo|(set /p="    <link rel="stylesheet" href="./main.css">" & echo.) >> new_page.html
echo|(set /p="    <title> Title </title>" & echo.) >> new_page.html
echo|(set /p="</head>" & echo.) >> new_page.html
echo|(set /p="<body>" & echo.) >> new_page.html
echo|(set /p="</body>" & echo.) >> new_page.html
echo|(set /p="</html>" & echo.) >> new_page.html
