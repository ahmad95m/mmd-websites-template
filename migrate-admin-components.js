const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
  let files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });
  return arrayOfFiles;
}

const files = getAllFiles('src/admin/components');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  if (!content.includes('react-router-dom')) return;
  
  console.log(`Fixing ${file}`);
  
  // Analyze requirements
  const hasLink = content.includes('Link');
  const hasUseLocation = content.includes('useLocation');
  const hasUseNavigate = content.includes('useNavigate');
  
  // Strip import
  content = content.replace(/import\s*\{[^}]*\}\s*from\s*['"]react-router-dom['"];?/g, '');
  
  // Add Next imports
  let newImports = '';
  if (hasLink) newImports += `import Link from 'next/link';\n`;
  
  const navImports = [];
  if (hasUseLocation) navImports.push('usePathname');
  if (hasUseNavigate) navImports.push('useRouter');
  
  if (navImports.length > 0) newImports += `import { ${navImports.join(', ')} } from 'next/navigation';\n`;
  
  // Append new imports
  content = `"use client";\n${newImports}` + content.replace('"use client";', '').replace('"use client"', '');
  
  // Replacements
  if (hasLink) content = content.replace(/to=/g, 'href=');
  if (hasUseLocation) {
      content = content.replace(/useLocation/g, 'usePathname');
      content = content.replace(/location\.pathname/g, 'pathname');
      content = content.replace(/const location = usePathname\(\);/g, 'const pathname = usePathname();');
  }
  if (hasUseNavigate) {
      content = content.replace(/useNavigate/g, 'useRouter');
      content = content.replace(/const navigate =/g, 'const router =');
      content = content.replace(/navigate\(/g, 'router.push(');
  }

  fs.writeFileSync(file, content);
});
