'use client';
import Image from 'next/image';
import React, { useState } from 'react';

const images = [
  { id: 1, url: '/woman2.jpg' },
  { id: 2, url: '/woman3.jpg' },
  { id: 3, url: '/woman.png' },
];

const ProductImages = () => {
  const [index, setIndex] = useState(0);
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
            className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer"
            onClick={() => setIndex(index)}
          >
            <Image
              src={image.url}
              fill
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
