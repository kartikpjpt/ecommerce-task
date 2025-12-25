'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { MobileDrawer } from '@/components/MobileDrawer';
import NavigationBar from '@/components/NavigationBar';
import { ProductGrid } from '@/components/ProductGrid';
import { Sidebar } from '@/components/Sidebar';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { ITEMS_PER_PAGE } from '@/lib/constant';
import { useStore } from '@/store/useStore';
import { Product } from '@/types/product';

interface ProductPageProps {
    products: Product[];
}

export function ProductPage({ products }: ProductPageProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Get state and actions from Zustand store
    const filters = useStore((state) => state.filters);
    const setFilter = useStore((state) => state.setFilter);
    const resetFilters = useStore((state) => state.resetFilters);
    const favorites = useStore((state) => state.favorites);
    const toggleFavorite = useStore((state) => state.toggleFavorite);

    // Initialize filters from URL on mount
    useEffect(() => {
        const category = searchParams.get('category');
        const minRating = searchParams.get('minRating');
        const sortBy = searchParams.get('sortBy');

        if (category && category !== filters.category) {
            setFilter('category', category);
        }
        if (minRating && Number(minRating) !== filters.minRating) {
            setFilter('minRating', Number(minRating));
        }
        if (sortBy && sortBy !== filters.sortBy) {
            setFilter('sortBy', sortBy);
        }
    }, []);

    // Update URL when filters change
    useEffect(() => {
        const params = new URLSearchParams();

        if (filters.category && filters.category !== 'all') {
            params.set('category', filters.category);
        }
        if (filters.minRating && filters.minRating > 0) {
            params.set('minRating', String(filters.minRating));
        }
        if (filters.sortBy && filters.sortBy !== 'default') {
            params.set('sortBy', filters.sortBy);
        }

        const queryString = params.toString();
        const newUrl = queryString ? `/?${queryString}` : '/';

        router.replace(newUrl, { scroll: false });
    }, [filters, router]);

    // Create isFavorite function from favorites state
    const isFavorite = (productId: string) => favorites.has(productId);

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        // Filter out out of stock items
        let filtered = products.filter((product) => product.inStock);

        // Filter by category
        if (filters.category !== 'all') {
            filtered = filtered.filter((product) => product.category === filters.category);
        }

        // Filter by rating
        if (filters.minRating > 0) {
            filtered = filtered.filter((product) => product.rating >= filters.minRating);
        }

        // Sort products
        switch (filters.sortBy) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating-desc':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            default:
                // Keep default order
                break;
        }

        return filtered;
    }, [products, filters]);

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

                    <main className='min-h-screen flex-1 bg-background'>
                        <div className='p-4'>
                            <div className='bg-card mb-4 rounded-sm px-4 py-3 shadow-sm'>
                                <div className='flex items-center justify-between'>
                                    <h2 className='text-muted-foreground text-sm font-medium'>
                                        Showing {visibleItems.length} of {filteredProducts.length} products
                                    </h2>
                                </div>
                            </div>

                            <ProductGrid
                                products={visibleItems as Product[]}
                                isFavorite={isFavorite}
                                onToggleFavorite={toggleFavorite}
                                observerRef={observerRef}
                                hasMore={hasMore}
                            />
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
