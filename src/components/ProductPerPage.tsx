'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import React from 'react';
const ProductPerPage = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleProductPerPage = (e: any) => {
    const params = new URLSearchParams(searchParams);
    params.set('limit', e.target.value);
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <label className="flex items-center justify-center gap-3 w-80">
      <span className="text-sm ">Produits par page</span>
      <select
        onChange={handleProductPerPage}
        defaultValue={8}
        className="bg-white border w-max border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
      >
        <option value="8">8</option>
        <option value="16">16</option>
        <option value="20">20</option>
      </select>
    </label>
  );
};

export default ProductPerPage;
