import React from "react";
import {NavLink} from "react-router-dom";

import './AdminNavbar.css'
import {Search} from "../Search/Search";

export const AdminNavbar = () => {

    return (
        <>
            <div className="admin__links">
                <div className="admin__navbar-link"><b>Panel Admina</b></div>
                <NavLink
                    className="admin__navbar-link"
                    to="/admin/books"
                    style={({ isActive }) => (isActive ? { borderBottom: '#4c4c50 solid 3px' } : { borderBottom: '' })}>
                    Książki
                </NavLink>
                <NavLink
                    className="admin__navbar-link"
                    to="/admin/customers"
                    style={({ isActive }) => (isActive ? { borderBottom: '#4c4c50 solid 3px' } : { borderBottom: '' })}>
                    Klienci
                </NavLink>
                <Search placeholder='Wyszukaj wg tytułu..'/>
            </div>

        </>
    );

}