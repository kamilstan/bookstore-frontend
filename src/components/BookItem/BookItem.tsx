import React, {SyntheticEvent, useEffect, useState} from "react";
import { BookEntity } from "types";
import {Link} from "react-router-dom";
import {apiUrl} from "../../config/api";
import {Avatar} from "@mui/material";
import MenuBookIcon from '@mui/icons-material/MenuBook';

import "./BookItem.css"

interface Props {
    id: string;
    index: number;
}

export const BookItem =(props: Props)=> {

    const [book, setBook] = useState<BookEntity | null>(null);

    useEffect(() => {
        (async () => {
            const res = await fetch(`${apiUrl}/book/${props.id}`);
            const data = await res.json();
            setBook(data);

        })()
    }, [])


    if(book === null) {
        return null
    }

    return (
        <li  className="singleBook">
            <p>{props.index}.</p>
            <div>
                <Avatar
                    sx={{ width: 35, height: 35 }}
                    style={{backgroundColor: '#4c4c50', marginRight: 5, }}
                    variant='rounded'
                ><MenuBookIcon/> </Avatar>
            </div>
            <div className='h3-wrapper'>
                <h3> {book.title}</h3>
                <h3>{book.author}</h3>
            </div>
            <p>Review: {book.review}</p>
            <p>Count: {book.count}</p>
            <Link className="button" to={`/book/${props.id}`}>See more..</Link>
        </li>
    )
}