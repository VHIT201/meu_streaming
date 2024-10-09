import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router"; // Để quản lý active link
import Image from "next/image";
import { Images } from "@/app/assets/images";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter(); // Dùng useRouter để lấy pathname

  // Sự kiện theo dõi khi người dùng cuộn
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 90);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      // Sử dụng requestAnimationFrame để tối ưu hóa hiệu suất
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [handleScroll]);

  return (
    <header
      className={`px-8 flex justify-center fixed top-0 w-full z-50 transition-all duration-200 ease-in-out ${
        isScrolled ? "py-4 bg-black" : "py-0 md:py-8 bg-transparent"
      }`}
    >
      <div className="max-w-screen-2xl flex justify-between items-center w-full">
        <Link
          href="/"
          className="hidden md:flex items-center hover:cursor-pointer group"
        >
          <Image
            src={Images.logo}
            alt="Logo"
            className="mr-4 w-8 md:w-12"
            width={48}
            height={48}
          />
          <h1 className="text-white font-semibold text-2xl md:text-4xl group-hover:text-red-main group-hover:transition-custom">
            MeU-Streaming
          </h1>
        </Link>
        <nav className="fixed md:relative left-0 md:left-auto right-0 md:right-auto bottom-0 md:bottom-auto flex items-center justify-evenly bg-black md:bg-transparent py-2 md:py-4 -mx-4">
          <Link
            href="/"
            className={`nav-item ${router.pathname === "/" ? "active" : ""}`}
          >
            <span className="px-4 text-white hover:text-red-500">Home</span>
          </Link>
          <Link
            href="/movies"
            className={`nav-item ${
              router.pathname === "/movies" ? "active" : ""
            }`}
          >
            <span className="px-4 text-white hover:text-red-500">Movies</span>
          </Link>
          <Link
            href="/tvseries"
            className={`nav-item ${
              router.pathname === "/tvseries" ? "active" : ""
            }`}
          >
            <span className="px-4 text-white hover:text-red-500">
              TV Series
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
