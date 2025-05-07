import { getAllCategories } from '@/actions/categoriesCRUD';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CategoryList = async () => {
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_IMAGES;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  const categories = await getAllCategories();

  if (!categories) return null;

  return (
    <section className="px-4 overflow-x-scroll scrollbar-x scrollbar-hide">
      <div className="flex gap-4 md:gap-8">
        {categories.map((category) => {
          const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${category.categoryImage}/view?project=${projectId}`;
          return (
            <Link
              key={category.$id}
              href={`/list?cat=${category.$id}`}
              className="flex-shrink-0 w-[90%] sm:w-1/2 lg:w-1/4 xl:w-1/6"
            >
              <div className="relative bg-gray-slate-100 w-full h-96">
                <Image
                  src={imageUrl}
                  alt="image de la catégorie"
                  fill
                  sizes="20vw"
                  className="object-cover rounded-md border border-white hover:border-slate-400 transition-all duration-300 ease-in-out"
                />
              </div>
              <h1 className="mt-8 text-center font-medium text-lg tracking-wide">
                {category.name}
              </h1>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryList;
