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
  const [selectedColor, setSelectedColor] = useState<Color>({} as Color);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [stocks, setStocks] = useState<{ [key: string]: number | undefined }>(
    {}
  );
  const [returnVariant, setReturnVariants] = useState<
    {
      color: Color;
      size: string;
      stock: number;
    }[]
  >([]);

  const handleSelection = () => {};

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
    console.log('color', selectedColor);
  }, [selectedColor]);

  if (!colors) return <div></div>;

  return (
    <div className="flex flex-col gap-6">
      <form
        action=""
        className="flex flex-col items-center justify-center gap-6"
      >
        <div className="flex flex-row gap-3 items-center justify-center">
          <label htmlFor="color" className="font-semibold">
            Couleurs
          </label>
          <select
            name="color"
            id="color"
            defaultValue={''}
            onChange={(event: React.FormEvent<HTMLSelectElement>) => {
              const selectedColor = colors.find(
                (color) => color.$id === event.currentTarget.value
              );
              setSelectedColor(selectedColor ?? ({} as Color));
            }}
          >
            <option value={''} disabled selected>
              Sélectionner
            </option>
            {colors &&
              colors.map((color) => (
                <option key={color.$id} value={color.$id}>
                  {color.name}
                </option>
              ))}
          </select>
        </div>
      </form>
      {selectedColor.hex && (
        <div className="flex flex-row gap-3 items-center justify-center">
          <div
            style={{
              backgroundColor: selectedColor.hex,
              height: '30px',
              width: '30px',
              borderRadius: '50%',
              border: '1px solid black',
            }}
          />
          <div>
            <label htmlFor="size">Taille</label>
            <select
              name="size"
              id="size"
              onChange={(event: React.FormEvent<HTMLSelectElement>) => {
                setSelectedSize(event.currentTarget.value);
              }}
            >
              <option value={''} disabled selected>
                Sélectionner
              </option>
              {sizes &&
                sizes.map((size) => (
                  <option key={size.$id} value={size.$id}>
                    {size.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAddColors;
