'use client'
// components/Header.js
import React, { useEffect } from "react";
import Link from "next/link";
import clsx from 'clsx';
import { usePathname } from "next/navigation";
import { DocumentIcon, DocumentPlusIcon, HomeIcon } from "@heroicons/react/24/outline";
import NavItem from "./create-questions-menu";
import { Codesandbox, Layers, LayoutGrid } from "lucide-react";

const navigation = [
    { name: 'Painel', href: '/dashboard', current: true, icon: LayoutGrid },
    { name: 'Acervo', href: '/dashboard/questions', current: false, icon: Layers },
    { name: 'Criação', href: '/dashboard/questions/create', current: false, icon: Codesandbox },
]

const Header = () => {
    const pathname = usePathname();

    return (
        <header
            className="w-screen sticky top-0 z-40 p-4  gap-8 transition-all hover:drop-shadow-sm hover:border-t-amber-400 border-gray-200 border-t-8 hover:bg-white drop-shadow-amber-400 bg-gray-50 flex justify-start items-center">
            <Link href={'/'}>
                <h1 className="text-gray-900">App | Minhas Questões</h1>
            </Link>
            <nav className="flex gap-4">
                {navigation.map((item, index) => {
                    if (item.name === 'Criação') {
                        return (
                            <NavItem key={index} Icon={item.icon} label={item.name} />
                        )
                    }

                    return (<Link key={item.name} href={item.href}>
                        <div
                            className={clsx("flex gap-2 transition-all  transition-delay-500  rounded font-bold text-gray-800 hover:text-amber-500 px-2 py-1", {
                                'bg-gray-400  hover:text-white hover:bg-amber-500    text-white': pathname === item.href,
                            })}>
                            {item.icon && <item.icon width={18} />}
                            {item.name}

                        </div>
                    </Link>)
                })}
            </nav>
        </header>
    );
};

export default Header;
