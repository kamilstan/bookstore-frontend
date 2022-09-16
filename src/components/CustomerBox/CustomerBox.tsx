import React, {useEffect, useState} from "react";
import {Header} from "../Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {StoreState} from "../../redux-toolkit/store";
import {set} from "react-hook-form";
import { CustomerFrontEntity } from 'types';
import {BooksList} from "../BookList/BookList";
import {Search} from "../Search/Search";

export const CustomerBox = () => {

    const { id, accessToken} = useSelector((store: StoreState) => store.user);
    const [customerData, setCustomerData] = useState<CustomerFrontEntity>({
        id: '',
        userId: '',
        email: '',
        fullName: '',
    });

    const dispatch = useDispatch();

    useEffect(() => {
       const getCustomerData =  async () => {
            console.log('jakie id?', id)
            try{
                const res = await fetch(`http://localhost:8080/api/customer/home/${id}`, {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${accessToken}`,
                    },
                });
                const data = await res.json();
                await setCustomerData({...data});
                console.log(data.email);
            } catch (err) {
                console.error(err);
            }
        };
       getCustomerData();
    }, []);


    return (
        <>
            <Header role='customer' id={id} email={customerData.email} />
            <Search/>
            <BooksList/>
        </>


    )
}