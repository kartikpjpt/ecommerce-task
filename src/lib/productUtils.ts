import { Filters, Product } from '@/types/product';

export function filterProducts(products: Product[], filters: Filters): Product[] {
    let filtered = products.filter((product) => product.inStock);

    // Filter by category
    if (filters.category !== 'all') {
        filtered = filtered.filter((product) => product.category === filters.category);
    }

    // Filter by rating
    if (filters.minRating > 0) {
        filtered = filtered.filter((product) => product.rating >= filters.minRating);
    }

    return filtered;
}

export function sortProducts(products: Product[], sortBy: string): Product[] {
    const sorted = [...products];

    switch (sortBy) {
        case 'price-asc':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-desc':
            return sorted.sort((a, b) => b.price - a.price);
        case 'rating-desc':
            return sorted.sort((a, b) => b.rating - a.rating);
        default:
            return sorted;
    }
}

export function filterAndSortProducts(products: Product[], filters: Filters): Product[] {
    const filtered = filterProducts(products, filters);

    return sortProducts(filtered, filters.sortBy);
}
