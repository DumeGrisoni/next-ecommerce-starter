'use client';
import React, { use, useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';

import { getAllProducts } from '@/actions/productsCRUD';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { Product } from '@/types/Product';

const AdminListProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_IMAGES;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getAllProducts();
      setProducts(products);
    };
    fetchProducts();
  }, []);

  const handleUpdate = (id: string) => {
    router.push(`/profile/admin/products/${id}`);
  };

  return (
    <div className="w-full lg:w-2/3 mx-auto flex flex-col gap-6 py-2 px-4 items-center justify-between">
      {products.length === 0 ? (
        <p>Aucun produit trouvé</p>
      ) : (
        <Table>
          <TableCaption>Liste des produits</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">STATUS</TableHead>
              <TableHead>IMAGE</TableHead>
              <TableHead>NOM</TableHead>
              <TableHead className="text-right">PRIX</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              const imgUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${product.mainImage}/view?project=${projectId}`;
              return (
                <TableRow
                  key={product.id}
                  onClick={() => {
                    handleUpdate(product.$id);
                  }}
                  className="cursor-pointer "
                >
                  <TableCell className="font-medium">
                    {/* A CHANGER */}
                    En ligne
                  </TableCell>
                  <TableCell>
                    <Image
                      src={imgUrl}
                      alt={product.name}
                      width={50}
                      height={50}
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell className="text-right">
                    {product.price} €
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AdminListProducts;
