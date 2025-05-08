import { Models } from 'node-appwrite';

export type Color = Models.Document & {
  name: string;
  hex: string;
};
