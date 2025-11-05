const fs = require('fs');
const path = require('path');

const ROOT = process.cwd().replace(/\\/g, '/');
const BUILD = path.join(ROOT, 'build').replace(/\\/g, '/');

function listFiles(dir, pred) {
  const out = [];
  (function rec(d) {
    if (!fs.existsSync(d)) return;
    for (const name of fs.readdirSync(d)) {
      const p = path.join(d, name);
      const st = fs.statSync(p);
      if (st.isDirectory()) rec(p);
      else if (!pred || pred(p)) out.push(p.replace(/\\/g, '/'));
    }
  })(dir);
  return out;
}

function normalizeToSrc(p) {
  // Try to locate 'src/' in the path and return from there
  const posix = p.replace(/\\/g, '/');
  const i = posix.indexOf('/src/');
  if (i >= 0) return posix.slice(i + 1); // drop leading slash to make 'src/...'
  if (posix.startsWith('src/')) return posix;
  return null;
}

const mapFiles = listFiles(BUILD, (p) => p.endsWith('.map'));
const bundled = new Set();

for (const mf of mapFiles) {
  try {
    const json = JSON.parse(fs.readFileSync(mf, 'utf8'));
    const sources = Array.isArray(json.sources) ? json.sources : [];
    for (let s of sources) {
      if (typeof s !== 'string') continue;
      // Resolve relative to map file location
      const baseDir = path.dirname(mf);
      let resolved = s;
      if (s.startsWith('../') || s.startsWith('./')) {
        resolved = path.resolve(baseDir, s).replace(/\\/g, '/');
      }
      const norm = normalizeToSrc(resolved);
      if (norm) bundled.add(norm);
    }
  } catch {}
}

// Now list all src files in the project
const exts = new Set(['.tsx', '.ts', '.jsx', '.js', '.css', '.scss']);
const allSrc = listFiles(path.join(ROOT, 'src'), (p) => exts.has(path.extname(p)));
const allNorm = allSrc.map((p) => p.replace(/\\/g, '/').slice(ROOT.length + 1));

const notBundled = allNorm.filter((p) => !bundled.has(p));

// Focus: components not shipped
const notBundledComponents = notBundled.filter((p) => p.startsWith('src/components/') && p.endsWith('.tsx'));

// Write analysis outputs
const outDir = path.join(ROOT, 'analysis');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
fs.writeFileSync(path.join(outDir, 'bundled-sources.txt'), Array.from(bundled).sort().join('\n'));
fs.writeFileSync(path.join(outDir, 'not-bundled.txt'), notBundled.sort().join('\n'));
fs.writeFileSync(path.join(outDir, 'not-bundled-components.txt'), notBundledComponents.sort().join('\n'));

console.log('Bundled sources:', bundled.size);
console.log('All src files:', allNorm.length);
console.log('Not bundled:', notBundled.length);
console.log('Not bundled components:', notBundledComponents.length);

