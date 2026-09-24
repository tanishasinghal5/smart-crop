import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = process.cwd();
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };
const server = createServer(async (request, response) => {
  const pathname = request.url === '/' ? 'index.html' : decodeURIComponent(request.url).replace(/^\//, '');
  const file = normalize(join(root, pathname));
  if (!file.startsWith(root)) return response.writeHead(403).end('Forbidden');
  try {
    const content = await readFile(file);
    response.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
    response.end(content);
  } catch { response.writeHead(404).end('Not found'); }
});
server.listen(4173, '0.0.0.0', () => console.log('Krishi AI is running at http://localhost:4173'));
