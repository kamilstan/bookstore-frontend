import React from "react";
import {SyntheticEvent, useContext, useState} from "react";
import {SearchContext} from "../../contexts/search.context";
import "./Search.css";
import {Button} from "../../common/Button/Button";

export const Search = () => {

    const {search, setSearch} = useContext(SearchContext)
    const [inputValue, setInputValue] = useState(search)

    const setSearchingResult = (e:SyntheticEvent) => {
        e.preventDefault();
        setSearch(inputValue);
    }

    return(
        <form className="search" onSubmit={setSearchingResult} >
            <input placeholder="Wyszukaj wg tytułu.." value={inputValue} onChange={e => setInputValue(e.target.value)} type="text"/>
            <Button text='Szukaj'/>
        </form>
    )
}