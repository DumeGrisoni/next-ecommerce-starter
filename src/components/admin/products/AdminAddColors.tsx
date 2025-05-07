'use client';
import { getAllColors } from '@/actions/colorsCRUD';
import { getAllSizes } from '@/actions/sizesCRUD';
import { Color } from '@/types/Color';
import { Product } from '@/types/Product';
import { Size } from '@/types/Size';
import React, { useEffect, useState } from 'react';

const AdminAddColors = ({ product }: { product?: Product }) => {
  const [colors, setColors] = useState<Color[]>([] as Color[]);
  const [sizes, setSizes] = useState<Size[]>([] as Size[]);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [stocks, setStocks] = useState<{ [key: string]: number | undefined }>(
    {}
  );

  useEffect(() => {
    const getColors = async () => {
      const colorsData = await getAllColors();
      setColors(colorsData as Color[]);
    };
    getColors();

    const getSizes = async () => {
      const sizesData = await getAllSizes();
      setSizes(sizesData as Size[]);
    };
    getSizes();
  }, []);

  useEffect(() => {
    console.log(colors);
  }, [colors]);

  return <div className="flex flex-row gap-6"></div>;
};

export default AdminAddColors;
