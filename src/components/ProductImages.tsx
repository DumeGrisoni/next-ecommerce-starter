'use client';
import Image from 'next/image';
import React, { useState } from 'react';

import { Product } from '@/types/Product';

const images = [
  { id: 1, url: '/woman2.jpg' },
  { id: 2, url: '/woman3.jpg' },
  { id: 3, url: '/woman.png' },
];

const ProductImages = ({ product }: { product: Product }) => {
  const [index, setIndex] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setIndex(index);
    setIsSelected(true);
  };
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_IMAGES;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

  const images = [
    {
      id: 1,
      url: `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${product.mainImage}/view?project=${projectId}`,
    },
    {
      id: 2,
      url: `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${product.secondImage}/view?project=${projectId}`,
    },
    {
      id: 3,
      url: `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${product.thirdImage}/view?project=${projectId}`,
    },
  ];

  return (
    <section>
      <div className="h-[500px] relative">
        <Image
          src={images[index].url}
          fill
          sizes="50vw"
          alt={'woman'}
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex gap-4 items-center justify-between mt-8">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`w-1/4 h-32 relative gap-4 mt-8 rounded-md cursor-pointer border border-white ${
              selectedIndex === index ? 'border-slate-400' : ''
            }`}
            onClick={() => {
              setIndex(index);
              setSelectedIndex(index);
              handleImageClick(index);
            }}
          >
            <Image
              src={image.url}
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
