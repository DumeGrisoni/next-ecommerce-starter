'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const Pagination = ({
  currentPage,
  hasPrevious,
  hasNext,
  totalPages,
}: {
  currentPage: number;
  hasPrevious: boolean;
  hasNext: boolean;
  totalPages: number;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  if (totalPages === 1) return null;

  return (
    <div className="mt-12 flex justify-between items-center w-[80%] md:w-[50%] lg:w-[40%] xl:w-[30%] mx-auto">
      <button
        className="rounded-md bg-primary text-white p-2 text-sm w-24 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={!hasPrevious}
        onClick={() => createPageUrl(currentPage - 1)}
      >
        Précédent
      </button>
      <div className="w-24 flex flex-row justify-center items-center gap-8">
        <p className="text-gray-400">
          {currentPage === 0 ? <span>...</span> : currentPage}
        </p>
        <p className="text-lg">{currentPage + 1}</p>
        <p className="text-gray-400">
          {currentPage + 1 === totalPages ? <span>...</span> : currentPage + 2}
        </p>
      </div>
      <button
        className="rounded-md bg-primary text-white p-2 text-sm w-24 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={!hasNext}
        onClick={() => createPageUrl(currentPage + 1)}
      >
        Suivant
      </button>
    </div>
  );
};

export default Pagination;
