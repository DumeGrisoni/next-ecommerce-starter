'use client';
import Image from 'next/image';
import React from 'react';

const CartModal = () => {
  const cartItems = true;

  return (
    <div className="absolute w-max flex flex-col gap-6 bg-white z-20 top-12 right-0 text-sm p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      {!cartItems ? (
        <p>Votre panier est vide</p>
      ) : (
        <>
          <h2 className="text-xl">Mon Panier</h2>
          <div className="flex flex-col gap-8">
            {/* ITEM */}
            <div className="flex gap-4">
              <Image
                src={'/woman3.jpg'}
                width={72}
                height={96}
                alt={'cartItem'}
                className="object-cover rounded-md"
              />
              <div className="flex flex-col justify-between w-full">
                {/* TOP */}
                <div>
                  <div>
                    <div className="flex items-center justify-between gap-8">
                      <h3 className="font-semibold">Nom du produit</h3>
                      <p className="p-1 bg-gray-50 rounded-sm">155,55€</p>
                    </div>
                    <p className="text-sm text-gray-500">Available</p>
                  </div>
                </div>
                {/* BOTTOM */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Quantity : <span>1</span>
                  </span>
                  <span className="text-blue-500">Retirer</span>
                </div>
              </div>
            </div>

            {/* ITEM 2 */}
            <div className="flex gap-4">
              <Image
                src={'/woman2.jpg'}
                width={72}
                height={96}
                alt={'cartItem'}
                className="object-cover rounded-md"
              />
              <div className="flex flex-col justify-between w-full">
                {/* TOP */}
                <div>
                  <div>
                    <div className="flex items-center justify-between gap-8">
                      <h3 className="font-semibold">Nom du produit</h3>
                      <p className="p-1 bg-gray-50 rounded-sm">155,55€</p>
                    </div>
                    <p className="text-sm text-gray-500">Available</p>
                  </div>
                </div>
                {/* BOTTOM */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Quantity : <span>1</span>
                  </span>
                  <span className="text-blue-500">Retirer</span>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center font-semibold">
              <span>Subtotal</span>
              <span>375,10€</span>
            </div>
            <p className="text-gray-500  text-xs mt-2 mb-4">
              Taxes et Livraison au moment de la commande
            </p>
            <div className="flex justify-between text-sm">
              <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
                Voir le panier
              </button>
              <button className="rounded-md py-3 px-4 bg-black text-white">
                Payer
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
