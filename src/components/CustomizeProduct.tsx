'use client';
import { products } from '@wix/stores';
import React, { useEffect, useState } from 'react';
import Add from './Add';

const CustomizeProduct = ({
  productId,
  variants,
  productOptions,
}: {
  productId: string;
  variants: products.Variant[];
  productOptions: products.ProductOption[];
}) => {
  //------------------ Hooks -----------------------------------------------------
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});

  const [selectedVariant, setSelectedVariant] = useState<products.Variant>();

  //------------------ Functions -----------------------------------------------------

  const handleOptionSelect = (optionType: string, choice: string) =>
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [optionType]: choice,
    }));

  const isVariantInStock = (choices: { [key: string]: string }) => {
    return variants.some((variant) => {
      const variantChoices = variant.choices;
      if (!variantChoices) return false;
      return (
        Object.entries(choices).every(
          ([Key, value]) => variantChoices[Key] === value
        ) &&
        variant.stock?.inStock &&
        variant.stock.quantity &&
        variant.stock.quantity > 0
      );
    });
  };

  //------------------ Use Effects -----------------------------------------------------

  useEffect(() => {
    const variant = variants.find((variant) => {
      const variantChoices = variant.choices;
      if (!variantChoices) return false;
      return Object.entries(selectedOptions).every(
        ([Key, value]) => variantChoices[Key] === value
      );
    });

    setSelectedVariant(variant);
  }, [selectedOptions, variants]);

  //------------------ Render -----------------------------------------------------

  return (
    <section className="flex flex-col gap-6 ">
      {productOptions.map((option) => (
        <div key={option.name} className="flex flex-col gap-4">
          <h4 className="font-medium">Choisir une {option.name}</h4>
          <ul className="flex items-center gap-3">
            {option.choices?.map((choice) => {
              const disabled = !isVariantInStock({
                ...selectedOptions,
                [option.name!]: choice.description!,
              });
              const selected =
                selectedOptions[option.name!] === choice.description!;

              const clickHandler = disabled
                ? undefined
                : () => handleOptionSelect(option.name!, choice.description!);

              return option.name === 'Couleur' ? (
                <li
                  className="w-8 h-8 rounded-full ring-gray-300 ring-1 relative"
                  style={{
                    backgroundColor: choice.value,
                    cursor: disabled ? 'not-allowed' : 'pointer',
                  }}
                  onClick={clickHandler}
                  key={choice.description}
                >
                  {selected && (
                    <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  )}
                  {disabled && (
                    <div className="absolute w-10 h-[2px] bg-red-500 rotate-45 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  )}
                </li>
              ) : (
                <li
                  onClick={clickHandler}
                  key={choice.description}
                  style={{
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    backgroundColor: selected
                      ? '#f35c7a'
                      : disabled
                      ? 'lightGray'
                      : 'white',
                    color: selected || disabled ? 'white' : 'black',
                    boxShadow: disabled ? 'none' : '',
                  }}
                  className="ring-1  ring-primary text-primary rounded-md py-1 px-4 text-sm "
                >
                  {choice.description}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <Add
        productId={productId}
        variantId={
          selectedVariant?._id || '00000000-0000-0000-0000-000000000000'
        }
        stockNumber={selectedVariant?.stock?.quantity || 0}
      />
    </section>
  );
};

export default CustomizeProduct;
