'use client';
import React, { useEffect, useState } from 'react';
// import slides from '../constants';
import Link from 'next/link';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    title: 'Collection Promos Eté',
    description: "Jusqu'à 50% !",
    img: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800',
    url: '/',
    bg: 'bg-gradient-to-r from-yellow-50 to-pink-50',
  },
  {
    id: 2,
    title: 'Winter is Coming',
    description: 'Profitez des meilleures offres !',
    img: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800',
    url: '/',
    bg: 'bg-gradient-to-r from-pink-50 to-blue-50',
  },
  {
    id: 3,
    title: 'Le printemps est arrivé',
    description: "Dès maintenant jusqu'a 70% de reduction !",
    img: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800',
    url: '/',
    bg: 'bg-gradient-to-r from-blue-50 to-yellow-50',
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="h-[calc(100vh-80px)] overflow-hidden">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`${slide.bg} w-screen h-full flex flex-col gap-16 xl:flex-row `}
          >
            {/* TEXT */}
            <div className=" h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-8 xl:gap-12 text-center">
              <h2 className="text-xl lg:text-3xl xl:text-5xl">
                {slide.description}
              </h2>
              <h1 className="text-5xl lg:text-6xl xl:text-8xl font-semibold">
                {slide.title}
              </h1>
              <Link href={slide.url}>
                <button className="rounded-md bg-black text-white py-2 px-4">
                  Découvrir
                </button>
              </Link>
            </div>

            {/* IMAGE */}
            <div className="h-1/2 xl:w-1/2 xl:h-full relative">
              <Image
                src={slide.img}
                alt="image"
                fill
                sizes="100%"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute m-auto left-1/2 bottom-8 flex gap-4">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
              current === index ? 'scale-150' : ''
            }`}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] bg-gray-600 rounded-full " />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Slider;
