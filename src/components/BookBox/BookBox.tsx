import React, {SyntheticEvent, useEffect, useState} from "react";
import {BookEntityFront} from "types"
import {Link, useParams} from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {Avatar, Rating, Typography} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
// import {apiUrl} from "../../config/api";

import "./BookBox.css";
import {useDispatch, useSelector} from "react-redux";
import {StoreState} from "../../redux-toolkit/store";


export const BookBox = () => {

    const { id} = useSelector((store: StoreState) => store.user);
    const dispatch = useDispatch();

    const {bookId} = useParams();
    const [book, setBook] = useState<BookEntityFront | null>(null);
    const [form, setForm] = useState(0);
    const [value, setValue] = useState<number | null>(2);

    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:8080/api/book/${bookId}`);
            const data = await res.json();
            console.log(data);
            setBook(data);
        })();
    }, []);

    if (book === null){
        return null
    }

    const buyOneBook = (e: SyntheticEvent) => {
        e.preventDefault();
        (async () => {
            const res = await fetch(`http://localhost:8080/api/book/${bookId}/buy`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customerId: id,
                    bookId: bookId,
                    count: form
                }),
            });
            const result = await res.json();
            console.log(result);
            const newCount = book.count - form;
            setBook({
                ...book,
                count: newCount,
            });
        })();
    }

    return (
        <div className="single-book-view" >
            <header className="single-book-header">
                <h1>Tytuł: <b>{book.title}</b></h1>
                <Link className="button" to={`/customer`}><KeyboardBackspaceIcon/></Link>
            </header>

                <main className="single-book-main">
                    <div className= "single-book-avatar">
                        <Avatar
                            sx={{ width: '10rem', height: '10rem' }}
                            style={{backgroundColor: '#4c4c50', marginBottom: 15, }}
                            variant='rounded'
                        ><MenuBookIcon/>
                        </Avatar>
                        {/*<Typography component="legend">Oceń książkę</Typography>*/}
                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                    </div>
                    <div className= "single-book-info">
                        <p>Autor: <b>{book.author}</b></p>
                        <p>Opis: <b>{book.description}</b></p>
                        <p>Ocena: <b>{book.review}</b></p>
                        <p>Ilość: <b>{book.count}</b></p>
                        <form onSubmit={buyOneBook}>
                            <p>
                                <label>
                                    Ilość: <br/>
                                    <input
                                        type="number"
                                        name="count"
                                        value={form}
                                        onChange={e =>setForm(Number(e.target.value))}
                                    />
                                </label>
                            </p>
                            <button className='button' type='submit'> Kup </button>
                        </form>
                    </div>


                </main>

        </div>

    )

}