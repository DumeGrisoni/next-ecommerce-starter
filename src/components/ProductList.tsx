import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import DOMPurify from 'isomorphic-dompurify';

import { wixClientServer } from '@/lib/wixClientServer';
import { products } from '@wix/stores';

const PRODUCT_PER_PAGE = 20;

const ProductList = async ({
  categoryId,
  limit,
}: {
  categoryId: string;
  limit?: number;
}) => {
  const wixClient = await wixClientServer();

  const res = await wixClient.products
    .queryProducts()
    .eq('collectionIds', categoryId)
    .limit(limit || PRODUCT_PER_PAGE)
    .find();
  console.log(res);
  return (
    <div className=" mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {res.items.map((product: products.Product) => {
        return (
          <Link
            key={product._id}
            href={`/${product.slug}`}
            className="w-full flex flex-col gap-4 md:w-[45%] lg:w-[22%]"
          >
            <div className="relative w-full h-80">
              <Image
                src={product.media?.mainMedia?.image?.url || '/product.png'}
                fill
                alt={'image principale'}
                sizes="25vw"
                className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity duration-500"
              />
              {product.media?.items && (
                <Image
                  src={product.media?.items[1]?.image?.url || '/product.png'}
                  alt=""
                  fill
                  sizes="25vw"
                  className="absolute object-cover rounded-md"
                />
              )}
            </div>
            <div className="flex justify-between">
              <span className="font-light">{product.name}</span>
              <span className="font-semibold">{product.priceData?.price}€</span>
            </div>
            {product.description && (
              <div
                className="text-sm mt-auto text-gray-500"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    product.description.substring(0, 140) + '...' || ''
                  ),
                }}
              ></div>
            )}
            <button className="text-xs w-max hover:bg-primary hover:text-white rounded-2xl ring-1 ring-primary text-primary py-2 px-4">
              Ajouter au panier
            </button>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductList;
