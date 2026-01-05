import { StaticImageData } from 'next/image';
import programKids from '@/assets/program-kids.jpg';
import programWarriors from '@/assets/program-warriors.jpg';
import programTeens from '@/assets/program-teens.jpg';
import programAdults from '@/assets/program-adults.jpg';
import programTaiChi from '@/assets/program-taichi.jpg';
import programLeadership from '@/assets/program-leadership.jpg';
import facilityImage from '@/assets/facility.jpg';
import coachImage from '@/assets/coach.jpg';
import heroImage from '@/assets/hero-home.jpg';

const imageMap: Record<string, StaticImageData> = {
  'program-kids.jpg': programKids,
  'program-warriors.jpg': programWarriors,
  'program-teens.jpg': programTeens,
  'program-adults.jpg': programAdults,
  'program-taichi.jpg': programTaiChi,
  'program-leadership.jpg': programLeadership,
  'facility.jpg': facilityImage,
  'coach.jpg': coachImage,
  'hero-home.jpg': heroImage,
};

export const getStaticImage = (path: string | StaticImageData | undefined): StaticImageData | string => {
  if (!path) return programKids;
  if (typeof path !== 'string') return path;
  
  // Extract filename from path (e.g., "/src/assets/program-kids.jpg" -> "program-kids.jpg")
  const filename = path.split('/').pop() || '';
  
  // If we have a static mapping for this filename, return it
  if (imageMap[filename]) {
    return imageMap[filename];
  }

  // Otherwise return the original path (assumes it's a valid URL or public path)
  return path;
};
