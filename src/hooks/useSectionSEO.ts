import { useEffect, useState } from 'react';

export interface SectionSEOMetadata {
  id: string;
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  keywords?: string[];
}

export const SECTION_SEO_CONFIG: Record<string, SectionSEOMetadata> = {
  hero: {
    id: 'hero',
    title: 'Ansh Pratap — Creative Content Creator & Visual Storyteller',
    description:
      'Cinematic creative portfolio of Ansh Pratap — short-form video editing, visual storytelling, digital graphic design, and Generative AI workflows based in Chittorgarh, Rajasthan.',
    ogTitle: 'Ansh Pratap — Creative Content Creator & Visual Storyteller',
    ogDescription:
      'Turning Ideas Into Visual Experiences through video editing, digital design, photography, and Generative AI.',
    keywords: [
      'Ansh Pratap',
      'Creative Content Creator',
      'Video Editor',
      'Generative AI',
      'Visual Storyteller',
      'Chittorgarh',
    ],
  },
  about: {
    id: 'about',
    title: 'About Me & Creative Philosophy | Ansh Pratap',
    description:
      "Learn about Ansh Pratap's multidisciplinary background combining video editing, graphic design, and computer science engineering at Mewar University.",
    ogTitle: 'About Ansh Pratap — Creative Technologist & Video Editor',
    ogDescription:
      'Crafting high-retention short-form videos, designing distinctive digital brand assets, and exploring generative AI pipelines.',
    keywords: ['About Ansh Pratap', 'Mewar University', 'Creative Technologist', 'Visual Philosophy'],
  },
  projects: {
    id: 'projects',
    title: 'Featured Projects & Case Studies | Ansh Pratap',
    description:
      'Explore featured creative projects: Kuchh Bhi Post Kardo (448K+ views), Zindagi Ki Dhun music platform, CreateSphere AI, and Cyberbullying Awareness video.',
    ogTitle: 'Featured Projects & Case Studies — Ansh Pratap',
    ogDescription:
      'Real-world portfolio projects spanning social media management, culture-inspired audio interfaces, and video production.',
    keywords: [
      'Kuchh Bhi Post Kardo',
      'Zindagi Ki Dhun',
      'CreateSphere AI',
      'Video Editing Projects',
      'Instagram Content Strategy',
    ],
  },
  services: {
    id: 'services',
    title: 'Creative Services & Production Offerings | Ansh Pratap',
    description:
      'Professional creative services: short-form video editing for Reels/Shorts, social media branding, portrait color grading, and Generative AI visual pipelines.',
    ogTitle: 'Creative Services & Deliverables — Ansh Pratap',
    ogDescription:
      'High-retention video editing, social media graphics, photo grading, and AI asset creation for brands and creators.',
    keywords: [
      'Video Editing Services',
      'Reels Editing',
      'Social Media Content Creation',
      'Photo Retouching',
      'GenAI Workflows',
    ],
  },
  toolkit: {
    id: 'toolkit',
    title: 'Technical Stack & Creative Software Toolkit | Ansh Pratap',
    description:
      'Core creative software and technical stack: Adobe Premiere Pro, CapCut, Canva, Lightroom, Google Gemini API, OpenCV, Python, and modern React.',
    ogTitle: 'Software & Technology Stack — Ansh Pratap',
    ogDescription:
      'Everyday production tools and technical frameworks utilized for high-impact creative and digital deliverables.',
    keywords: [
      'Adobe Premiere Pro',
      'CapCut',
      'Canva',
      'Adobe Lightroom',
      'Gemini API',
      'Python',
      'React',
    ],
  },
  experience: {
    id: 'experience',
    title: 'Professional Experience & Internships | Ansh Pratap',
    description:
      'Documented experience: Video Editing Internship at iStudio producing social impact videos, and Industrial AI & ML training at CTTC Bhubaneswar.',
    ogTitle: 'Fieldwork & Professional Experience — Ansh Pratap',
    ogDescription:
      'Verified video editing internships, competitive aptitude qualifications, and hands-on industrial AI fieldwork.',
    keywords: [
      'iStudio Internship',
      'Video Editing Intern',
      'CTTC Bhubaneswar',
      'Industrial AI Training',
      'Cyberbullying Awareness',
    ],
  },
  credentials: {
    id: 'credentials',
    title: 'Verified Certifications & Credentials | Ansh Pratap',
    description:
      'Verified credentials: Google AI Essentials, Google Prompting Essentials, Adobe & NASSCOM Generative AI Content Creation, and IBM SkillsBuild.',
    ogTitle: 'Official Certifications & Credentials — Ansh Pratap',
    ogDescription:
      'Authentic credentials and licenses issued by Google, Adobe, NASSCOM FutureSkills Prime, and IBM.',
    keywords: [
      'Google AI Essentials',
      'Google Prompting Essentials',
      'Adobe Generative AI',
      'NASSCOM FutureSkills',
      'IBM SkillsBuild',
    ],
  },
  contact: {
    id: 'contact',
    title: 'Contact & Collaboration | Ansh Pratap',
    description:
      'Get in touch with Ansh Pratap for freelance video editing, social media content creation, brand design, or creative technology collaborations.',
    ogTitle: 'Let’s Collaborate — Ansh Pratap',
    ogDescription:
      'Open for creative projects, content strategy, and innovative tech collaborations. Send an inquiry or connect directly.',
    keywords: ['Contact Ansh Pratap', 'Hire Video Editor', 'Creative Inquiry', 'Content Collaboration'],
  },
};

