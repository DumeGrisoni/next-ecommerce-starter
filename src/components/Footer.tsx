import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-gray-100 text-sm mt-24 py-24">
      {/* TOP */}
      <div className="flex flex-col md:flex-row justify-between gap-24">
        {/* LEFT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <Link href={'/'} className="w-1/2">
            <p className="text-2xl tracking-wide">NOVAMARKET</p>
          </Link>
          <p>20218 Moltifao - Vista Studio - DevWeb</p>
          <span className="font-semibold">vista.studio2b@gmail.com</span>
          <span className="font-semibold">0650838238</span>
          <div className="flex gap-6">
            <Image src="/facebook.png" alt="facebook" width={16} height={16} />
            <Image
              src="/instagram.png"
              alt="instagram"
              width={16}
              height={16}
            />
          </div>
        </div>

        {/* CENTER */}
        <div className="w-1/2 hidden lg:flex justify-between">
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">ENTREPRISE</h1>
            <div className="flex flex-col gap-6">
              <Link href={'/'}>A Propos</Link>
              <Link href={'/'}>Site Web</Link>
              <Link href={'/'}>Blog</Link>
              <Link href={'/'}>Contact</Link>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">MARKET</h1>
            <div className="flex flex-col gap-6">
              <Link href={'/'}>Nouveautés</Link>
              <Link href={'/'}>Accessoires</Link>
              <Link href={'/'}>Hommes</Link>
              <Link href={'/'}>Femmes</Link>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">AIDE</h1>
            <div className="flex flex-col gap-6">
              <Link href={'/'}>Service Client</Link>
              <Link href={'/'}>Mon Compte</Link>
              <Link href={'/'}>Termes & Conditions</Link>
              <Link href={'/'}>Carte Cadeaux</Link>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <h1 className="font-medium text-lg">SOUSCRIPTION</h1>
          <p>
            Soyez le premier à recevoir nos nouveautés, promotions et offres
            exclusives
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Votre email"
              className="p-4 w-3/4"
            />
            <button className="w-1/4 bg-primary text-white">GO !</button>
          </div>
          <span className="font-semibold">Paiements sécurisés</span>
          <div className="flex justify-between">
            <Image src="/discover.png" alt="discover" width={40} height={20} />
            <Image src="/skrill.png" alt="skill" width={40} height={20} />
            <Image src="/paypal.png" alt="paypal" width={40} height={20} />
            <Image
              src="/mastercard.png"
              alt="mastercard"
              width={40}
              height={20}
            />
            <Image src="/visa.png" alt="visa" width={40} height={20} />
          </div>
        </div>
      </div>
      {/* BOTTOM */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
        {/* LEFT */}
        <span>© 2025 NOVAMARKET</span>

        {/* RIGHT */}
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="">
            <span className="text-gray-500 mr-4">Langue</span>
            <span className="font-medium">France | Français</span>
          </div>
          <div className="">
            <span className="text-gray-500 mr-4">Devise</span>
            <span className="font-medium">€ Euro</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
