'use server';

import { createAdminClient } from '../config/appwrite';
import { redirect } from 'next/navigation';

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
