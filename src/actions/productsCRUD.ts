'use server';

import { Product } from '../types/Product';
import { createAdminClient } from '../config/appwrite';
import { redirect } from 'next/navigation';
import { ID } from 'node-appwrite';
import checkAuth from './checkAuth';

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

export async function createProduct(
  previousState: unknown,
  FormData: FormData
) {
  const { databases, storage } = await createAdminClient();
  try {
    const { user } = await checkAuth();

    if (!user) {
      return {
        error: 'Vous devez être connecté pour ajouter un produit',
      };
    }
    const price = Number(
      (FormData.get('price') as string)?.replace(',', '.') ?? ''
    );

    let mainImage;
    let secondImage;
    let thirdImage;

    const mainImageFile = FormData.get('mainImage') as File | null;
    const secondImageFile = FormData.get('secondImage') as File | null;
    const thirdImageFile = FormData.get('thirdImage') as File | null;

    if (
      mainImageFile &&
      mainImageFile.size > 0 &&
      mainImageFile.name !== 'undefined'
    ) {
      try {
        const response = await storage.createFile(
          'images',
          ID.unique(),
          mainImageFile
        );
        mainImage = response.$id;
      } catch (error) {
        console.log('Error uploading image', error);
        return {
          error: 'Error uploading image',
        };
      }
    }

    if (
      secondImageFile &&
      secondImageFile.size > 0 &&
      secondImageFile.name !== 'undefined'
    ) {
      try {
        const response = await storage.createFile(
          'images',
          ID.unique(),
          secondImageFile
        );
        secondImage = response.$id;
      } catch (error) {
        console.log('Error uploading image', error);
        return {
          error: 'Error uploading image',
        };
      }
    }

    if (
      thirdImageFile &&
      thirdImageFile.size > 0 &&
      thirdImageFile.name !== 'undefined'
    ) {
      try {
        const response = await storage.createFile(
          'images',
          ID.unique(),
          thirdImageFile
        );
        thirdImage = response.$id;
      } catch (error) {
        console.log('Error uploading image', error);
        return {
          error: 'Error uploading image',
        };
      }
    }

    const productId = ID.unique();

    await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_DATAS as string,
      productId as string,
      {
        name: FormData.get('name') as string,
        description: FormData.get('description') as string,
        price: price,
        categories: Array.from(FormData.getAll('categories'))
          .map((genre) => genre.toString().split(','))
          .flat(),
        genres: Array.from(FormData.getAll('genres'))
          .map((genre) => genre.toString().split(','))
          .flat(),
        mainImage: mainImage as string,
        secondImage: secondImage as string,
        thirdImage: thirdImage as string,
        rating: 0,
      }
    );

    return { success: true };
  } catch (error) {
    console.log("Une erreur est survenue lors de l'ajout du produit", error);
    return redirect('/');
  }
}
