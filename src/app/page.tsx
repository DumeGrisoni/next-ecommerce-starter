import CategoryList from '@/components/CategoryList';
import ProductList from '@/components/ProductList';
import Slider from '@/components/Slider';
import { Suspense } from 'react';

const HomePage = () => {
  return (
    <div className="">
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">Produits de la semaine</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductList
            categoryId={process.env.WIX_CATEGORY_FEATURED as string}
            limit={4}
          />
        </Suspense>
      </div>
      <div className="mt-24">
        <h1 className="text-2xl mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">
          Catégories
        </h1>
        <CategoryList />
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">Nouveautés</h1>
        {/* <NewProducts productsData={products} /> */}
      </div>
    </div>
  );
};

export default HomePage;
