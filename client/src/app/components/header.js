// client/src/app/components/header.js
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

function Header() {
  const pathname = usePathname();
  const isActiveAuth = (href) =>
    pathname === href
      ? "bg-orange-500 text-white rounded-md py-2 px-1"
      : "text-center py-2";
  const isActive = (href) =>
    pathname === href
      ? "text-black font-bold border-b-2 border-teal-600"
      : "text-gray-600 hover:text-teal-500 hover:border-b-red-600";

  return (
    <div className="border-b-2 shadow-inner hover:shadow-teal-600 h-20 flex justify-between items-center">
      {/* Hotel Logo */}
      <Link href="/landingPage">
        <Image
          height={120}
          width={160}
          src="/logo.jpeg" // Correct: Starts with a leading slash
          alt="Logo"
          className="hotel-logo"
        />
      </Link>

      {/* Navigation Links */}
      <ul className="flex space-x-6 ml-auto">
        <Link href="/landingPage" className={isActive("/landingPage")}>
          Home
        </Link>
        <Link href="/about" className={isActive("/about")}>
          About Us
        </Link>
        <Link href="/menu" className={isActive("/menu")}>
          Menu
        </Link>
        <Link href="/specials" className={isActive("/specials")}>
          Today's Special
        </Link>
        <Link href="/myCart" className={isActive("/myCart")}>
          Cart 🛒
        </Link>
      </ul>

      {/* Auth Links */}
      <ul className="ms-auto flex space-x-4 mr-4">
        <Link href="/signup" className={isActiveAuth("/signup")}>
          Sign Up
        </Link>
        <Link href="/login" className={isActiveAuth("/login")}>
          Log in
        </Link>
      </ul>
    </div>
  );
}

export default Header;