// CMS Content Models for dynamic page management

export interface PageContent {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  metaDescription: string;
  sections: ContentSection[];
  isPublished: boolean;
  lastModified: Date;
  modifiedBy?: string;
}

export interface ContentSection {
  id: string;
  type: 'hero' | 'text' | 'text-image' | 'cards' | 'faq' | 'cta' | 'stats' | 'team' | 'testimonials';
  title?: string;
  content?: string;
  image?: string;
  imagePosition?: 'left' | 'right';
  cards?: ContentCard[];
  faqItems?: FAQItem[];
  ctaText?: string;
  ctaLink?: string;
  stats?: StatItem[];
  teamMembers?: TeamMember[];
  testimonials?: Testimonial[];
}

export interface ContentCard {
  id: string;
  icon?: string;
  title: string;
  description: string;
  link?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  icon?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  content: string;
  avatar?: string;
  rating?: number;
}

export type PageSlug = 
  | 'about'
  | 'careers'
  | 'press'
  | 'blog'
  | 'become-partner'
  | 'resources'
  | 'pricing'
  | 'success-stories'
  | 'help-center'
  | 'contact'
  | 'faq'
  | 'accessibility'
  | 'privacy'
  | 'terms'
  | 'cookies'
  | 'legal';
