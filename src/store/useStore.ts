import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Filters } from '@/types/product';

interface StoreState {
    // Filter state
    filters: Filters;
    setFilter: (key: keyof Filters, value: string | number) => void;
    resetFilters: () => void;

    // Favorites state
    favorites: Set<string>;
    toggleFavorite: (productId: string) => void;
    isFavorite: (productId: string) => boolean;
    clearFavorites: () => void;
}

const defaultFilters: Filters = {
    category: 'all',
    minRating: 0,
    sortBy: 'default'
};

export const useStore = create<StoreState>()(
    persist(
        (set, get) => ({
            // Filter state and actions
            filters: defaultFilters,
            setFilter: (key, value) =>
                set((state) => ({
                    filters: { ...state.filters, [key]: value }
                })),
            resetFilters: () => set({ filters: defaultFilters }),

            // Favorites state and actions
            favorites: new Set<string>(),
            toggleFavorite: (productId) =>
                set((state) => {
                    const newFavorites = new Set(state.favorites);
                    if (newFavorites.has(productId)) {
                        newFavorites.delete(productId);
                    } else {
                        newFavorites.add(productId);
                    }

                    return { favorites: newFavorites };
                }),
            isFavorite: (productId) => get().favorites.has(productId),
            clearFavorites: () => set({ favorites: new Set<string>() })
        }),
        {
            name: 'e-commerce-storage',
            partialize: (state) => ({
                // Only persist favorites, not filters
                favorites: Array.from(state.favorites)
            }),
            // Custom storage to handle Set serialization
            storage: {
                getItem: (name) => {
                    const str = localStorage.getItem(name);
                    if (!str) return null;
                    const { state } = JSON.parse(str);

                    return {
                        state: {
                            ...state,
                            favorites: new Set(state.favorites || [])
                        }
                    };
                },
                setItem: (name, value) => {
                    const str = JSON.stringify({
                        state: {
                            ...value.state,
                            favorites: Array.from(value.state.favorites)
                        }
                    });
                    localStorage.setItem(name, str);
                },
                removeItem: (name) => localStorage.removeItem(name)
            }
        }
    )
);
