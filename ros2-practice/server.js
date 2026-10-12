const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const requested = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const filename = path.resolve(root, requested);

  if (!filename.startsWith(root + path.sep) && filename !== path.join(root, 'index.html')) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filename, (error, contents) => {
    if (error) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, {
      'Content-Type': mime[path.extname(filename)] || 'application/octet-stream',
      'Cache-Control': 'no-store'
    });
    res.end(contents);
  });
});

const os = require('node:os');
const port = Number(process.env.PORT) || 4173;

function getLanIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1';
}

server.listen(port, '0.0.0.0', () => {
  const lanIp = getLanIp();
  console.log(`====================================================`);
  console.log(`  ROS 2 记忆练习已启动！`);
  console.log(`  💻 电脑本地访问: http://127.0.0.1:${port}`);
  console.log(`  📱 手机访问网址: http://${lanIp}:${port} (需同一Wi-Fi)`);
  console.log(`  💡 小提示: 也可以直接把 ros2-mobile.html 发送到手机打开`);
  console.log(`  按 Ctrl+C 停止服务`);
  console.log(`====================================================`);
});
