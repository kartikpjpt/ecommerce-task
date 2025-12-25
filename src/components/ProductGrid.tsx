import { Heart, Star } from 'lucide-react';

import { formatIndianPrice } from '@/lib/utils';
import { Product } from '@/types/product';

interface ProductGridProps {
    products: Product[];
    isFavorite: (id: string) => boolean;
    onToggleFavorite: (id: string) => void;
    observerRef: (node?: Element | null) => void;
    hasMore: boolean;
}

export function ProductGrid({ products, isFavorite, onToggleFavorite, observerRef, hasMore }: ProductGridProps) {
    return (
        <>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {products.map((product, index) => (
                    <div
                        key={product.id}
                        ref={index === products.length - 1 ? observerRef : null}
                        className='bg-card group overflow-hidden rounded-sm border transition-shadow hover:shadow-lg'>
                        <div className='relative aspect-square overflow-hidden'>
                            <img
                                src={product.image}
                                alt={product.name}
                                loading='lazy'
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = `https://placehold.co/400x400/e2e8f0/64748b?text=${encodeURIComponent(product.name.substring(0, 20))}`;
                                }}
                                className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                            />
                            {product.discount && (
                                <div className='absolute left-2 top-2 rounded-sm bg-brand-green px-2 py-1 text-xs font-semibold text-brand-green-foreground'>
                                    {product.discount}% OFF
                                </div>
                            )}
                            <button
                                onClick={() => onToggleFavorite(product.id)}
                                className='absolute right-2 top-2 rounded-full bg-white p-2 shadow-md transition-all hover:scale-110'
                                aria-label='Add to favorites'>
                                <Heart
                                    className={`h-5 w-5 ${isFavorite(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                                />
                            </button>
                        </div>

                        <div className='p-4'>
                            <h3 className='mb-2 line-clamp-1 font-medium' title={product.name}>
                                {product.name}
                            </h3>

                            <div className='mb-2 flex items-center gap-1'>
                                <div
                                    className={`flex items-center gap-1 rounded-sm px-1.5 py-0.5 ${
                                        product.rating < 2
                                            ? 'bg-orange-500'
                                            : product.rating < 3
                                              ? 'bg-yellow-500'
                                              : 'bg-brand-green'
                                    }`}>
                                    <Star
                                        className={`h-3 w-3 ${
                                            product.rating < 2
                                                ? 'fill-white text-white'
                                                : product.rating < 3
                                                  ? 'fill-white text-white'
                                                  : 'fill-brand-green-foreground text-brand-green-foreground'
                                        }`}
                                    />
                                    <span
                                        className={`text-xs font-medium ${
                                            product.rating < 3 ? 'text-white' : 'text-brand-green-foreground'
                                        }`}>
                                        {product.rating}
                                    </span>
                                </div>
                                <span className='text-muted-foreground text-xs'>({product.reviews.toLocaleString()})</span>
                            </div>

                            <div className='mb-3 flex items-center gap-2'>
                                <span className='text-lg font-bold'>₹{formatIndianPrice(product.price)}</span>
                                {product.originalPrice && (
                                    <span className='text-muted-foreground text-sm line-through'>
                                        ₹{formatIndianPrice(product.originalPrice)}
                                    </span>
                                )}
                            </div>

                            <button
                                className='w-full rounded-sm bg-brand-green px-4 py-2 text-sm font-semibold text-brand-green-foreground transition-opacity hover:opacity-90'
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {hasMore && (
                <div className='mt-8 flex justify-center'>
                    <div className='text-muted-foreground text-sm'>Loading more products...</div>
                </div>
            )}
        </>
    );
}
