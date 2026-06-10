export enum AppPage {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  SERVICES = 'SERVICES',
  AUTO_ELECTRICAL = 'AUTO_ELECTRICAL',
  GALLERY = 'GALLERY',
  BOOK_A_SERVICE = 'BOOK_A_SERVICE',
  FAQ = 'FAQ',
  CONTACT = 'CONTACT'
}

export interface ServiceItem {
  id: string;
  name: string;
  shortDesc: string;
  description: string;
  iconName: string; // Dynamic rendering via lucide-react or helper
  benefits: string[];
  problemsSolved: string[];
  ctaText: string;
  relatedServiceIds: string[];
  image: string;
}

export interface AutoElectricalSystem {
  id: string;
  title: string;
  description: string;
  items: string[];
  iconName: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'DIAGNOSTICS' | 'ELECTRICAL' | 'SERVICING' | 'SUSPENSION' | 'ALARM' | 'RADIO';
  image: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  rating: number;
  date: string;
  comment: string;
  avatar?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Appointment {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  vehicleMake: string;
  vehicleModel: string;
  serviceRequired: string;
  preferredDate: string;
  message: string;
  bookingTime: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED';
}

export interface ContactFormSubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  timestamp: string;
}
