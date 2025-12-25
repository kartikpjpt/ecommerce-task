export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviews: number;
    image: string;
    category: string;
    discount?: number;
    inStock: boolean;
}

export interface Filters {
    category: string;
    minRating: number;
    sortBy: string;
}
