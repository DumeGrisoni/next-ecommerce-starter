'use client';

import { useCartStore } from '@/hooks/useCartStore';
import { useWixClient } from '@/hooks/useWixClient';
import React, { useState } from 'react';

const Add = ({
  productId,
  variantId,
  stockNumber,
}: {
  productId: string;
  variantId: string;
  stockNumber: number;
}) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem, isLoading } = useCartStore();
  const wixClient = useWixClient();

  const handleQuantity = (type: string) => {
    if (type === 'd' && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === 'i' && quantity < stockNumber) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Quantité</h4>

      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-md flex items-center justify-between w-32">
            <button
              className="cursor-pointer text-xl"
              onClick={() => handleQuantity('d')}
            >
              -
            </button>
            {quantity}
            <button
              className="cursor-pointer text-xl"
              onClick={() => handleQuantity('i')}
            >
              +
            </button>
          </div>
          <div className="text-xs">
            Il ne reste que{' '}
            <span className="text-orange-500">{stockNumber} exemplaires</span> !
            <br /> Profitez-en !
          </div>
        </div>

        <button
          onClick={() => addItem(wixClient, productId, variantId, quantity)}
          disabled={isLoading}
          className="w-40 text-sm rounded-md ring-1 ring-primary text-primary py-2 px-4 hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-black disabled:ring-0"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default Add;
