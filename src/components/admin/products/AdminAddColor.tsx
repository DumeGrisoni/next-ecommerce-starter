'use client';
import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useFormState } from 'react-dom';

import { createColor, getAllColors } from '@/actions/colorsCRUD';
import { Button } from '@/components/ui/button';
const AdminAddColor = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [data, action, isPending] = useFormState(createColor, undefined);

  useEffect(() => {
    if (data) {
      if (data.error) {
        toast.error("Une erreur est survenue lors de l'ajout de la couleur");
      } else if (data.success) {
        toast.success('Couleur ajoutée', { autoClose: 2000 });
        formRef.current?.reset();
      }
    }
  }, [data]);

  return (
    <main className="flex  flex-col w-full mx-auto items-center justify-center gap-3 mb-20">
      <section className="flex  w-full flex-col items-center">
        <h1 className="font-semibold text-xl text-slate-500 my-6">
          Ajouter une couleur
        </h1>
        <form
          ref={formRef}
          action={action}
          className="flex flex-col w-full items-center justify-center gap-8"
        >
          <div className="flex flex-col md:flex-row mx-auto w-full px-4 md:px-8 lg:px-32 gap-3 items-center justify-center">
            <div className="flex flex-col md:flex-row md:w-2/3 mx-auto w-full px-4 gap-2 items-center justify-center">
              <label htmlFor="name" className="text-slate-600 font-semibold">
                Nom de la couleur
              </label>
              <input
                type="text"
                name="name"
                placeholder="Nom"
                className="ring-1 flex-1 w-full py-3 px-4 ring-slate-200 rounded-md pl-2 text-sm md:text-medium bg-transparent outline-none"
              />
            </div>
            <div className="flex flex-col md:flex-row md:w-1/3 mx-auto w-full px-4 gap-2 items-center justify-start">
              <label htmlFor="hex" className="text-slate-600 font-semibold">
                Couleur affichée
              </label>
              <div className="flex flex-row items-center justify-center gap-2">
                <input type="color" name="hex" className="h-10 w-10" />
              </div>
            </div>
          </div>
          <Button
            disabled={isPending}
            variant={'outline'}
            type="submit"
            className="w-[70%]"
          >
            <span className="font-semibold">Ajouter la couleur</span>
          </Button>
        </form>
      </section>
    </main>
  );
};

export default AdminAddColor;
