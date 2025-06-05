import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import LogoutButton from '../../auth/Logout';

function AdminLayout() {
    return (
        <div>
            <AdminNavbar />
            <div className="absolute top-4 right-4">
                <LogoutButton />
            </div>
            <main className="p-6">
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout;
