import { ReactNode } from 'react';

import { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
    title: 'ShopHub - E-Commerce Product Listing',
    description: 'Discover amazing products at great prices'
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <html suppressHydrationWarning lang='en'>
            <body className={`bg-background text-foreground overscroll-none antialiased`}>{children}</body>
        </html>
    );
};

export default Layout;
