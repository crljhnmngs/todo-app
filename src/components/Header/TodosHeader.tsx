import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Counter } from '../Counter';
import { Logo } from '../Logo';
import { TodosHeaderProps } from '../../types';
import Hamburger from 'hamburger-react';
import { selectSidebarState } from '../../features/sidebar/sidebarSelector';
import { setSidebar } from '../../features/sidebar/sidebarSlice';

export const TodosHeader = ({
    totalTodosCount,
    totalCompletedTodosCount,
}: TodosHeaderProps) => {
    const dispatch = useDispatch();
    const isOpen = useSelector(selectSidebarState);

    const handleToggle: React.Dispatch<React.SetStateAction<boolean>> = (
        value
    ) => {
        const toggled = typeof value === 'boolean' ? value : value(isOpen);
        dispatch(setSidebar(toggled));
    };

    return (
        <div className="h-16 col-span-2 bg-[#fcf5ed] flex items-center justify-between px-5 xs:px-9">
            <Logo />
            <div className="flex justify-center items-center xs:gap-2">
                <Counter
                    totalTodosCount={totalTodosCount}
                    totalCompletedTodosCount={totalCompletedTodosCount}
                />
                <div className="md:hidden">
                    <Hamburger
                        toggled={isOpen}
                        toggle={handleToggle}
                        duration={0.9}
                        size={22}
                    />
                </div>
            </div>
        </div>
    );
};
