'use server';

import { createAdminClient } from '../config/appwrite';
import { redirect } from 'next/navigation';
import checkAuth from './checkAuth';
import { ID } from 'node-appwrite';

export async function getAllSizes() {
  try {
    const { databases } = await createAdminClient();

    const { documents: sizes } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_SIZES as string
    );

    return sizes;
  } catch (error) {
    console.log(
      'Une erreur est survenue lors de la récupération des tailles',
      error
    );
    return redirect('/');
  }
}

export async function getOneSize(id: string) {
  try {
    const { databases } = await createAdminClient();

    const { size } = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_SIZES as string,
      id as string
    );

    return size;
  } catch (error) {
    console.log(
      'Une erreur est survenue lors de la récupération de la taille',
      error
    );
    return redirect('/');
  }
}

export async function createSize(previousState: unknown, FormData: FormData) {
  const { databases } = await createAdminClient();
  try {
    const { user } = await checkAuth();

    if (!user) {
      return {
        error: 'Vous devez être connecté pour ajouter une taille',
      };
    }

    const sizeId = ID.unique();

    await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_SIZES as string,
      sizeId as string,
      {
        name: FormData.get('name') as string,
      }
    );

    return { success: true };
  } catch (error) {
    console.log("Une erreur est survenue lors de l'ajout de la taille", error);
    return redirect('/');
  }
}

export async function deleteSize(id: string) {
  try {
    const { databases } = await createAdminClient();

    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_SIZES as string,
      id as string
    );
  } catch (error) {
    console.log(
      'Une erreur est survenue lors de la suppression de la taille',
      error
    );
    return redirect('/');
  }
}

export async function updateSize(id: string, name: string) {
  try {
    const { databases } = await createAdminClient();

    await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_SIZES as string,
      id as string,
      {
        name,
      }
    );
  } catch (error) {
    console.log(
      'Une erreur est survenue lors de la mise à jour de la taille',
      error
    );
    return redirect('/');
  }
}
