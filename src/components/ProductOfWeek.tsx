import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Product } from '@/types/Product';

const ProductOfWeek = ({ productsData }: { productsData: Product[] }) => {
  const filtered = productsData.filter((product) => product.ofWeek === true);
  const products = filtered.slice(0, 4);

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
            href={`/${product.$id}`}
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

      {/* 
      <Link
        href={'/test'}
        className="w-full flex flex-col gap-4 md:w-[45%] lg:w-[22%]"
      >
        <div className="relative w-full h-80">
          <Image
            src={
              'https://images.pexels.com/photos/3209639/pexels-photo-3209639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            }
            fill
            alt={'woman'}
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity duration-500 ease"
          />
          <Image
            src={
              'https://images.pexels.com/photos/9145960/pexels-photo-9145960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            }
            fill
            alt={'woman'}
            sizes="25vw"
            className="absolute object-cover rounded-md"
          />
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Nom du produit</span>
          <span className="font-semibold">82€</span>
        </div>
        <p className="text-sm text-gray-500">Description</p>
        <button className="text-xs w-max hover:bg-primary hover:text-white rounded-2xl ring-1 ring-primary text-primary py-2 px-4">
          Ajouter au panier
        </button>
      </Link>

      <Link
        href={'/test'}
        className="w-full flex flex-col gap-4 md:w-[45%] lg:w-[22%]"
      >
        <div className="relative w-full h-80">
          <Image
            src={
              'https://images.pexels.com/photos/2382288/pexels-photo-2382288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            }
            fill
            alt={'woman'}
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity duration-500 ease"
          />
          <Image
            src={
              'https://images.pexels.com/photos/3613388/pexels-photo-3613388.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            }
            fill
            alt={'woman'}
            sizes="25vw"
            className="absolute object-cover rounded-md"
          />
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Nom du produit</span>
          <span className="font-semibold">82€</span>
        </div>
        <p className="text-sm text-gray-500">Description</p>
        <button className="text-xs w-max hover:bg-primary hover:text-white rounded-2xl ring-1 ring-primary text-primary py-2 px-4">
          Ajouter au panier
        </button>
      </Link>

      <Link
        href={'/test'}
        className="w-full flex flex-col gap-4 md:w-[45%] lg:w-[22%]"
      >
        <div className="relative w-full h-80">
          <Image
            src={
              'https://images.pexels.com/photos/789303/pexels-photo-789303.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            }
            fill
            alt={'woman'}
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity duration-500 ease"
          />
          <Image
            src={
              'https://images.pexels.com/photos/1649735/pexels-photo-1649735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            }
            fill
            alt={'woman'}
            sizes="25vw"
            className="absolute object-cover rounded-md"
          />
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Nom du produit</span>
          <span className="font-semibold">82€</span>
        </div>
        <p className="text-sm text-gray-500">Description</p>
        <button className="text-xs w-max hover:bg-primary hover:text-white rounded-2xl ring-1 ring-primary text-primary py-2 px-4">
          Ajouter au panier
        </button>
      </Link> */}
    </div>
  );
};

export default ProductOfWeek;
