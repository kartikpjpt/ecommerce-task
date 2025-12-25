import { useEffect, useMemo } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { MOCK_PRODUCTS } from '@/lib/mockData';
import { filterAndSortProducts } from '@/lib/productUtils';
import { useStore } from '@/store/useStore';

export function useSortAndFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const filters = useStore((state) => state.filters);
    const setFilter = useStore((state) => state.setFilter);
    const resetFilters = useStore((state) => state.resetFilters);

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

    // Scroll to top when filters change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [filters]);

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        return filterAndSortProducts(MOCK_PRODUCTS, filters);
    }, [filters]);

    return {
        filters,
        setFilter,
        resetFilters,
        filteredProducts
    };
}
