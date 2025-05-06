'use server';

import { createAdminClient } from '../config/appwrite';
import { redirect } from 'next/navigation';
import checkAuth from './checkAuth';
import { ID } from 'node-appwrite';

export async function getAllCategories() {
  try {
    const { databases } = await createAdminClient();

    const { documents: categories } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CATEGORIES as string
    );

    return categories;
  } catch (error) {
    console.log(
      'Une erreur est survenue lors de la récupération des catégories',
      error
    );
    return redirect('/');
  }
}

export async function createCategory(
  previousState: unknown,
  formData: FormData
) {
  const { databases, storage } = await createAdminClient();
  try {
    const { user } = await checkAuth();

    if (!user) {
      return {
        error: 'Vous devez être connecté pour ajouter une catégorie',
      };
    }

    let imageId;

    const image = formData.get('categoryImage') as File | null;

    if (image && image.size > 0 && image.name !== 'undefined') {
      try {
        const response = await storage.createFile('images', ID.unique(), image);
        imageId = response.$id;
      } catch (error) {
        console.log('Error uploading image', error);
        return {
          error: 'Error uploading image',
        };
      }
    }
    const categoryId = ID.unique();
    await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CATEGORIES as string,
      categoryId,
      {
        name: formData.get('name') as string,
        categoryImage: imageId as string,
      }
    );
    return { success: true };
  } catch (error) {
    console.log(
      'Une erreur est survenue lors de la création de la catégorie',
      error
    );
    return redirect('/');
  }
}
