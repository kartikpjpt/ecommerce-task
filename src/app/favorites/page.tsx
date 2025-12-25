import { FavoritesPage } from '@/components/FavoritesPage';
import { MOCK_PRODUCTS } from '@/lib/mockData';

export default function Page() {
    const products = MOCK_PRODUCTS;

    return <FavoritesPage products={products} />;
}
