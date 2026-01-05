const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles || [];
  
  let files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    const fullPath = path.join(dirPath, "/", file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        arrayOfFiles.push(fullPath);
      }
    }
  });
  return arrayOfFiles;
}

// Target ALL source files
const files = getAllFiles('src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  // Regex to find imports from assets
  const importRegex = /import\s+(\w+)\s+from\s+['"]@\/assets\/.*\.(jpg|png|webp|jpeg)['"];?/g;
  let match;
  const imageVars = [];
  
  // Reset regex lastIndex just in case
  importRegex.lastIndex = 0;
  
  while ((match = importRegex.exec(content)) !== null) {
      if (match[1]) imageVars.push(match[1]);
  }
  
  if (imageVars.length > 0) {
      imageVars.forEach(imgVar => {
          // 1. src={imgVar} -> src={imgVar.src} (Avoid double replacement if already .src)
          // We check if it is followed by .src, if not, replace.
          const srcRegex = new RegExp(`src={${imgVar}}(?!\\.src)`, 'g');
          if (srcRegex.test(content)) {
            content = content.replace(srcRegex, `src={${imgVar}.src}`);
            changed = true;
          }
          
          // 2. url(${imgVar}) -> url(${imgVar}.src)
          const urlRegex = new RegExp(`url\\(\\$\{${imgVar}\\}(?!\\.src)\\)`, 'g');
          if (urlRegex.test(content)) {
            content = content.replace(urlRegex, `url(\${${imgVar}.src})`);
            changed = true;
          }

          // 3. Object property value:  key: imgVar
          // Look for : imgVar followed by comma, space, closing brace/bracket or new line
          // AND NOT followed by .src
          // Negative lookahead (?!\.src)
          const objRegex = new RegExp(`: ${imgVar}(?!\\.src)([,\\s}\\]])`, 'g');
          if (objRegex.test(content)) {
              content = content.replace(objRegex, `: ${imgVar}.src$1`);
              changed = true;
          }
      });
  }
  
  if (changed) {
      console.log(`Updated images in ${file}`);
      fs.writeFileSync(file, content);
  }
});
