'use client';

import { Suspense, useState } from 'react';

import { MobileDrawer } from '@/components/MobileDrawer';
import NavigationBar from '@/components/NavigationBar';
import { ProductCard } from '@/components/ProductCard';
import { Sidebar } from '@/components/Sidebar';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useSortAndFilter } from '@/hooks/useSortAndFilter';
import { ITEMS_PER_PAGE } from '@/lib/constant';
import { useStore } from '@/store/useStore';
import { Product } from '@/types/product';

function HomePage() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Use the custom hook for sorting and filtering
    const { filters, setFilter, resetFilters, filteredProducts } = useSortAndFilter();

    // Get favorites state and actions from Zustand store
    const favorites = useStore((state) => state.favorites);
    const toggleFavorite = useStore((state) => state.toggleFavorite);

    const isFavorite = (productId: string) => favorites.has(productId);

    const { visibleItems, hasMore, observerRef } = useInfiniteScroll({
        items: filteredProducts,
        itemsPerPage: ITEMS_PER_PAGE
    });

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

            <div className='container mx-auto'>
                <div className='flex gap-0'>
                    <aside className='sticky top-0 hidden h-screen overflow-y-auto lg:block'>
                        <Sidebar filters={filters} onFilterChange={setFilter} onResetFilters={resetFilters} />
                    </aside>

                    <main className='min-h-screen flex-1'>
                        <div className='p-4'>
                            <div className='bg-card mb-4 rounded-sm px-4 py-3 shadow-sm'>
                                <div className='flex items-center justify-between'>
                                    <h2 className='text-muted-foreground text-sm font-medium'>
                                        Showing {visibleItems.length} of {filteredProducts.length} products
                                    </h2>
                                </div>
                            </div>

                            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                                {visibleItems.map((product, index) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product as Product}
                                        isFavorite={isFavorite(product.id)}
                                        onToggleFavorite={() => toggleFavorite(product.id)}
                                        observerRef={index === visibleItems.length - 1 ? observerRef : undefined}
                                    />
                                ))}
                            </div>

                            {hasMore ? (
                                <div className='mt-8 flex justify-center'>
                                    <div className='text-muted-foreground text-sm'>Loading more products...</div>
                                </div>
                            ) : (
                                filteredProducts.length > 0 && (
                                    <div className='mt-8 flex justify-center'>
                                        <div className='text-muted-foreground rounded-lg border border-dashed px-6 py-3 text-sm'>
                                            🎉 You've reached the end! All products loaded.
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<div className='flex min-h-screen items-center justify-center'>Loading...</div>}>
            <HomePage />
        </Suspense>
    );
}
