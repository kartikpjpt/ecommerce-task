import { useEffect, useState } from 'react';

import { useInView } from 'react-intersection-observer';

interface UseInfiniteScrollProps<T> {
    items: T[];
    itemsPerPage?: number;
}

function useInfiniteScroll<T>({ items, itemsPerPage = 12 }: UseInfiniteScrollProps<T>) {
    const [visibleCount, setVisibleCount] = useState(itemsPerPage);

    const { ref, inView } = useInView({
        threshold: 0,
        rootMargin: '100px'
    });

    useEffect(() => {
        if (inView && visibleCount < items.length) {
            setVisibleCount((prev) => Math.min(prev + itemsPerPage, items.length));
        }
    }, [inView, items.length, itemsPerPage, visibleCount]);

    useEffect(() => {
        setVisibleCount(itemsPerPage);
    }, [items, itemsPerPage]);

    return {
        visibleItems: items.slice(0, visibleCount),
        hasMore: visibleCount < items.length,
        observerRef: ref
    };
}

export default useInfiniteScroll;
