'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { media as wixMedia } from '@wix/sdk';

import { useWixClient } from '@/hooks/useWixClient';
import { useCartStore } from '@/hooks/useCartStore';
const CartModal = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const wixClient = useWixClient();
  const { cart, removeItem, isLoading } = useCartStore();
  const totalPriceRef = useRef(0);

  useEffect(() => {
    function calculateTotalPrice() {
      cart?.lineItems?.forEach((lineItem) => {
        if (!lineItem?.price?.amount || !lineItem?.quantity) return;
        const amount = parseFloat(lineItem?.price?.amount);
        totalPriceRef.current += amount * lineItem?.quantity;
      });
      setTotalPrice(totalPriceRef.current);
    }
    totalPriceRef.current = 0; // Réinitialise la valeur à chaque fois que le composant est rendu
    calculateTotalPrice();
  }, [cart]);

  return (
    <div className="absolute w-max flex flex-col gap-6 bg-white z-20 top-12 right-0 text-sm p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      {!cart.lineItems ? (
        <p>Votre panier est vide</p>
      ) : (
        <>
          <h2 className="text-xl">Mon Panier</h2>
          <div className="flex flex-col gap-8">
            {/* ITEM */}
            {cart.lineItems.map((item) => (
              <div className="flex gap-4" key={item._id}>
                {item.image && (
                  <Image
                    src={wixMedia.getScaledToFillImageUrl(
                      item.image,
                      72,
                      96,
                      {}
                    )}
                    width={72}
                    height={96}
                    alt={'cartItem'}
                    className="object-cover rounded-md"
                  />
                )}
                <div className="flex flex-col justify-between w-full">
                  {/* TOP */}
                  <div>
                    <div>
                      <div className="flex items-center justify-between gap-8">
                        <h3 className="font-semibold">
                          {item.productName?.original}
                        </h3>
                        <div className="p-1 items-center justify-center rounded-sm flex flex-row gap-2">
                          {item.quantity && item.quantity > 1 && (
                            <div className="text-xs text-gray-500">
                              {item.quantity} X{' '}
                            </div>
                          )}
                          {item.price?.amount}€
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">
                        {item.availability?.status ? (
                          'En stock'
                        ) : (
                          <span className="text-red-400">
                            En rupture de stock
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  {/* BOTTOM */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Quantité : <span>{item.quantity}</span>
                    </span>
                    <span
                      className="text-blue-500 hover:underline"
                      onClick={() => removeItem(wixClient, item._id!)}
                      style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
                    >
                      Retirer
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="">
            <div className="flex justify-between items-center font-semibold">
              <span>Total</span>
              <span>{totalPrice}€</span>
            </div>
            <p className="text-gray-500  text-xs mt-2 mb-4">
              Taxes et Livraison au moment de la commande
            </p>
            <div className="flex justify-between text-sm">
              <button
                className="rounded-md py-3 px-4 ring-1 ring-gray-300 disabled:opacity-75 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                Mon panier
              </button>
              <button
                className="rounded-md py-3 px-4 bg-black text-white disabled:opacity-75 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                Valider mon panier
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
