import React from 'react';
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom';

const AuthenticatedLayout = () => {
    return (
        <div>
            <Navbar />
            <div className="main-content">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthenticatedLayout;