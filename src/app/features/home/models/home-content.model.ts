export interface HeroStat {
  value: string;
  label: string;
  icon: 'calendar' | 'users' | 'star';
}

export interface HeroContent {
  title: string;
  subtitle: string;
  servicePlaceholder: string;
  locationPlaceholder: string;
  imageUrl: string;
  stats: HeroStat[];
}

export interface Category {
  id: string;
  label: string;
  icon: 'scissors' | 'barber' | 'institute' | 'nails' | 'spa' | 'makeup';
  /** Nom de catégorie utilisé dans les filtres de recherche (correspond à ServiceCategory.name) */
  searchKey: string;
}

export interface Business {
  id: string;
  /** Slug utilisé dans la route /pro/:slug — doit correspondre à un slug dans MockDataService */
  slug: string;
  name: string;
  categoryLabel: string;
  location: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  badge?: string;
  imageUrl: string;
  isFavorite: boolean;
}

export interface Trend {
  id: string;
  rank: number;
  title: string;
  startingPrice: number;
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  commune: string;
  avatarInitials: string;
  avatarUrl?: string;
  comment: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  icon: 'store' | 'calendar' | 'users' | 'star';
}

export interface FooterColumn {
  title: string;
  links: string[];
}

export interface HomeContent {
  hero: HeroContent;
  categories: Category[];
  recommendedBusinesses: Business[];
  newBusinesses: Business[];
  trends: Trend[];
  testimonials: Testimonial[];
  stats: StatItem[];
  footerColumns: FooterColumn[];
}
