import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../lib/enum';
import { useLocation } from 'react-router-dom';

export const Navigation = () => {
    const location = useLocation();
    return (
        <div>
            <ul className="flex gap-9 mr-3">
                <Link to={ROUTES.TODO} className="hover:underline">
                    Todo
                </Link>
                {location.pathname === ROUTES.REGISTER ? (
                    <li>
                        <Link to={ROUTES.LOGIN} className="hover:underline">
                            Login
                        </Link>
                    </li>
                ) : (
                    <li>
                        <Link to={ROUTES.REGISTER} className="hover:underline">
                            Register
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
};
