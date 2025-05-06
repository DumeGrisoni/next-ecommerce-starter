'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { getAllCategories } from '@/actions/categoriesCRUD';
import MultiSelect from '@/components/MultiSelect';
import { Button } from '@/components/ui/button';
import { useFormState } from 'react-dom';
import { createProduct } from '@/actions/productsCRUD';
import { toast } from 'react-toastify';

const AdminAddProduct = () => {
  const [categoriesReturn, setCategoriesReturn] = useState<
    { key: string; value: string }[]
  >([]);
  const [selectedCategories, setSelectedCategories] = useState<
    { key: string; value: string }[]
  >([]);
  const [selectedGenres, setSelectedGenres] = useState<
    { key: string; value: string }[]
  >([]);

  const genres = [
    { key: 'Homme', value: 'Homme' },
    { key: 'Femme', value: 'Femme' },
    { key: 'Enfant', value: 'Enfant' },
  ];

  const formRef = useRef<HTMLFormElement>(null);

  const [data, action, isPending] = useFormState(createProduct, undefined);

  const handleCategoriesChange = useCallback(
    (values: { key: string; value: string }[]) => {
      setSelectedCategories(values);
    },
    []
  );
  const handleGenreChange = useCallback(
    (values: { key: string; value: string }[]) => {
      setSelectedGenres(values);
    },
    []
  );

  const getDatas = async () => {
    const catData = await getAllCategories();

    if (catData) {
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

  useEffect(() => {
    if (data) {
      if (data.error) {
        toast.error(data.error);
      } else if (data.success) {
        toast.success('Produit ajouté', { autoClose: 2000 });
        formRef.current?.reset();
        setSelectedCategories([]);
        setSelectedGenres([]);
      }
    }
  }, [data]);

  return (
    <main className="flex mt-12 flex-col w-full mx-auto items-center justify-center gap-3">
      <section className="flex  w-full flex-col items-center">
        <form
          ref={formRef}
          action={action}
          className="flex flex-col w-full items-center justify-center gap-8"
        >
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
                type="text"
                name="price"
                placeholder="Prix"
                className="ring-1 w-full py-3 px-4 ring-slate-200 rounded-md pl-2 text-sm md:text-medium bg-transparent outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row mx-auto w-full px-4 md:px-8 lg:px-32 gap-3 items-center justify-center">
            <div className="flex flex-col lg:flex-row lg:w-1/2 mx-auto w-full  gap-2 items-center justify-center">
              <label
                htmlFor="categories"
                className="text-slate-600 font-semibold"
              >
                Catégories
              </label>
              <MultiSelect
                id="categories"
                name="Catégories"
                values={categoriesReturn}
                onChange={handleCategoriesChange}
              />
              <input
                type="hidden"
                name="categories"
                value={selectedCategories.map((cat) => cat.key).join(',')}
              />
              <p>{selectedCategories.map((cat) => cat.value).join(',')}</p>
            </div>
            <div className="flex flex-col lg:flex-row lg:w-1/2 mx-auto w-full gap-2 items-center justify-center">
              <label htmlFor="genres" className="text-slate-600 font-semibold">
                Genres
              </label>

              <MultiSelect
                id="genres"
                name="Genres"
                values={genres}
                onChange={handleGenreChange}
              />
              <input
                type="hidden"
                name="genres"
                value={[...selectedGenres.map((genre) => genre.value)]}
              />
            </div>
          </div>

          <div className="flex flex-col mx-auto w-full px-8 gap-2 items-center justify-center md:w-[95%] lg:w-[80%]">
            <label
              htmlFor="description"
              className="text-slate-600 font-semibold"
            >
              Description
            </label>
            <textarea
              rows={6}
              name="description"
              placeholder="Description"
              className=" flex-1 ring-1 w-full mx-auto py-3 px-4  ring-slate-200 rounded-md pl-2 text-sm md:text-medium bg-transparent outline-none"
            />
          </div>
          <div className="flex flex-col lg:flex-row mx-auto w-full gap-8 px-4 md:px-8 lg:px-32 items-center justify-center">
            <div className="flex flex-col lg:flex-row lg:w-1/3 mx-auto w-full px-4 gap-3 items-center justify-center">
              <label
                htmlFor="mainImage"
                className="text-slate-600 font-semibold"
              >
                Image Principale
              </label>
              <button>
                <input
                  type="file"
                  name="mainImage"
                  className="focus:outline-none "
                />
              </button>
            </div>
            <div className="flex flex-col lg:flex-row lg:w-1/3 mx-auto w-full px-4 gap-2 items-center justify-center">
              <label
                htmlFor="secondImage"
                className="text-slate-600 font-semibold"
              >
                Image 2
              </label>
              <button>
                <input
                  type="file"
                  name="secondImage"
                  className="focus:outline-none "
                />
              </button>
            </div>
            <div className="flex flex-col lg:flex-row lg:w-1/3 mx-auto w-full px-4 gap-2 items-center justify-center">
              <label
                htmlFor="thirdImage"
                className="text-slate-600 font-semibold"
              >
                Image 3
              </label>
              <button>
                <input
                  type="file"
                  name="thirdImage"
                  className="focus:outline-none "
                />
              </button>
            </div>
          </div>
          <Button
            disabled={isPending}
            variant={'outline'}
            type="submit"
            className="w-[70%]"
          >
            Créer le Produit
          </Button>
        </form>
      </section>
    </main>
  );
};

export default AdminAddProduct;
