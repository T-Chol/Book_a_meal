"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname

function ChefHeader() {
    const pathname = usePathname(); // Get the current path
    const isActiveAuth = (href) => pathname === href ? "bg-orange-500 text-white rounded-md py-2 px-1  " : "text-center py-2";
    const isActive = (href) => pathname === href ? "text-black font-bold border-b-2 border-teal-600" : "text-gray-600 hover:text-teal-500 hover:border-b-red-600";

    return (
        <div className="border-b-2 shadow-inner  hover:shadow-teal-600 h-20 flex justify-between items-center">
            {/* Hotel Logo */}
            <Link href="/landingPage">
                <img height={120} width={160} src="./logo.jpeg" alt="Logo" className="hotel-logo"/>
            </Link>

            <ul className="flex space-x-6 ml-auto">
                <Link href="/caterer" className={isActive("/caterer")}>Home</Link>
                <Link href="/orderPage" className={isActive("/orderPage")}>Today's Menu</Link>
                <Link href="/specials" className={isActive("/specials")}>Specials</Link>
            </ul>

            <ul className="ms-auto flex space-x-4 mr-4">
                <Link href="/logout" className={isActiveAuth("/logout")}>Logout</Link>
                <Link href="/profile" className={isActiveAuth("/profile")}>Profile</Link>
            </ul>
        </div>
    );
}

export default ChefHeader;
