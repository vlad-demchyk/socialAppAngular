import { UserProfile } from './user.interface';

export interface Hobby {
  id: number;
  name: string;
  icon: string;
  description: string;
}

export interface FavoritePlace {
  id: number;
  name: string;
  type: string;
  address: string;
  photo: string;
}

export interface Photo {
  id: number;
  url: string;
  description: string;
  uploadDate: string;
}

export interface Work {
  company: string;
  position: string;
  location: string;
}

export interface Education {
  university: string;
  faculty: string;
  graduationYear: number;
}

export interface UserDetails extends UserProfile {
  coverPhoto: string;
  phone: string;
  dateOfBirth: string;
  city: string;
  country: string;
  bio: string;
  hobbies: Hobby[];
  interests: string[];
  favoriteMusic: string[];
  favoritePlaces: FavoritePlace[];
  photos: Photo[];
  work: Work;
  education: Education;
  relationshipStatus: string;
  languages: string[];
  joinedDate: string;
  lastActive: string;
}
