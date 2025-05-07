import {
  deleteProduct,
  getAllProducts,
  getOneProduct,
} from '@/actions/productsCRUD';
import Add from '@/components/Add';
import CustomizeProduct from '@/components/CustomizeProduct';
import ProductImages from '@/components/ProductImages';
import { Product } from '@/types/Product';
import Image from 'next/image';
import React from 'react';

const SinglePage = async ({ params }: { params: { slug: string } }) => {
  const id = params.slug;
  const products = await getAllProducts();
  const productData = products.find((product) => product.$id === id);
  const relatedProducts = products.filter(
    (product) => product.category === productData?.category
  );
  const filteredRelatedProduct = relatedProducts.slice(0, 3);

  const ristourne = (productData?.price as number) * 0.8;

  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_IMAGES;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

  return (
    <main className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        {/* IMG */}
        <ProductImages product={productData as Product} />
      </div>

      {/* TEXT */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{productData?.name}</h1>
        <p className="text-gray-500">{productData?.description}</p>

        <div className="h-[2px] bg-gray-100" />

        <div className="flex items-center gap-4">
          <h3 className="text-xl text-gray-500 line-through">
            {productData?.price}€
          </h3>
          <h2 className="font-medium text-2xl">{ristourne.toFixed(2)}€</h2>
        </div>
        <CustomizeProduct product={productData as Product} />
        <Add />

        <div className="h-[2px] bg-gray-100" />
        {/* RELATED PRODUCTS */}

        {filteredRelatedProduct.length > 0 && (
          <>
            <h2 className="text-xl font-medium">Produits similaires</h2>
            <div className="flex w-full flex-col gap-4 items-start justify-between">
              {filteredRelatedProduct.map((product) => {
                const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${product?.mainImage}/view?project=${projectId}`;
                return (
                  <div
                    key={product.$id}
                    className="w-[70%]  cursor-pointer hover:scale-110 px-4 py-2 rounded-md flex items-center justify-start gap-6"
                  >
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      width={100}
                      height={100}
                      className="rounded-full"
                    />
                    <h3 className="text-start font-light w-max flex-1">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 font-light">{product.price}€</p>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default SinglePage;