/**
 * Updates or creates a <meta> element in document head
 */
function updateMetaTag(
  selector: string,
  attributeName: 'name' | 'property',
  attributeValue: string,
  content: string
) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Custom hook to dynamically update document title and meta tags based on the active viewport section
 */
export function useSectionSEO() {
  const [activeSectionId, setActiveSectionId] = useState<string>('hero');

  useEffect(() => {
    // Collect all monitored section IDs
    const sectionIds = Object.keys(SECTION_SEO_CONFIG);

    // Track intersection with viewport
    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Find the entry with the highest intersection ratio or the top-most visible one
      const intersecting = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (intersecting.length > 0) {
        const primarySectionId = intersecting[0].target.id;
        if (SECTION_SEO_CONFIG[primarySectionId]) {
          setActiveSectionId(primarySectionId);
        }
      }
    };

    // Use a comfortable rootMargin to switch when the section occupies the central focal area
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-15% 0px -40% 0px',
      threshold: [0, 0.2, 0.5, 0.8],
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    // Fallback scroll listener for top of page / hero detection
    const handleScroll = () => {
      if (window.scrollY < 180) {
        setActiveSectionId('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Whenever activeSectionId changes, update the document head metadata
  useEffect(() => {
    const config = SECTION_SEO_CONFIG[activeSectionId] || SECTION_SEO_CONFIG.hero;

    // 1. Update <title>
    if (document.title !== config.title) {
      document.title = config.title;
    }

    // 2. Update <meta name="description">
    updateMetaTag('meta[name="description"]', 'name', 'description', config.description);

    // 3. Update OpenGraph tags
    updateMetaTag(
      'meta[property="og:title"]',
      'property',
      'og:title',
      config.ogTitle || config.title
    );
    updateMetaTag(
      'meta[property="og:description"]',
      'property',
      'og:description',
      config.ogDescription || config.description
    );

    // 4. Update Twitter Card tags
    updateMetaTag(
      'meta[name="twitter:title"]',
      'name',
      'twitter:title',
      config.ogTitle || config.title
    );
    updateMetaTag(
      'meta[name="twitter:description"]',
      'name',
      'twitter:description',
      config.ogDescription || config.description
    );
  }, [activeSectionId]);

  return {
    activeSectionId,
    activeMeta: SECTION_SEO_CONFIG[activeSectionId] || SECTION_SEO_CONFIG.hero,
  };
}
