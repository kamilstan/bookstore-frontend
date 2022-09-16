import React, { SyntheticEvent } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import {
    setAccessToken,
    setExpirationTime,
    setId,
    setIsLoggedIn,
    setRole
} from '../../redux-toolkit/features/user/user-slice';
import {useDispatch, useSelector} from 'react-redux';
import { styled } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import { apiUrl } from '../../config/api';

import './HeaderMenu.css';
import {StoreState} from "../../redux-toolkit/store";
import {Button} from "@mui/material";

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        marginTop: theme.spacing(1),
        minWidth: 220,
        backgroundColor: '#4c4c50',
        color: 'white',
    },
    '& .MuiList-root': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    '& .MuiButtonBase-root': {
        width: '100%',
    },


}));

interface HeaderMenuProps {
    userRole: string;
    userId: string;
}

export const HeaderMenu = (props: HeaderMenuProps) => {
    const { accessToken} = useSelector((store: StoreState) => store.user);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            const data = await fetch(`${apiUrl}/login`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    authorization: `Bearer ${accessToken}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if (data.status === 200) {
                dispatch(setId(''));
                dispatch(setAccessToken(''));
                dispatch(setExpirationTime(0));
                dispatch(setRole(''));
                dispatch(setIsLoggedIn(false));
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const setMenuOptions = () => {
        switch (props.userRole) {
            case 'admin':
                return null;
                break;

            case 'customer':
                return (
                    <Button>
                        <Link
                            className='menu-header__link-btn'
                            to="/customer/profile"
                        >
                            PROFIL
                        </Link>
                    </Button>
                );
                break;

        }
    }

        return (
            <div>
                <Button
                    onClick={handleClick}
                    style={{color:'white'}}
                > <ArrowDropDownCircleIcon/>
                </Button>
                <StyledMenu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    {setMenuOptions()}
                    <Button
                        onClick={handleLogout}
                        style={{color:'white'}}
                    > Wyloguj </Button>
                </StyledMenu>
            </div>
        )
}
