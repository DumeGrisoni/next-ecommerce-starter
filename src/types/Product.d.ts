import { Models } from 'node-appwrite';
import { Categories } from './Categories';
import { Variant } from './Variants';

export type Product = Models.Document & {
  name: string;
  description: string;
  mainImage: string;
  secondImage: string;
  thirdImage: string;
  price: number;
  rating: number;
  categories: Categories[];
  ofWeek: boolean;
  genres: string[];
  variants: Variant[];
};
