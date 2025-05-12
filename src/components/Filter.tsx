'use client';

import { collections } from '@wix/stores';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const Filter = ({ allCats }: { allCats: collections.Collection[] }) => {
  //------------------ Hooks -----------------------------------------------------
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  //------------------ Functions -----------------------------------------------------

  const handleFilterChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`);
  };
  const filteredCats = allCats.filter(
    (cat) =>
      cat.name !== 'All Products' &&
      cat.name !== 'Featured' &&
      cat.name !== 'New Arrivals' &&
      cat.name !== 'Homme' &&
      cat.name !== 'Femme' &&
      cat.name !== 'Enfant'
  );
  //------------------ Render -----------------------------------------------------

  return (
    <section className="mt-12 flex justify-between">
      <div className="flex gap-6 flex-wrap">
        <select
          name="genre"
          id="genre"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
          onChange={handleFilterChange}
        >
          <option disabled selected>
            Genre
          </option>
          <option value="homme">Homme</option>
          <option value="femme">Femme</option>
          <option value="enfant">Enfant</option>
        </select>

        <input
          type="text"
          name="min"
          placeholder="Prix min"
          className="text-xs pl-2 rounded-2xl w-24 ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="max"
          placeholder="Prix max"
          className="text-xs pl-2 rounded-2xl w-24 ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />

        <select
          name="cat"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
          onChange={handleFilterChange}
        >
          <option disabled selected>
            Categorie
          </option>
          {filteredCats.map((cat: collections.Collection) => (
            <option key={cat._id as string} value={cat.slug as string}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="">
        <select
          name="sort"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400"
          onChange={handleFilterChange}
        >
          <option disabled selected>
            Trier
          </option>
          <option value="asc price">Asc</option>
          <option value="desc price">Desc</option>
          <option value="asc lastUpdated">Nouveau</option>
          <option value="des lastUpdated">Ancien</option>
        </select>
      </div>
    </section>
  );
};

export default Filter;
