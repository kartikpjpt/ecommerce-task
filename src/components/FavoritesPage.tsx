'use client';

import { useMemo, useState } from 'react';

import { MobileDrawer } from '@/components/MobileDrawer';
import NavigationBar from '@/components/NavigationBar';
import { ProductCard } from '@/components/ProductCard';
import { useStore } from '@/store/useStore';
import { Product } from '@/types/product';

interface FavoritesPageProps {
    products: Product[];
}

export function FavoritesPage({ products }: FavoritesPageProps) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const filters = useStore((state) => state.filters);
    const setFilter = useStore((state) => state.setFilter);
    const resetFilters = useStore((state) => state.resetFilters);
    const favorites = useStore((state) => state.favorites);
    const toggleFavorite = useStore((state) => state.toggleFavorite);

    // Create isFavorite function from favorites state
    const isFavorite = (productId: string) => favorites.has(productId);

    // Filter to show only favorited products that are in stock
    const favoriteProducts = useMemo(() => {
        return products.filter((product) => product.inStock && favorites.has(product.id));
    }, [products, favorites]);

    return (
        <>
            <NavigationBar onMenuClick={() => setIsDrawerOpen(true)} />

            <MobileDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                filters={filters}
                onFilterChange={setFilter}
                onResetFilters={resetFilters}
            />

            <div className='container mx-auto px-4 py-6'>
                <div className='mb-6'>
                    <h1 className='text-3xl font-bold'>My Favorites</h1>
                    <p className='text-muted-foreground mt-2'>
                        {favoriteProducts.length === 0
                            ? 'No favorite products yet. Start adding some!'
                            : `${favoriteProducts.length} product${favoriteProducts.length === 1 ? '' : 's'} in your favorites`}
                    </p>
                </div>

                {favoriteProducts.length === 0 ? (
                    <div className='bg-card flex min-h-[400px] flex-col items-center justify-center rounded-lg border p-8 text-center'>
                        <svg
                            className='text-muted-foreground mb-4 h-24 w-24'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'>
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={1.5}
                                d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                            />
                        </svg>
                        <h2 className='mb-2 text-xl font-semibold'>No Favorites Yet</h2>
                        <p className='text-muted-foreground mb-6 max-w-md'>
                            Browse products and click the heart icon to add them to your favorites.
                        </p>
                        <a
                            href='/'
                            className='bg-brand-green text-brand-green-foreground rounded-md px-6 py-3 font-medium transition-opacity hover:opacity-90'>
                            Browse Products
                        </a>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {favoriteProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                isFavorite={isFavorite(product.id)}
                                onToggleFavorite={() => toggleFavorite(product.id)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
