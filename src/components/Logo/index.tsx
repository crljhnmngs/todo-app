import React from 'react';

export const Logo = () => {
    return (
        <div className="flex gap-2">
            <div
                data-testid="circle-1"
                className="rounded-full h-5 w-5 bg-[#ada69e]"
            ></div>
            <div
                data-testid="circle-2"
                className="rounded-full h-5 w-5 bg-[#ada69e]"
            ></div>
            <div
                data-testid="circle-3"
                className="rounded-full h-5 w-5 bg-[#ada69e]"
            ></div>
        </div>
    );
};
