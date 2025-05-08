'use client';
import { getAllCategories } from '@/actions/categoriesCRUD';
import { getOneProduct, updateProduct } from '@/actions/productsCRUD';
import AdminAddColors from '@/components/admin/products/AdminAddColors';
import MultiSelect from '@/components/MultiSelect';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/Product';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'react-toastify';

const UpdateProduct = ({ params }: { params: { id: string } }) => {
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_IMAGES;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

  const [product, setProduct] = useState<Product>({} as Product);
  const [oldCategories, setOldCategories] = useState<
    { key: string; value: string }[]
  >([]);
  const router = useRouter();

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

  const [data, action, isPending] = useFormState(updateProduct, undefined);

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

  useEffect(() => {
    const getDatas = async () => {
      const catData = await getAllCategories();
      const productData = await getOneProduct(params.id);

      if (productData) {
        const defaultCategories = catData
          .filter((category) => {
            return productData.categories.some(
              (cat) => cat.$id === category.$id
            );
          })
          .map((category) => {
            return { key: category.$id, value: category.name };
          });
        setOldCategories(defaultCategories);
        setProduct(productData as Product);
      }

      if (catData) {
        const categories = catData.map((category) => ({
          key: category.$id,
          value: category.name,
        }));
        setCategoriesReturn(categories);
      }
    };
    getDatas();
  }, [params]);

  useEffect(() => {
    if (data) {
      if (data.error) {
        toast.error(data.error);
      } else if (data.success) {
        toast.success('Produit modifié', { autoClose: 2000 });
        router.push('/profile/admin');
      }
    }
  }, [data, router]);

  useEffect(() => {
    if (oldCategories.length > 0) {
      setSelectedCategories(oldCategories);
    } else {
      setSelectedCategories([]);
    }
    if (product && product.genres && product.genres.length > 0) {
      setSelectedGenres(
        product.genres.map((genre) => ({ key: genre, value: genre }))
      );
    } else {
      setSelectedGenres([]);
    }
  }, [oldCategories, product]);

  if (!product) {
    return <div>Aucun produit trouvé</div>;
  }

  const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${product.mainImage}/view?project=${projectId}`;
  const igmUrl2 = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${product.secondImage}/view?project=${projectId}`;
  const imgUrl3 = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${product.thirdImage}/view?project=${projectId}`;

  return (
    <main className="flex mt-12 flex-col w-full mx-auto items-center justify-center gap-3">
      <section className="flex  w-full flex-col items-center">
        <form
          ref={formRef}
          action={action}
          className="flex flex-col w-full items-center justify-center gap-8"
        >
          <input
            type="text"
            name="id"
            value={product.$id}
            hidden
            readOnly
            className=""
          />
          <div className="flex flex-col md:flex-row mx-auto w-full px-4 md:px-8 lg:px-32 gap-3 items-center justify-center">
            <div className="flex flex-col md:flex-row md:w-2/3 mx-auto w-full px-4 gap-2 items-center justify-center">
              <label htmlFor="name" className="text-slate-600 font-semibold">
                Nom
              </label>
              <input
                type="text"
                name="name"
                defaultValue={product.name}
                placeholder={product.name}
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
                defaultValue={product.price}
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
                defaultValues={selectedCategories}
                id="categories"
                name="Catégories"
                values={categoriesReturn}
                onChange={handleCategoriesChange}
              />
              <input
                type="hidden"
                name="categories"
                defaultValue={selectedCategories
                  .map((cat) => cat.key)
                  .join(',')}
              />
              <p>{selectedCategories.map((cat) => cat.value).join(', ')}</p>
            </div>
            <div className="flex flex-col lg:flex-row lg:w-1/2 mx-auto w-full gap-2 items-center justify-center">
              <label htmlFor="genres" className="text-slate-600 font-semibold">
                Genres
              </label>

              <MultiSelect
                defaultValues={selectedGenres}
                id="genres"
                name="Genres"
                values={genres}
                onChange={handleGenreChange}
              />
              <input
                type="hidden"
                name="genres"
                defaultValue={[...selectedGenres.map((genre) => genre.value)]}
              />
              <p>{selectedGenres.map((genre) => genre.value).join(', ')}</p>
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
              defaultValue={product.description}
              className=" flex-1 ring-1 w-full mx-auto py-3 px-4  ring-slate-200 rounded-md pl-2 text-sm md:text-medium bg-transparent outline-none"
            />
          </div>
          <div className="flex flex-col lg:flex-row mx-auto w-full gap-8 px-4 md:px-8 lg:px-16 xl:px-32 items-center justify-center">
            <div className="flex flex-col lg:w-1/3 mx-auto w-full px-4 gap-3 lg:gap-6 items-center justify-center">
              <label
                htmlFor="mainImage"
                className="text-slate-600 font-semibold"
              >
                Image Principale
              </label>
              <Image
                src={imageUrl}
                alt={'image principale'}
                width={100}
                height={100}
              />
              <button>
                <input
                  type="file"
                  name="mainImage"
                  placeholder="Changer l'image"
                  className="focus:outline-none "
                />
              </button>
            </div>
            <div className="flex flex-col  lg:w-1/3 mx-auto w-full px-4 gap-2 lg:gap-6  items-center justify-center">
              <label
                htmlFor="secondImage"
                className="text-slate-600 font-semibold"
              >
                Seconde Image
              </label>
              <Image
                src={igmUrl2}
                alt={'image secondaire'}
                width={100}
                height={100}
              />
              <button>
                <input
                  type="file"
                  name="secondImage"
                  className="focus:outline-none "
                />
              </button>
            </div>
            <div className="flex flex-col lg:w-1/3 mx-auto w-full px-4 gap-2 lg:gap-6  items-center justify-center">
              <label
                htmlFor="thirdImage"
                className="text-slate-600 font-semibold"
              >
                Troisième image
              </label>
              <Image
                src={imgUrl3}
                alt={'image tertiaire'}
                width={100}
                height={100}
              />
              <button>
                <input
                  placeholder="Changer l'image"
                  type="file"
                  name="thirdImage"
                  className="focus:outline-none "
                />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-6 items-center justify-center">
            <label htmlFor="sizes" className="text-slate-600 font-semibold">
              Couleurs & Tailles
            </label>
            {/* AJOUTER LE SYSTEME */}
            <AdminAddColors product={product} />
          </div>
          <Button
            disabled={isPending}
            variant={'outline'}
            type="submit"
            className="w-[70%]"
          >
            Modifier le produit
          </Button>
        </form>
      </section>
    </main>
  );
};

export default UpdateProduct;
