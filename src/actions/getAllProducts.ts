'use server';

import { createAdminClient } from '@/config/appwrite';
import { redirect } from 'next/navigation';

export async function getAllProducts() {
  try {
    const { databases } = await createAdminClient();

    const { documents: products } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_PRODUCTS as string
    );

    return products;
  } catch (error) {
    console.log(
      'Une erreur est survenue lors de la récupération des produits',
      error
    );
    return redirect('/');
  }
}
