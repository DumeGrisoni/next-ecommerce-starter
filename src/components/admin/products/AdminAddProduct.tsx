'use client';
import React, { useEffect, useState } from 'react';
import { Models } from 'node-appwrite';

import { getAllCategories } from '@/actions/categoriesCRUD';
import { getAllColors } from '@/actions/colorsCRUD';
import MultiSelect from '@/components/MultiSelect';

const AdminAddProduct = () => {
  const [categoriesReturn, setCategoriesReturn] = useState<
    { key: string; value: string }[]
  >([]);
  const [colors, setColors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const genres = ['Homme', 'Femme', 'Enfant'];

  const getDatas = async () => {
    const catData = await getAllCategories();
    const colorsData = await getAllColors();
    if (catData && colorsData) {
      const categories = catData.map((category) => ({
        key: category.$id,
        value: category.name,
      }));
      setCategoriesReturn(categories);
    }
  };

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <main className="flex  flex-col w-full mx-auto items-center justify-center gap-3">
      <section className="flex  w-full flex-col items-center">
        <form className="flex flex-col w-full items-center justify-center gap-8">
          <div className="flex flex-col md:flex-row mx-auto w-full px-4 md:px-8 lg:px-32 gap-3 items-center justify-center">
            <div className="flex flex-col md:flex-row md:w-2/3 mx-auto w-full px-4 gap-2 items-center justify-center">
              <label htmlFor="name" className="text-slate-600 font-semibold">
                Nom
              </label>
              <input
                type="text"
                name="name"
                placeholder="Nom"
                className="ring-1 flex-1 w-full py-3 px-4 ring-slate-200 rounded-md pl-2 text-sm md:text-medium bg-transparent outline-none"
              />
            </div>

            <div className="flex flex-col md:flex-row md:w-1/3 mx-auto w-full px-4 gap-2 items-center justify-center">
              <label htmlFor="price" className="text-slate-600 font-semibold">
                Prix
              </label>
              <input
                type="number"
                name="price"
                placeholder="Prix"
                className="ring-1 w-full py-3 px-4 ring-slate-200 rounded-md pl-2 text-sm md:text-medium bg-transparent outline-none"
              />
            </div>

            <div className="flex flex-col md:flex-row md:w-1/3 mx-auto w-full px-4 gap-2 items-center justify-center">
              <label htmlFor="colors" className="text-slate-600 font-semibold">
                Catégorie
              </label>
              <MultiSelect
                values={categoriesReturn}
                onChange={(values) =>
                  setSelectedCategories(values.map((value) => value.value))
                }
              />
            </div>
          </div>

          <div className="flex flex-col mx-auto w-full px-8 gap-2 items-center justify-center md:w-[95%] lg:w-[80%]">
            <label htmlFor="desc" className="text-slate-600 font-semibold">
              Description
            </label>
            <textarea
              rows={6}
              name="desc"
              placeholder="Description"
              className=" flex-1 ring-1 w-full mx-auto py-3 px-4  ring-slate-200 rounded-md pl-2 text-sm md:text-medium bg-transparent outline-none"
            />
          </div>

          <div className="flex flex-col md:flex-row mx-auto w-full px-4 md:px-8 lg:px-32 gap-3 items-center justify-center">
            <div className="flex flex-col md:flex-row md:w-1/3 mx-auto w-full px-4 gap-2 items-center justify-center">
              <label htmlFor="name" className="text-slate-600 font-semibold">
                Nom
              </label>
              <input
                type="text"
                name="name"
                placeholder="Nom"
                className="ring-1 flex-1 w-full py-3 px-4 ring-slate-200 rounded-md pl-2 text-sm md:text-medium bg-transparent outline-none"
              />
            </div>

            <div className="flex flex-col md:flex-row md:w-2/3 mx-auto w-full px-4 gap-2 items-center justify-center">
              <label htmlFor="price" className="text-slate-600 font-semibold">
                Prix
              </label>
              <input
                type="number"
                name="price"
                placeholder="Prix"
                className="ring-1 w-full py-3 px-4 ring-slate-200 rounded-md pl-2 text-sm md:text-medium bg-transparent outline-none"
              />
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default AdminAddProduct;
