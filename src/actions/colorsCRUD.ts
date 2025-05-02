'use server';

import { createAdminClient } from '../config/appwrite';
import { redirect } from 'next/navigation';

export async function getAllColors() {
  try {
    const { databases } = await createAdminClient();

    const { documents: colors } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_COLORS as string
    );

    return colors;
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

export async function addColor(name: string) {
  try {
    const { databases } = await createAdminClient();

    const color = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_COLORS as string,
      'unique()',
      {
        name,
      }
    );

    return color;
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
