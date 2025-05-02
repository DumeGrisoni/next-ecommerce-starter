'use server';

import { Product } from '../types/Product';
import { createAdminClient } from '../config/appwrite';
import { redirect } from 'next/navigation';

export async function getOneProduct(id: string) {
  try {
    const { databases } = await createAdminClient();

    const product = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_DATAS as string,
      id
    );

    return product as Product;
  } catch (error) {
    console.log(
      'Une erreur est survenue lors de la récupération du produit',
      error
    );
    return redirect('/');
  }
}

export async function getAllProducts() {
  try {
    const { databases } = await createAdminClient();

    const { documents: products } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_DATAS as string
    );

    return products as Product[];
  } catch (error) {
    console.log(
      'Une erreur est survenue lors de la récupération des produits',
      error
    );
    return redirect('/');
  }
}

export async function deleteProduct(id: string) {
  try {
    const { databases } = await createAdminClient();

    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_DATAS as string,
      id
    );
  } catch (error) {
    console.log(
      'Une erreur est survenue lors de la suppression du produit',
      error
    );
    return redirect('/');
  }
}
