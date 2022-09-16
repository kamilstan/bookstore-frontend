import {StoreState} from "../../redux-toolkit/store";
import {AdminNavbar} from "../AdminNavbar/AdminNavbar";
import {Header} from "../Header/Header";
import {useSelector} from "react-redux";

export const AdminBoxForCustomers = () => {
    const { id } = useSelector((store: StoreState) => store.user);

    console.log(id)
    return (
        <div className='admin-box'>
            <Header role='admin' id={id}/>
            <AdminNavbar/>

        </div>

    )
}