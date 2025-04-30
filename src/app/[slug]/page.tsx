import Add from '@/components/Add';
import CustomizeProduct from '@/components/CustomizeProduct';
import ProductImages from '@/components/ProductImages';
import React from 'react';

const SinglePage = () => {
  return (
    <main className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        {/* IMG */}
        <ProductImages />
      </div>

      {/* TEXT */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">Nom du produit</h1>
        <p className="text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
          possimus veritatis, eum sint saepe error consectetur illo
          exercitationem unde asperiores, repellendus rerum? Sapiente quidem
          distinctio ad laudantium qui accusantium ratione doloribus provident
          sed, laboriosam fugit molestiae fuga quam porro quis!
        </p>

        <div className="h-[2px] bg-gray-100" />

        <div className="flex items-center gap-4">
          <h3 className="text-xl text-gray-500 line-through">52€</h3>
          <h2 className="font-medium text-2xl">45€</h2>
        </div>
        <CustomizeProduct />
        <Add />

        <div className="h-[2px] bg-gray-100" />

        <div className="text-sm">
          <h4 className="font-medium mb-4">Title</h4>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt
            assumenda suscipit autem eveniet ad? Quia fuga nesciunt doloremque.
            Neque, sint.
          </p>
        </div>
        <div className="text-sm">
          <h4 className="font-medium mb-4">Title</h4>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt
            assumenda suscipit autem eveniet ad? Quia fuga nesciunt doloremque.
            Neque, sint.
          </p>
        </div>
        <div className="text-sm">
          <h4 className="font-medium mb-4">Title</h4>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt
            assumenda suscipit autem eveniet ad? Quia fuga nesciunt doloremque.
            Neque, sint.
          </p>
        </div>
      </div>
    </main>
  );
};

export default SinglePage;
