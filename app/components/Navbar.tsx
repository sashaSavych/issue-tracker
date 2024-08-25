'use client';

import React from 'react';
import Link from "next/link";
import {AiFillBug} from "react-icons/ai";
import {usePathname} from "next/navigation";
import classnames from "classnames";

const Navbar = () => {
    const currentPath = usePathname();

    const links: { label: string, href: string }[] = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues" }
    ];

    return (
        <nav className="flex items-center space-x-6 border-b mb-5 px-5 h-14">
            <Link href="/"><AiFillBug /></Link>
            <ul className="flex space-x-6">
                {links.map(link => {
                    return <Link
                        key={link.href}
                        className={classnames({
                            'text-zinc-900': link.href === currentPath,
                            'text-zinc-500': link.href !== currentPath,
                            'hover:text-zinc-900 transition-colors': true
                        })}
                        href={link.href}>
                        {link.label}
                    </Link>
                })}
            </ul>
        </nav>
    );
};

export default Navbar;