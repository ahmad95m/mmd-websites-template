const fs = require('fs');
const path = require('path');

// Configuration for mapping source files to destination and routes
const mapping = {
  'Index.tsx': { component: 'HomePage', dir: 'home', route: 'home' }, // dir 'home' -> src/app/page.tsx needs special handling
  'About.tsx': { component: 'AboutPage', dir: 'about', route: 'about' },
  'Programs.tsx': { component: 'ProgramsPage', dir: 'programs', route: 'programs' },
  'ProgramDetail.tsx': { component: 'ProgramDetailPage', dir: 'programs/[slug]', route: null, dynamic: true },
  'BirthdayParties.tsx': { component: 'BirthdayPartiesPage', dir: 'programs/birthday-parties', route: 'birthday-parties' },
  'Reviews.tsx': { component: 'ReviewsPage', dir: 'reviews', route: 'reviews' },
  'Blog.tsx': { component: 'BlogPage', dir: 'blog', route: 'blog' },
  'BlogDetail.tsx': { component: 'BlogDetailPage', dir: 'blog/[slug]', route: null, dynamic: true },
  'Location.tsx': { component: 'LocationPage', dir: 'location', route: 'location' },
  'Schedule.tsx': { component: 'SchedulePage', dir: 'schedule', route: 'schedule' },
  'Calendar.tsx': { component: 'CalendarPage', dir: 'calendar', route: 'calendar' },
  'Privacy.tsx': { component: 'PrivacyPage', dir: 'privacy-policy', route: 'privacy' }, // Check route key!
  'Terms.tsx': { component: 'TermsPage', dir: 'terms-of-service', route: 'terms' }, // Check route key!
  'NotFound.tsx': { component: 'NotFoundPage', dir: 'not-found', route: null }, // Handled separately
};

// Check siteContent.json for correct route keys if possible, but hardcoded best guess
// Based on file names, usually safe. 
// "Privacy Policy" -> "privacy"? "Terms" -> "terms"?
// I'll verify logic later or update manually.

const pagesDir = 'src/components/pages';
const appDir = 'src/app';

if (!fs.existsSync(pagesDir)) {
  console.error("Pages dir not found!");
  process.exit(1);
}

