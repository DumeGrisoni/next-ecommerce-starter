import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

import Menu from './Menu';
import SearchBar from './SearchBar';
import NavBarIcons from './NavBarIcons';

const Navbar = () => {
  return (
    <nav className="h-20 max-w-screen px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/* MOBILE  */}
      <div className="h-full flex items-center justify-between lg:hidden">
        <Link href={'/'}>
          <p className="text-2xl tracking-wide">NOVAMARKET</p>
        </Link>
        <SearchBar />
        <Menu isDesktop={false} />
      </div>
      {/* TABLET & PC */}
      <div className="hidden lg:flex items-center h-full justify-between gap-8">
        {/* LFT */}
        <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
          <Link href={'/'} className="flex items-center gap-3">
            <Image src={'/logo.svg'} width={24} height={24} alt={'logo'} />
            <p className="text-2xl tracking-wide">NOVAMARKET</p>
          </Link>
          <Menu isDesktop />
        </div>
        {/* RIGHT */}
        <div className="lg:w-1/2 w-2/3 flex items-center justify-between gap-8">
          <SearchBar />
          <NavBarIcons />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
