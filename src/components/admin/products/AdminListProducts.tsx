import { getAllProducts } from '@/actions/productsCRUD';
import React from 'react';

const AdminListProducts = async () => {
  const products = await getAllProducts();

  return (
    <div className="flex flex-col gap-6 py-2 px-4 items-center justify-between">
      {products.map((product) => {
        return (
          <div key={product.$id} className="flex gap-6 items-center">
            <p>{product.name}</p>
            <p>{product.price} €</p>
          </div>
        );
      })}
    </div>
  );
};

export default AdminListProducts;
