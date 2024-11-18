import React from 'react';
import { Logo } from '../Logo';
import { Navigation } from '../Navigation';

export const CommonHeader = () => {
    return (
        <div className="h-16 min-h-16 w-full col-span-2 bg-[#fcf5ed] flex items-center justify-between px-9">
            <Logo />
            <Navigation />
        </div>
    );
};
