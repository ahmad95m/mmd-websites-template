const fs = require('fs');
const path = require('path');

const mapping = {
  'AdminDashboard.tsx': { dest: 'src/app/admin/page.tsx' },
  'AdminLogin.tsx': { dest: 'src/app/admin/login/page.tsx' },
  'PagesEditor.tsx': { dest: 'src/app/admin/pages/page.tsx' },
  'SEOEditor.tsx': { dest: 'src/app/admin/seo/page.tsx' },
  'ThemePage.tsx': { dest: 'src/app/admin/theme/page.tsx' },
  'FormSubmissions.tsx': { dest: 'src/app/admin/submissions/page.tsx' },
  'SettingsPage.tsx': { dest: 'src/app/admin/settings/page.tsx' },
  'ContentEditor.tsx': { dest: 'src/app/admin/edit/[section]/page.tsx' },
};

const srcDir = 'src/admin/pages';
const files = Object.keys(mapping);

files.forEach(file => {
  const config = mapping[file];
  const sourcePath = path.join(srcDir, file);
  
  if (!fs.existsSync(sourcePath)) {
    console.log(`Skipping ${file}, not found.`);
    return;
  }
  
  const destPath = config.dest;
  const destDir = path.dirname(destPath);
  
  fs.mkdirSync(destDir, { recursive: true });
  
  let content = fs.readFileSync(sourcePath, 'utf8');
  
  // Transformations
  if (!content.includes('"use client"')) content = `"use client";\n` + content;
  
  // Imports: Link
  // Handle mixed imports: import { Link, useLocation } ...
  // We'll replace typical react-router-dom imports
  
  // Remove react-router-dom imports entirely and rebuild them
  const hasLink = content.includes('Link');
  const hasUseLocation = content.includes('useLocation');
  const hasUseNavigate = content.includes('useNavigate');
  const hasUseParams = content.includes('useParams');

  // Strip existing router import
  content = content.replace(/import\s*\{[^}]*\}\s*from\s*['"]react-router-dom['"];?/g, '');
  
  // Add Next.js imports
  const nextImports = [];
  const nextNavImports = [];
  
  if (hasLink) nextImports.push("Link"); // default export from next/link
  
  if (hasUseLocation) nextNavImports.push("usePathname");
  if (hasUseNavigate) nextNavImports.push("useRouter");
  if (hasUseParams) nextNavImports.push("useParams"); // useParams works in client components
  
  let newImports = '';
  if (hasLink) newImports += `import Link from 'next/link';\n`;
  if (nextNavImports.length > 0) newImports += `import { ${nextNavImports.join(', ')} } from 'next/navigation';\n`;
  
  // Insert imports after "use client"
  content = content.replace('"use client";', `"use client";\n${newImports}`);
  
  // Logic replacements
  if (hasLink) {
      content = content.replace(/to=/g, 'href=');
      // Fix Link props if needed (to={...} -> href={...})
      // already mostly handled by global replace?
  }
  
  if (hasUseLocation) {
      content = content.replace(/useLocation/g, 'usePathname');
      content = content.replace(/location\.pathname/g, 'pathname'); // usePathname string
      content = content.replace(/const location = usePathname\(\);/g, 'const pathname = usePathname();');
  }
  
  if (hasUseNavigate) {
      content = content.replace(/useNavigate/g, 'useRouter');
      // Variable rename: const navigate = ... -> const router = ...
      content = content.replace(/const\s+navigate\s*=/g, 'const router =');
      // Usage: navigate(...) -> router.push(...)
      // Handle navigate('path') -> router.push('path')
      content = content.replace(/navigate\(/g, 'router.push(');
  }
  
  // Add export default if missing
  const componentName = file.replace('.tsx', '');
  if (!content.includes(`export default ${componentName}`) && !content.includes(`export default function`)) {
       content += `\nexport default ${componentName};\n`;
  }
  
  fs.writeFileSync(destPath, content);
  console.log(`Migrated Admin page ${file} -> ${destPath}`);
});
