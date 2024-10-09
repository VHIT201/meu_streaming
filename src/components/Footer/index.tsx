import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Images } from '@/app/assets/images';

const Footer: React.FC = () => {
  return (
    <div
      className="h-100 lg:h-120 px-8 py-12 md:p-16 bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${Images.footerImg})` }} // Đảm bảo Images.footerImg là đường dẫn đúng
    >
      <div className="max-w-4xl h-full mx-auto flex flex-col justify-around">
        <Link href="/" className="flex items-center justify-center hover:cursor-pointer group mb-10">
          <Image
            src={Images.logo} 
            alt="Logo"
            className="mr-2 md:mr-4 w-8 md:w-12"
            width={48} // Cung cấp chiều rộng cố định
            height={48} // Cung cấp chiều cao cố định
          />
          <h1 className="text-white font-semibold text-2xl md:text-4xl group-hover:text-red-500 group-hover:transition duration-300">
            theMovies
          </h1>
        </Link>
        <div className="flex text-white font-semibold text-base md:text-2xl items-start justify-between flex-wrap -mx-2 mt-8 mb-10">
          <Link href="/" className="footer-item">Home</Link>
          <Link href="/" className="footer-item">Live</Link>
          <Link href="/" className="footer-item">You must watch</Link>
          <Link href="/" className="footer-item">Contact us</Link>
          <Link href="/" className="footer-item">FAQ</Link>
          <Link href="/" className="footer-item">Recent releases</Link>
          <Link href="/" className="footer-item">Terms of services</Link>
          <Link href="/" className="footer-item">Premium</Link>
          <Link href="/" className="footer-item">Top IMDB</Link>
          <Link href="/" className="footer-item">About us</Link>
          <Link href="/" className="footer-item">Privacy policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
