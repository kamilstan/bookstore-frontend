import {apiUrl} from "../../config/api";
import {useContext, useEffect, useState} from "react";
import {BookEntityFront} from "types"
import {SearchContext} from "../../contexts/search.context";

import "./BookList.css"
import {BookItem} from "../BookItem/BookItem";

export const BooksList = () => {

    const {search} = useContext(SearchContext);

    const [books, setBooks] = useState<BookEntityFront[]>([]);

    useEffect(() => {
        (async () => {
            const res = await fetch(`${apiUrl}/book/search/${search}`)
            const data = await res.json();
            setBooks(data);
        })();

    }, [search]);

    return (

        <main className="books">

            <h2>Sprawdź szeroką ofertę naszych książek!</h2>
            <ul className="booksList">
                {
                    books.map((book, index) => (
                        <BookItem key={book.id} id={book.id} index={index + 1}/>
                    ))
                }
            </ul>
        </main>
    )
}