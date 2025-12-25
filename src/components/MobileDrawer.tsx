'use client';

import { useEffect } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Sidebar } from '@/components/Sidebar';
import { Filters } from '@/types/product';

import { Heart, Home, X } from 'lucide-react';

interface MobileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    filters: Filters;
    onFilterChange: (key: keyof Filters, value: string | number) => void;
    onResetFilters: () => void;
}

export function MobileDrawer({ isOpen, onClose, filters, onFilterChange, onResetFilters }: MobileDrawerProps) {
    const pathname = usePathname();

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div className='fixed inset-0 z-40 bg-black/50 lg:hidden' onClick={onClose} />

            {/* Drawer */}
            <div className='bg-card fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] overflow-y-auto shadow-xl lg:hidden'>
                {/* Header */}
                <div className='flex items-center justify-between border-b p-4'>
                    <h2 className='text-lg font-semibold'>Menu</h2>
                    <button
                        onClick={onClose}
                        className='rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800'
                        aria-label='Close menu'>
                        <X className='h-5 w-5' />
                    </button>
                </div>

                {/* Navigation Links */}
                <div className='border-b p-4'>
                    <h3 className='mb-2 text-sm font-semibold text-gray-600 uppercase'>Navigation</h3>
                    <nav className='space-y-1'>
                        <Link
                            href='/'
                            onClick={onClose}
                            className={`flex items-center gap-2 rounded-md px-3 py-2 transition-all ${
                                pathname === '/'
                                    ? 'bg-brand-green text-brand-green-foreground font-semibold'
                                    : 'hover:bg-brand-green/10'
                            }`}>
                            <Home className='h-5 w-5' />
                            Home
                        </Link>
                        <Link
                            href='/favorites'
                            onClick={onClose}
                            className={`flex items-center gap-2 rounded-md px-3 py-2 transition-all ${
                                pathname === '/favorites'
                                    ? 'bg-brand-green text-brand-green-foreground font-semibold'
                                    : 'hover:bg-brand-green/10'
                            }`}>
                            <Heart className='h-5 w-5' />
                            Favorites
                        </Link>
                    </nav>
                </div>

                {/* Filters - Only show on home page */}
                {pathname === '/' && (
                    <div>
                        <Sidebar filters={filters} onFilterChange={onFilterChange} onResetFilters={onResetFilters} mobile />
                    </div>
                )}
            </div>
        </>
    );
}
