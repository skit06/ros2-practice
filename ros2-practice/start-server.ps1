# ==============================================================================
# ROS 2 记忆练习 - Windows 本地与局域网 HTTP 服务器
# 支持电脑本地与手机局域网 (Wi-Fi) 无需管理员权限访问
# ==============================================================================

$port = 4173
$root = $PSScriptRoot
if (-not $root) { $root = (Get-Location).Path }

# 获取本机局域网 IP 地址
$lanIp = "127.0.0.1"
try {
    $ips = Get-NetIPAddress -AddressFamily IPv4 | Where-Object { 
        $_.InterfaceAlias -notmatch "Loopback|vEthernet|WSL" -and 
        $_.IPAddress -notmatch "^169\.254\." 
    } | Select-Object -ExpandProperty IPAddress
    if ($ips) {
        # 优先选取 192.168.x.x 或 10.x.x.x
        $preferred = $ips | Where-Object { $_ -match "^(192\.168|10\.|172\.(1[6-9]|2[0-9]|3[0-1]))" } | Select-Object -First 1
        if ($preferred) { $lanIp = $preferred } else { $lanIp = $ips[0] }
    }
} catch {}

$mime = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
}

try {
    $listener = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Any, $port)
    $listener.Start()
} catch {
    $port = 4174
    $listener = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Any, $port)
    $listener.Start()
}

$localUrl = "http://127.0.0.1:$port/"
$mobileUrl = "http://$($lanIp):$port/"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  ROS 2 记忆练习站已成功启动！" -ForegroundColor Green
Write-Host "  💻 电脑本地访问: $localUrl" -ForegroundColor Yellow
Write-Host "  📱 手机访问网址: $mobileUrl (需连同一Wi-Fi)" -ForegroundColor Magenta
Write-Host "  --------------------------------------------------------" -ForegroundColor DarkGray
Write-Host "  💡 小提示: 也可以直接把 ros2-mobile.html 发送到手机打开" -ForegroundColor Gray
Write-Host "  按 Ctrl+C 可停止本地服务" -ForegroundColor DarkGray
Write-Host "==========================================================" -ForegroundColor Cyan

# 自动在默认浏览器中打开电脑页面
Start-Process $localUrl

while ($true) {
    try {
        $client = $listener.AcceptTcpClient()
        $stream = $client.GetStream()
        $reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::ASCII)
        $requestLine = $reader.ReadLine()

        if ([string]::IsNullOrWhiteSpace($requestLine)) {
            $client.Close()
            continue
        }

        $parts = $requestLine -split " "
        $rawPath = if ($parts.Length -gt 1) { $parts[1] } else { "/" }
        $urlPath = [System.Uri]::UnescapeDataString(($rawPath -split "\?")[0])

        if ($urlPath -eq "/" -or [string]::IsNullOrWhiteSpace($urlPath)) {
            $urlPath = "/index.html"
        }

        $localPath = [System.IO.Path]::Combine($root, $urlPath.TrimStart('/').Replace('/', [System.IO.Path]::DirectorySeparatorChar))

        if ([System.IO.File]::Exists($localPath)) {
            $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
            $contentType = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { "application/octet-stream" }
            $bytes = [System.IO.File]::ReadAllBytes($localPath)

            $header = "HTTP/1.1 200 OK`r`n" +
                      "Content-Type: $contentType`r`n" +
                      "Content-Length: $($bytes.Length)`r`n" +
                      "Access-Control-Allow-Origin: *`r`n" +
                      "Cache-Control: no-cache, no-store, must-revalidate`r`n" +
                      "Connection: close`r`n`r`n"
            $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
            $stream.Write($headerBytes, 0, $headerBytes.Length)
            $stream.Write($bytes, 0, $bytes.Length)
        } else {
            $notFound = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $header = "HTTP/1.1 404 Not Found`r`n" +
                      "Content-Type: text/plain; charset=utf-8`r`n" +
                      "Content-Length: $($notFound.Length)`r`n" +
                      "Connection: close`r`n`r`n"
            $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
            $stream.Write($headerBytes, 0, $headerBytes.Length)
            $stream.Write($notFound, 0, $notFound.Length)
        }

        $stream.Flush()
        $client.Close()
    } catch {
        # 忽略正常关闭连接时的异常
    }
}
