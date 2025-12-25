'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Heart, Home, Menu, ShoppingCart } from 'lucide-react';

interface NavigationBarProps {
    onMenuClick?: () => void;
}

export default function NavigationBar({ onMenuClick }: NavigationBarProps) {
    const pathname = usePathname();

    const getPathname = (path: string) => {
        return pathname === path ? 'bg-white/20 font-semibold' : 'hover:bg-white/10 hover:opacity-90';
    };

    return (
        <header className='bg-primary text-primary-foreground shadow-md'>
            <div className='container mx-auto px-4 py-3'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        {/* Hamburger Menu Button - Mobile Only */}
                        <button
                            onClick={onMenuClick}
                            className='rounded-md p-2 hover:bg-white/10 lg:hidden'
                            aria-label='Open menu'>
                            <Menu className='h-6 w-6' />
                        </button>

                        <Link href='/' className='flex items-center gap-2 transition-opacity hover:opacity-90'>
                            <ShoppingCart className='h-6 w-6' />
                            <h1 className='text-xl font-bold'>ShopHub</h1>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className='hidden items-center gap-6 lg:flex'>
                        <Link
                            href='/'
                            className={`flex items-center gap-2 rounded-md px-3 py-2 transition-all ${getPathname(
                                '/'
                            )}`}>
                            <Home className='h-5 w-5' />
                            <span className='font-medium'>Home</span>
                        </Link>
                        <Link
                            href='/favorites'
                            className={`flex items-center gap-2 rounded-md px-3 py-2 transition-all ${getPathname('/favorites')}`}>
                            <Heart className='h-5 w-5' />
                            <span className='font-medium'>Favorites</span>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
