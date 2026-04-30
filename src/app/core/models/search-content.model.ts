export interface SearchCategoryFilter {
  id: string;
  label: string;
  count: number;
  icon: 'scissors' | 'tresses' | 'barber' | 'nails' | 'institute' | 'spa' | 'makeup';
  selected: boolean;
}

export interface SearchAppointmentMode {
  id: 'salon' | 'home';
  label: string;
  icon: 'store' | 'home';
  selected: boolean;
}

export interface SearchPriceRange {
  min: number;
  max: number;
}

export interface SearchFilters {
  location: string;
  categories: SearchCategoryFilter[];
  minimumRating: number;
  priceRange: SearchPriceRange;
  appointmentModes: SearchAppointmentMode[];
}

export interface SearchSalon {
  id: string;
  name: string;
  categoryLabel: string;
  location: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  tags: string[];
  imageUrl: string;
}

export interface SearchContent {
  title: string;
  subtitle: string;
  resultCount: number;
  sortLabel: string;
  filters: SearchFilters;
  salons: SearchSalon[];
}
