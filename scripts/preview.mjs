/**
 * Serves the static export the way GitHub Pages does: `out/` mounted under
 * NEXT_PUBLIC_BASE_PATH, directory indexes, and `404.html` for unknown URLs.
 *
 *   NEXT_PUBLIC_BASE_PATH=/portfolio npm run build && npm run preview
 */
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

/** `--base /portfolio --port 3210` override the environment for one-off runs. */
function flag(name, fallback) {
  const index = process.argv.indexOf(`--${name}`);
  return index !== -1 && process.argv[index + 1] !== undefined
    ? process.argv[index + 1]
    : fallback;
}

const basePath = flag("base", process.env.NEXT_PUBLIC_BASE_PATH ?? "");
const port = Number(flag("port", process.env.PORT ?? 3210));
const root = join(process.cwd(), "out");

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".woff2": "font/woff2",
};

function send(res, status, file) {
  res.writeHead(status, {
    "content-type": types[extname(file)] ?? "application/octet-stream",
  });
  createReadStream(file).pipe(res);
}

function resolve(urlPath) {
  const safe = normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, "");
  const candidates = [
    join(root, safe),
    join(root, safe, "index.html"),
    join(root, `${safe}.html`),
  ];
  return candidates.find((file) => existsSync(file) && statSync(file).isFile());
}

createServer((req, res) => {
  const { pathname } = new URL(req.url ?? "/", `http://${req.headers.host}`);

  if (basePath && !pathname.startsWith(basePath)) {
    if (pathname === "/") {
      res.writeHead(302, { location: `${basePath}/` });
      return res.end();
    }
    return send(res, 404, join(root, "404.html"));
  }

  const file = resolve(pathname.slice(basePath.length) || "/");
  if (file) return send(res, 200, file);
  return send(res, 404, join(root, "404.html"));
}).listen(port, () => {
  console.log(`Preview: http://localhost:${port}${basePath}/`);
});
