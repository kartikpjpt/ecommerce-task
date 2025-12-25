import { RotateCcw } from 'lucide-react';

import { FilterRadioButton } from '@/components/FilterRadioButton';
import { CATEGORIES, SORT_OPTIONS } from '@/lib/constant';
import { Filters } from '@/types/product';

interface SidebarProps {
    filters: Filters;
    onFilterChange: (key: keyof Filters, value: string | number) => void;
    onResetFilters: () => void;
    mobile?: boolean;
}

export const Sidebar = ({ filters, onFilterChange, onResetFilters, mobile = false }: SidebarProps) => {
    const hasActiveFilters = filters.category !== 'all' || filters.minRating !== 0 || filters.sortBy !== 'default';

    return (
        <div className={`bg-card h-full w-full ${mobile ? '' : 'border-r lg:w-64'}`}>
            <div className='p-3'>
                <div className='mb-3 flex items-center justify-between'>
                    <h3 className='text-base font-semibold'>Filters</h3>
                    {hasActiveFilters && (
                        <button
                            onClick={onResetFilters}
                            className='flex items-center gap-1 rounded-sm px-2 py-1 text-xs font-medium text-brand-green transition-colors hover:bg-brand-green/10'
                            aria-label='Reset filters'>
                            <RotateCcw className='h-3 w-3' />
                            Reset
                        </button>
                    )}
                </div>

                <div className='space-y-4'>
                    <div className='border-b pb-3'>
                        <h4 className='mb-2 text-xs font-semibold text-gray-600 uppercase'>Categories</h4>
                        <div className='space-y-1'>
                            {CATEGORIES.map((category) => (
                                <FilterRadioButton
                                    key={category.value}
                                    name='category'
                                    value={category.value}
                                    checked={filters.category === category.value}
                                    onChange={() => onFilterChange('category', category.value)}
                                    label={category.label}
                                />
                            ))}
                        </div>
                    </div>

                    <div className='border-b pb-3'>
                        <h4 className='mb-2 text-xs font-semibold text-gray-600 uppercase'>Customer Ratings</h4>
                        <div className='space-y-1'>
                            {[4, 3, 2, 1].map((rating) => (
                                <FilterRadioButton
                                    key={rating}
                                    name='rating'
                                    value={rating}
                                    checked={filters.minRating === rating}
                                    onChange={() => onFilterChange('minRating', rating)}
                                    label={`${rating}★ & above`}
                                />
                            ))}
                            <FilterRadioButton
                                name='rating'
                                value={0}
                                checked={filters.minRating === 0}
                                onChange={() => onFilterChange('minRating', 0)}
                                label='All Ratings'
                            />
                        </div>
                    </div>

                    <div className='pb-3'>
                        <h4 className='mb-2 text-xs font-semibold text-gray-600 uppercase'>Sort By</h4>
                        <div className='space-y-1'>
                            {SORT_OPTIONS.map((option) => (
                                <FilterRadioButton
                                    key={option.value}
                                    name='sortBy'
                                    value={option.value}
                                    checked={filters.sortBy === option.value}
                                    onChange={() => onFilterChange('sortBy', option.value)}
                                    label={option.label}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
