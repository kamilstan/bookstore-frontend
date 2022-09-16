import React from "react";
import {SyntheticEvent, useContext, useState} from "react";
import {SearchContext} from "../../contexts/search.context";
import "./Search.css";
import {Button} from "../../common/Button/Button";

interface Props {
    placeholder: string;
}

export const Search = (props: Props) => {

    const {search, setSearch} = useContext(SearchContext)
    const [inputValue, setInputValue] = useState(search)
    const {placeholder} = props;
    const setSearchingResult = (e:SyntheticEvent) => {
        e.preventDefault();
        setSearch(inputValue);
    }

    return(
        <form className="search" onSubmit={setSearchingResult} >
            <input placeholder={placeholder} value={inputValue} onChange={e => setInputValue(e.target.value)} type="text"/>
            <Button text='Szukaj'/>
        </form>
    )
}