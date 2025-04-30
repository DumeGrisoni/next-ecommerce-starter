import React from 'react';

const Filter = () => {
  return (
    <section className="mt-12 flex justify-between">
      <div className="flex gap-6 flex-wrap">
        <select
          name="type"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
        >
          <option>Genre</option>
          <option value="homme">Homme</option>
          <option value="femme">Femme</option>
        </select>
        <input
          type="text"
          name="min"
          placeholder="Prix min"
          className="text-xs pl-2 rounded-2xl w-24 ring-1 ring-gray-400"
        />
        <input
          type="text"
          name="max"
          placeholder="Prix max"
          className="text-xs pl-2 rounded-2xl w-24 ring-1 ring-gray-400"
        />

        <select
          name="size"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
        >
          <option>Taille</option>
          <option value="size">Taille</option>
        </select>

        <select
          name="color"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
        >
          <option>Couleur</option>
          <option value="color">Couleur</option>
        </select>

        <select
          name="category"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
        >
          <option>Categorie</option>
          <option value="category">Categorie</option>
        </select>
      </div>
      <div className="">
        <select
          name=""
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400"
        >
          <option>Trier</option>
          <option value="">Desc</option>
          <option value="">Asc</option>
          <option value="">Nouveau</option>
          <option value="">Ancien</option>
        </select>
      </div>
    </section>
  );
};

export default Filter;
