import { Models } from 'node-appwrite';

export type Product = Models.Document & {
  name: string;
  description: string;
  mainImage: string;
  secondImage: string;
  thirdImage: string;
  price: number;
  rating: number;
  category: string;
  ofWeek: boolean;
  genre: string;
};
