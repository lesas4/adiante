const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'backend', 'src');

function safeNameFromFile(filePath, idx) {
  const base = path.basename(filePath, path.extname(filePath)).replace(/[^a-zA-Z0-9]/g, '_');
  return `${base}_Auto_${idx}`;
}

function walk(dir) {
  const res = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  items.forEach((it) => {
    const p = path.join(dir, it.name);
    if (it.isDirectory()) {
      if (it.name === 'coverage' || it.name === 'dist' || it.name === 'node_modules') return;
      res.push(...walk(p));
    } else if (it.isFile() && p.endsWith('.js')) {
      res.push(p);
    }
  });
  return res;
}

const jsFiles = walk(SRC);

const changed = [];
const ambiguous = [];

jsFiles.forEach((file, idx) => {
  try {
    const rel = path.relative(ROOT, file);
    const content = fs.readFileSync(file, 'utf8');
    if (!content.includes('[REDACTED_TOKEN]')) return;

    const hasDeclaration = /(?:function\s+\[REDACTED_TOKEN\]|const\s+\[REDACTED_TOKEN\]|class\s+\[REDACTED_TOKEN\])/m.test(content);
    const hasModuleExport = /module\.exports\s*=\s*\[REDACTED_TOKEN\]|module\.exports\s*=\s*new\s+\[REDACTED_TOKEN\]\(/m.test(content);
    const requiresOther = /require\([^\)]*\[REDACTED_TOKEN\][^\)]*\)/m.test(content) || /from\s+[^\n]*\[REDACTED_TOKEN\]/m.test(content) || /require\(['"].*\[REDACTED_TOKEN\].*['"]/m.test(content);

    if ((hasDeclaration || hasModuleExport) && !requiresOther) {
      const name = safeNameFromFile(file, idx+1);
      const newContent = content.replace(/\[REDACTED_TOKEN\]/g, name);
      fs.writeFileSync(file + '.bak_auto_replace', content, 'utf8');
      fs.writeFileSync(file, newContent, 'utf8');
      changed.push({ file: rel, name });
    } else {
      ambiguous.push(path.relative(ROOT, file));
    }
  } catch (err) {
    console.error('Error processing', file, err.message);
  }
});

console.log('\nAuto-replace complete. Summary:');
console.log('Changed files:', changed.length);
changed.slice(0,50).forEach(c => console.log(' -', c.file, '=>', c.name));
if (ambiguous.length) {
  console.log('\nAmbiguous files (require manual review):', ambiguous.length);
  ambiguous.slice(0,200).forEach(f => console.log(' -', f));
} else {
  console.log('\nNo ambiguous files detected.');
}

console.log('\nBackups created with suffix .bak_auto_replace in the same folders.');

process.exit(0);
