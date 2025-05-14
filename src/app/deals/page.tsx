import ProductList from '@/components/ProductList';
import { wixClientServer } from '@/lib/wixClientServer';

import React, { Suspense } from 'react';

const Deals = async () => {
  const wixClient = await wixClientServer();
  return (
    <div className="mt-12 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64  flex flex-col">
      <h1 className="text-3xl text-center">Tous nos produits en promotions</h1>
      <Suspense fallback={<div>Chargement...</div>}>
        <ProductList
          isModifiable={false}
          categoryId={'7c27805d-ce23-98c6-0f63-b9160951f183'}
        />
      </Suspense>
    </div>
  );
};

export default Deals;
