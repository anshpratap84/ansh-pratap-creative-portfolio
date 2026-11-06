export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  categoryGroup?: 'video' | 'photography' | 'ai-art' | 'portfolio' | 'music-platform' | 'social-media';
  hindiTitle?: string;
  tagline?: string;
  shortTitle?: string;
  tags: string[];
  description: string;
  verifiedDetails: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  instagramUrl?: string;
  hasVideoPreview?: boolean;
  ctaText: string;
  isPrimary?: boolean;
  responsibilities?: string[];
  tools?: string[];
  skills?: string[];
  stats?: { label: string; value: string; sub: string }[];
}

export interface Service {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  deliverables: string[];
  idealFor: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  badge: string;
  skills: string[];
  keyTools: string[];
}

export interface ToolItem {
  name: string;
  category: string;
  role: string;
  description: string;
  iconName?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  duration: string;
  description: string;
  keyHighlights: string[];
  associatedCertificates?: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialType: string;
  credentialNumber?: string;
  verificationUrl?: string;
  assetPath: string;
  assetType: 'image' | 'pdf';
  description: string;
}

export interface ServiceInquiryState {
  isOpen: boolean;
  selectedService: string;
}
