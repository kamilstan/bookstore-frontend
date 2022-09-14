import React, {useEffect, useState} from 'react';
import { HeaderMenu } from '../HeaderMenu/HeaderMenu';
import {Avatar, Container} from '@mui/material';
import './Header.css';
import {apiUrl} from "../../config/api";
import {useSelector} from "react-redux";
import { StoreState } from '../../redux-toolkit/store';

interface HeaderProps {
    email?: string | null;
    role: string;
    id: string;
}

export const Header = (props: HeaderProps) => {
    const { role, id, email } = props;

    const handleName = () => {
        switch (role){
            case "admin":
                return <p>Admin</p>
                break;
            case "customer":
                return email ? <p>{`${email}`}</p> : <p>Customer</p>
                break;
        }
    }
    return (
        <div className="main-header">
            <Container
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    '&.MuiContainer-root': {
                        maxWidth: '1430px',
                    },
                }}>
                <div className='main-header__logo'>BookStore</div>
                <div className="main-header__user-info">
                    <Avatar
                        sx={{ width: 45, height: 45 }}
                    />
                    <div className="user-name">{handleName()}</div>
                    <HeaderMenu userRole={role} userId={id}/>
                </div>
            </Container>
        </div>
    );
};
