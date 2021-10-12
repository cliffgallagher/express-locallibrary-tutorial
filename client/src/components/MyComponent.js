import React, {useEffect, useState } from 'react';
import DataItem from './DataItem';
import NewBook from './NewBook';

const MyComponent = () => {
    const [myArray, setMyArray] = useState([]);

    const getData = async () => {
        try {
            const promise = await fetch("/catalog");
            const arrayFromJSON = await promise.json();
            console.log(arrayFromJSON);
            setMyArray((prevState) => {
                return [...prevState, arrayFromJSON.map((element) => <DataItem key={element.book_id} title={element.title} isbn={element.isbn} summary={element.summary}/>)]
            })       
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return(
        <div>
            <NewBook />
            <ul>{myArray}</ul>
        </div>
    );

}

export default MyComponent;