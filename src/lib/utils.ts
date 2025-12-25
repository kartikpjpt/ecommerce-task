import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
    return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function formatIndianPrice(price: number): string {
    const priceStr = price.toString();
    const lastThree = priceStr.substring(priceStr.length - 3);
    const otherNumbers = priceStr.substring(0, priceStr.length - 3);

    if (otherNumbers !== '') {
        return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
    }

    return lastThree;
}
