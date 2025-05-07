'use server';

import { createAdminClient } from '../config/appwrite';
import { redirect } from 'next/navigation';
import checkAuth from './checkAuth';
import { ID } from 'node-appwrite';
import { Color } from '@/types/Color';

export async function getAllColors() {
  try {
    const { databases } = await createAdminClient();

    const { documents: colors } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_COLORS as string
    );

    return colors as Color[];
  } catch (error) {
    console.log(
      'Une erreur est survenue lors de la récupération des couleurs',
      error
    );
    return redirect('/');
  }
}

export async function getOneColor(id: string) {
  try {
    const { databases } = await createAdminClient();

    const { color } = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_COLORS as string,
      id as string
    );

    return color;
  } catch (error) {
    console.log(
      'Une erreur est survenue lors de la récupération de la couleur',
      error
    );
    return redirect('/');
  }
}

export async function createColor(previousState: unknown, FormData: FormData) {
  const { databases } = await createAdminClient();
  try {
    const { user } = await checkAuth();

    if (!user) {
      return {
        error: 'Vous devez être connecté pour ajouter une couleur',
      };
    }

    const colorId = ID.unique();
    await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_COLORS as string,
      colorId,
      {
        name: FormData.get('name') as string,
        hex: FormData.get('hex') as string,
      }
    );

    return { success: true };
  } catch (error) {
    console.log("Une erreur est survenue lors de l'ajout de la couleur", error);
    return redirect('/');
  }
}

export async function deleteColor(id: string) {
  try {
    const { databases } = await createAdminClient();

    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_COLORS as string,
      id as string
    );
  } catch (error) {
    console.log(
      'Une erreur est survenue lors de la suppression de la couleur',
      error
    );
    return redirect('/');
  }
}

export async function updateColor(id: string, name: string) {
  try {
    const { databases } = await createAdminClient();

    await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_COLORS as string,
      id as string,
      {
        name,
      }
    );
  } catch (error) {
    console.log(
      'Une erreur est survenue lors de la mise à jour de la couleur',
      error
    );
    return redirect('/');
  }
}
