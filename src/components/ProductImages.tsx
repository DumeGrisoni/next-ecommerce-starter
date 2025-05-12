'use client';
import Image from 'next/image';
import React, { useState } from 'react';

const ProductImages = ({ items }: { items: any }) => {
  const [index, setIndex] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setIndex(index);
    setIsSelected(true);
  };

  return (
    <section>
      <div className="h-[500px] relative">
        <Image
          src={
            isSelected
              ? items[selectedIndex].image?.url
              : items[index].image?.url
          }
          fill
          sizes="50vw"
          alt={'woman'}
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex gap-4 items-center justify-center mt-8">
        {items.map((item: any, index: number) => (
          <div
            key={item._id}
            className={`w-1/4 h-32 relative gap-4 mt-8 rounded-md cursor-pointer border border-white ${
              selectedIndex === index ? 'border-slate-200' : ''
            }`}
            style={{
              borderColor: selectedIndex === index ? '#c4ccd7' : 'white',
            }}
            onClick={() => {
              setIndex(index);
              setSelectedIndex(index);
              handleImageClick(index);
            }}
          >
            <Image
              src={item.image?.url}
              fill
              priority
              sizes="30vw"
              alt={'Images'}
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductImages;
