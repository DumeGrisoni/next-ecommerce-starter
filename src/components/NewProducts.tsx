import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { getAllProducts } from '@/actions/productsCRUD';

const NewProducts = async () => {
  const productsData = await getAllProducts();
  const sortedProducts = productsData.sort((a, b) => {
    const createdAtA = new Date(a.$createdAt).getTime();
    const createdAtB = new Date(b.$createdAt).getTime();
    return createdAtB - createdAtA;
  });
  const products = sortedProducts.slice(0, 4);

  console.log(products.map((product) => product.$createdAt));

  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_IMAGES;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  return (
    <div className=" mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {products.map((product) => {
        const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${product.mainImage}/view?project=${projectId}`;
        const imageUrl2 = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${product.secondImage}/view?project=${projectId}`;
        return (
          <Link
            key={product.$id}
            href={'/test'}
            className="w-full flex flex-col gap-4 md:w-[45%] lg:w-[22%]"
          >
            <div className="relative w-full h-80">
              <Image
                src={imageUrl}
                fill
                alt={'image principale'}
                sizes="25vw"
                className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity duration-500 ease"
              />
              <Image
                src={imageUrl2}
                fill
                alt={'image secondaire'}
                sizes="25vw"
                className="absolute object-cover rounded-md"
              />
            </div>
            <div className="flex justify-between">
              <span className="font-medium">{product.name}</span>
              <span className="font-semibold">{product.price}€</span>
            </div>
            <p className="text-sm text-gray-500">
              {product.description.length > 50
                ? `${product.description.substring(0, 50)}...`
                : product.description}
            </p>
            <button className="text-xs w-max hover:bg-primary hover:text-white rounded-2xl ring-1 ring-primary text-primary py-2 px-4">
              Ajouter au panier
            </button>
          </Link>
        );
      })}
    </div>
  );
};

export default NewProducts;
