import Filter from '@/components/Filter';
import ProductList from '@/components/ProductList';
import { wixClientServer } from '@/lib/wixClientServer';
import Image from 'next/image';
import React, { Suspense } from 'react';

const List = async ({ searchParams }: { searchParams: any }) => {
  const wixClient = await wixClientServer();

  const cat = await wixClient.collections.getCollectionBySlug(
    searchParams.cat || 'all-products'
  );
  const allCats = await wixClient.collections.queryCollections().find();

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 ">
      {/* CAMPAIGN */}
      <div className="hidden bg-pink-50 px-4 sm:flex justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
            Obtenez 50% <br /> sur les produits de la semaine
          </h1>
          <button className="rounded-3xl bg-primary text-white w-max py-3 px-5 text-sm">
            En savoir plus
          </button>
        </div>
        <div className="relative w-1/3">
          <Image src="/woman.png" alt="woman" fill className="object-contain" />
        </div>
      </div>
      {/* FILTER */}
      <Filter allCats={allCats.items} />
      {/* PRODUCTS */}
      <h1 className="mt-12 text-xl font-semibold">
        {cat?.collection?.name === 'All Products'
          ? 'Tous les articles'
          : cat?.collection?.name}{' '}
        rien que pour vous!
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductList
          categoryId={
            cat.collection?._id || '00000000-000000-000000-000000000001'
          }
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
};

export default List;
