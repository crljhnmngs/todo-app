import React from 'react';

export const NotFound = () => {
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="w-full max-w-lg flex items-center flex-col text-secondary -ml-9 -mt-7">
                <div className="text-[17px] tracking-widest text-gray-900 font-medium font-poppins pl-16 uppercase">
                    <h3>oops! page not found</h3>
                </div>
                <div className="-mt-7">
                    <h1 className="font-montserrat font-black text-[250px] leading-none tracking-tightest notFound">
                        <span>4</span>
                        <span>0</span>
                        <span>4</span>
                    </h1>
                </div>
                <div className="-mt-4 text-[19px] font-medium uppercase text-center pl-8">
                    <h3>
                        we are sorry, but the page you requested was not found
                    </h3>
                </div>
            </div>
        </div>
    );
};
