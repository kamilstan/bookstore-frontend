import {Header} from "../Header/Header";
import {useSelector} from "react-redux";
import {StoreState} from "../../redux-toolkit/store";

export const AdminBox = () => {
    const { id } = useSelector((store: StoreState) => store.user);

    console.log(id)
    return (
        <>
            <Header role='admin' id={id}/>
        </>

    )
}