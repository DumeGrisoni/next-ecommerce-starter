import { Models } from 'node-appwrite';

export type Categories = Models.Document & {
  name: string;
  categoryImage: string;
};
