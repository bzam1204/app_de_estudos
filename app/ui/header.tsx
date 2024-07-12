'use client'
// components/Header.js
import React, { useEffect } from "react";
import Link from "next/link";
import clsx from 'clsx';
import { usePathname } from "next/navigation";

const navigation = [
    { name: 'Painel', href: '/dashboard', current: true },
    { name: 'Questões', href: '/dashboard/questions', current: false },
]


const Header = () => {
    const pathname = usePathname();

    return (
        <header className="w-screen sticky top-0 z-40 p-4  gap-8 transition-all hover:drop-shadow-sm hover:border-t-amber-400 border-gray-200 border-t-8 hover:bg-white drop-shadow-amber-400 bg-gray-50 flex justify-start items-center">
            <Link href={'/'}>
                <h1 className="text-gray-900">App | Minhas Questões</h1>
            </Link>
            <nav className="flex gap-4">
                {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                        <div className={clsx("text-gray-800 hover:text-amber-500 px-2", {
                            'bg-gray-400 px-2 hover:text-white transition-all transition-delay-300 rounded font-bold text-white': pathname === item.href,
                        })}>
                            {item.name}
                        </div>
                    </Link>
                ))}
            </nav>

        </header>
    );
};

export default Header;
