import React from 'react';

export const Logo = () => {
    return (
        <div className="flex gap-2">
            <div
                data-testid="circle-1"
                className="rounded-full h-4 w-4 xs:h-5 xs:w-5 bg-[#ada69e]"
            ></div>
            <div
                data-testid="circle-2"
                className="rounded-full h-4 w-4 xs:h-5 xs:w-5 bg-[#ada69e]"
            ></div>
            <div
                data-testid="circle-3"
                className="rounded-full h-4 w-4 xs:h-5 xs:w-5 bg-[#ada69e]"
            ></div>
        </div>
    );
};
