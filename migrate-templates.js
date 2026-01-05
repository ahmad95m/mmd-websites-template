const fs = require('fs');
const path = require('path');

// Helper to convert filename to route component name
const getComponentName = (file, suffix = '') => {
  const base = file.replace('.tsx', '');
  // Special cases: Index2 -> HomePage2? No, Index2 -> Template2Home
  if (base === 'Index') return `HomePage${suffix}`;
  if (base === 'Index2') return `Template2HomePage`;
  if (base === 'Index3') return `Template3HomePage`;
  return `${base.replace(/\d+$/, '')}${suffix}Page`; // About2 -> AboutPage (Conflict? No, About2Page)
};

// Configuration
// We'll scan directories dynamically for templates
const inputs = [
  { 
    srcDir: 'src/templates/template2/pages', 
    prefix: '/template-2', 
    destParams: { suffix: 'Template2' } 
  },
  { 
    srcDir: 'src/templates/template3/pages', 
    prefix: '/template-3', 
    destParams: { suffix: 'Template3' }
  }
];

const appDir = 'src/app';

inputs.forEach(input => {
  if (!fs.existsSync(input.srcDir)) return;
  
  const files = fs.readdirSync(input.srcDir).filter(f => f.endsWith('.tsx'));
  
  files.forEach(file => {
    // Determine route
    // Index2.tsx -> /template-2
    // About2.tsx -> /template-2/about
    // Programs2.tsx -> /template-2/programs
    // ProgramDetail2.tsx -> /template-2/programs/[slug]
    
    let baseName = file.replace('.tsx', '');
    let routePart = baseName.toLowerCase();
    
    // Clean up digit suffix for route (About2 -> about)
    routePart = routePart.replace(/\d+$/, ''); 
    
    if (baseName.startsWith('Index')) {
        routePart = '';
    } else if (baseName.startsWith('ProgramDetail') || baseName.startsWith('BlogDetail')) {
         // Check parent folder logic? 
         // Assuming ProgramDetail2 means programs/[slug].
         // Programs2 -> programs.
         // ProgramDetail2 -> programs/[slug].
         if (baseName.includes('ProgramDetail')) routePart = 'programs/[slug]';
         if (baseName.includes('BlogDetail')) routePart = 'blog/[slug]';
    } else if (baseName === 'BirthdayParties2' || baseName === 'BirthdayParties3') {
        routePart = 'programs/birthday-parties';
    } 

    const componentName = baseName.replace(/\d+$/, '') + input.destParams.suffix + 'Page';
    // Actually, preserve original name to avoid conflict, but exported const needs rename.
    // Index2 -> Template2HomePage is better.
    // Let's use a cleaner name mapping.
    
    let finalComponentName = baseName; // Default retain
    // Regex rename inside file: const Index2 -> const Template2HomePage
    
    if (baseName.startsWith('Index')) finalComponentName = `Template${baseName.endsWith('3')?'3':'2'}HomePage`;
    else finalComponentName = baseName.replace(/\d+$/, '') + `Template${baseName.endsWith('3')?'3':'2'}Page`; 
    // About2 -> AboutTemplate2Page. 
    
    // Actually, let's keep it simple: 
    // Rename file to [OriginalName].tsx (keep unique) but inside use [OriginalName]Page?
    // Destination: src/components/templates/template2/pages/[OriginalName].tsx
    
    const destDir = `src/components/templates/${input.prefix.replace('/','')}/pages`;
    fs.mkdirSync(destDir, { recursive: true });
    
    const sourcePath = path.join(input.srcDir, file);
    const destPath = path.join(destDir, file); // Keep filename
    
    let content = fs.readFileSync(sourcePath, 'utf8');
    
    // Transformations
    if (!content.includes('"use client"')) content = `"use client";\n` + content;
    
    // Regex replace imports
    content = content.replace(/import\s*\{\s*Link\s*\}\s*from\s*['"]react-router-dom['"]/g, `import Link from 'next/link'`);
    // ... same replacements as before ...
    content = content.replace(/Link to=/g, 'Link href=');
    content = content.replace(/ to={/g, ' href={');
    content = content.replace(/ to="/g, ' href="');
    
    if (content.includes('useLocation')) {
        content = content.replace(/useLocation/g, 'usePathname');
        content = content.replace(/import\s*\{.*useLocation.*\}\s*from\s*['"]react-router-dom['"]/, '');
        if (!content.includes('next/navigation')) {
            content = content.replace(/import\s*Link\s*from\s*['"]next\/link['"];/, `import Link from 'next/link';\nimport { usePathname } from 'next/navigation';`);
        }
    }
    
    // Write component
    fs.writeFileSync(destPath, content);
    console.log(`Migrated template component ${file} to ${destPath}`);
    
    // Create Page Wrapper
    const routePath = path.join(appDir, input.prefix, routePart);
    fs.mkdirSync(routePath, { recursive: true });
    
    const pagePath = path.join(routePath, 'page.tsx');
    const dynamic = routePart.includes('[slug]');
    
    // For import, we need relative path from app/... to components/...
    // app/template-2/about/page.tsx -> ../../../components/templates/template2/pages/About2
    // easier to use alias @/components/...
    
    const importPath = `@/components/templates/${input.prefix.replace('/','')}/pages/${file.replace('.tsx','')}`;
    const originalExportName = baseName; // Assuming export const Index2 = ...
    
    let pageContent = '';
    
    if (dynamic) {
         pageContent = `
import { Metadata } from 'next';
import { ${originalExportName} } from '${importPath}';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return { title: 'APEX Martial Arts' }; // TODO: proper dynamic metadata
}

export default async function Page() {
  return <${originalExportName} />;
}
`;
    } else {
         pageContent = `
import { Metadata } from 'next';
import { ${originalExportName} } from '${importPath}';

export const metadata: Metadata = {
  title: 'APEX Martial Arts',
};

export default function Page() {
  return <${originalExportName} />;
}
`;
    }
    
    fs.writeFileSync(pagePath, pageContent.trim());
    console.log(`Created page ${pagePath}`);
  });
});