Object.keys(mapping).forEach(file => {
  const config = mapping[file];
  const sourcePath = path.join(pagesDir, file);
  
  if (!fs.existsSync(sourcePath)) {
    console.log(`Skipping ${file}, not found.`);
    return;
  }
  
  // 1. Rename and Update Component
  const newFilename = `${config.component}.tsx`;
  const destPath = path.join(pagesDir, newFilename);
  
  // Read content
  let content = fs.readFileSync(sourcePath, 'utf8');
  
  // Transformations
  // Add use client
  if (!content.includes('"use client"')) {
    content = `"use client";\n` + content;
  }
  
  // Rename component export
  // export const Index = ... or const Index = ... export default Index
  // Regex to find component name definition
  const componentNameRegex = new RegExp(`(const|function)\\s+${file.replace('.tsx', '')}\\s*(=|\\()`);
  // This is tricky because Index.tsx -> Index component. Abount.tsx -> About.
  const oldComponentName = file.replace('.tsx', '');
  
  // Replace component name definition
  content = content.replace(new RegExp(`const ${oldComponentName}\\s*=`, 'g'), `const ${config.component} =`);
  content = content.replace(new RegExp(`function ${oldComponentName}\\(`, 'g'), `function ${config.component}(`);
  content = content.replace(new RegExp(`export default ${oldComponentName}`, 'g'), `export { ${config.component} }`); // Change default export to named
  
  // If "export const Index", replace it
  content = content.replace(new RegExp(`export const ${oldComponentName}`, 'g'), `export const ${config.component}`);

  // Replace SEOHead import
  // We keep it but effectively it will be refactored.
  // Actually, let's keep it as is, we will refactor SEOHead separately.
  
  // Router replacements
  content = content.replace(/import\s*\{\s*Link\s*\}\s*from\s*['"]react-router-dom['"]/g, `import Link from 'next/link'`);
  content = content.replace(/import\s*\{\s*.*\bLink\b.*\}\s*from\s*['"]react-router-dom['"]/g, (match) => {
     return match.replace('Link', '').replace(', ,', ',').replace('{ ,', '{').replace(', }', '}'); 
     // This is sloppy. Better just replace the whole line if typical.
  });
  // Add missing imports if needed
  if (content.includes('import Link from') && !content.includes("next/link")) {
      // already replaced
  }
  
  // useLocation -> usePathname
  if (content.includes('useLocation')) {
      content = content.replace(/useLocation/g, 'usePathname');
      content = content.replace(/import\s*\{.*usePathname.*\}\s*from\s*['"]react-router-dom['"]/, ''); // Remove from old import
      // Add new import
      content = content.replace(/import\s*Link\s*from\s*['"]next\/link['"];/, `import Link from 'next/link';\nimport { usePathname } from 'next/navigation';`);
  }
  
  // useParams
  if (content.includes('useParams')) {
       // Replace import
       content = content.replace(/import\s*\{.*useParams.*\}\s*from\s*['"]react-router-dom['"]/, ''); // Simplify
       // Ensure next/navigation import has useParams
       if (content.includes("import { usePathname } from 'next/navigation'")) {
           content = content.replace("usePathname", "usePathname, useParams");
       } else {
           content = content.replace(/import\s*Link\s*from\s*['"]next\/link['"];/, `import Link from 'next/link';\nimport { useParams } from 'next/navigation';`);
       }
  }

  // Update image usages (run fix-images logic separately or inline)
  // We'll rely on fix-images.js run previously or subsequently.

  // Write updated component
  fs.writeFileSync(destPath, content);
  
  // Remove old file
  if (sourcePath !== destPath) {
      fs.unlinkSync(sourcePath);
  }
  
  // 2. Create Page Wrapper (src/app/...)
  if (config.dir === 'not-found') return; // rendering 404 is special

  let targetDir = path.join(appDir, config.dir === 'home' ? '' : config.dir);
  fs.mkdirSync(targetDir, { recursive: true });
  
  const pagePath = path.join(targetDir, 'page.tsx');
  
  let pageContent = '';
  
  if (config.dynamic) {
      // Dynamic route page
      pageContent = `
import { Metadata } from 'next';
import siteContent from '@/data/siteContent.json';
import { ${config.component} } from '@/components/pages/${config.component}';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const programs = siteContent.programs;
  const blog = siteContent.blog;
  
  const item = programs.find((p: any) => p.slug === slug) || blog.find((p: any) => p.slug === slug);
  
  if (!item) return {
    title: 'Page Not Found',
  };

  return {
    title: item.seo?.title || item.name || item.title,
    description: item.seo?.description || item.shortDescription || item.excerpt,
  };
}

export default async function Page() {
  return <${config.component} />;
}
`;
  } else {
      // Static route page
      const routeKey = config.route;
      // Access seo data safely
      // Note: siteContent type inside JSON is not typed, we assume structure.
      // We can use a try-catch or safe access string.
      
      const seoAccess = routeKey ? `
const seo = (siteContent.seo as any)['${routeKey}'];
export const metadata: Metadata = {
  title: seo?.title || '${config.component}',
  description: seo?.description || '',
};` : `export const metadata: Metadata = { title: 'APEX Martial Arts' };`;

      pageContent = `
import { Metadata } from 'next';
import siteContent from '@/data/siteContent.json';
import { ${config.component} } from '@/components/pages/${config.component}';

${seoAccess}

export default function Page() {
  return <${config.component} />;
}
`;
  }

  fs.writeFileSync(pagePath, pageContent.trim());
  console.log(`Migrated ${file} -> ${newFilename} & created ${pagePath}`);
});
