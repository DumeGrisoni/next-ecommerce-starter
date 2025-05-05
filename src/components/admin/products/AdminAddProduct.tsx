'use client';
import { getAllCategories } from '@/actions/categoriesCRUD';
import { getAllColors } from '@/actions/colorsCRUD';
import React from 'react';

const AdminAddProduct = () => {
  const [categories, setCategories] = React.useState([]);
  const [colors, setColors] = React.useState([]);
  const [genres, setGenres] = React.useState([]);

  const getDatas = async () => {
    const catData = getAllCategories();
    const colorsData = getAllColors();
    const genresData = getAllGenres();
  };

  return (
    <main className="flex  flex-col w-full mx-auto items-center justify-center gap-3">
      <section className="flex  w-full flex-col items-center">
        <form className="flex flex-col w-full items-center justify-center gap-3">
          <div className="flex flex-col md:flex-row mx-auto w-full px-4 md:px-16 lg:px-32 gap-2 items-center justify-center">
            <div className="flex flex-col md:flex-row md:w-2/3 mx-auto w-full px-4 gap-2 items-center justify-center">
              <label htmlFor="name" className="text-slate-600 font-semibold">
                Nom du produit
              </label>
              <input
                type="text"
                name="name"
                placeholder="Nom"
                className="ring-1 w-full py-3 px-4 ring-slate-200 rounded-md pl-2 text-sm md:text-medium bg-transparent outline-none"
              />
            </div>

            <div className="flex flex-col md:flex-row md:w-1/3 mx-auto w-full px-4 gap-2 items-center justify-center">
              <label htmlFor="price" className="text-slate-600 font-semibold">
                Prix du produit
              </label>
              <input
                type="number"
                name="price"
                placeholder="Prix"
                className="ring-1 w-full py-3 px-4 ring-slate-200 rounded-md pl-2 text-sm md:text-medium bg-transparent outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col  mx-auto w-full px-8 md:px-0 gap-2 items-center justify-center">
            <label htmlFor="desc" className="text-slate-600 font-semibold">
              Description du produit
            </label>
            <textarea
              rows={6}
              name="desc"
              placeholder="Description"
              className="ring-1 w-full md:w-[75%] mx-auto py-3 px-4  ring-slate-200 rounded-md pl-2 text-sm md:text-medium bg-transparent outline-none"
            />
          </div>
        </form>
      </section>
    </main>
  );
};

export default AdminAddProduct;
