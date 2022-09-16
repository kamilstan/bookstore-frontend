import {Header} from "../Header/Header";
import {useSelector} from "react-redux";
import {StoreState} from "../../redux-toolkit/store";
import {AdminNavbar} from "../AdminNavbar/AdminNavbar";
import {BooksList} from "../BookList/BookList";

export const AdminBoxForBooks = () => {
    const { id } = useSelector((store: StoreState) => store.user);

    console.log(id)
    return (
        <div className='admin-box'>
            <Header role='admin' id={id}/>
            <AdminNavbar/>
            <BooksList info='Spis książek:'/>
        </div>

    )
}