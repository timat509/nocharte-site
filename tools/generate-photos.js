// tools/generate-photos.js
const fs = require("fs");
const path = require("path");

const ALBUMS_DIR = path.join(process.cwd(), "assets", "albums");
const IMG_EXT = new Set([".jpg",".jpeg",".png",".webp",".gif",".JPG",".JPEG",".PNG",".WEBP",".GIF"]);

function listDirs(dir) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(d => d.isDirectory()).map(d => d.name);
}

function makePhotosJS(files) {
  const quoted = files.map(f => `  "${f}"`).join(",\n");
  return `window.PHOTOS = [\n${quoted}\n];\n`;
}

function generateForAlbum(slug) {
  const photosDir = path.join(ALBUMS_DIR, slug, "photos");
  if (!fs.existsSync(photosDir)) return console.warn(`⚠️  Skip ${slug}: no photos/ folder`);
  const files = fs.readdirSync(photosDir, { withFileTypes: true })
    .filter(f => f.isFile() && IMG_EXT.has(path.extname(f.name)))
    .map(f => f.name)
    .sort((a,b) => a.localeCompare(b, undefined, {numeric:true, sensitivity:"base"}));

  const outPath = path.join(ALBUMS_DIR, slug, "photos.js");
  fs.writeFileSync(outPath, makePhotosJS(files), "utf8");
  console.log(`✅ ${slug}: wrote ${files.length} entries → ${path.relative(process.cwd(), outPath)}`);
}

(function run(){
  if (!fs.existsSync(ALBUMS_DIR)) {
    console.error("albums dir not found:", ALBUMS_DIR);
    process.exit(1);
  }
  const albums = listDirs(ALBUMS_DIR);
  if (albums.length === 0) return console.log("No albums found.");
  albums.forEach(generateForAlbum);
})();
