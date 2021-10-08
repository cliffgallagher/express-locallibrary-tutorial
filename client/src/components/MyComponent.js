import React, {useEffect, useState } from 'react';
import DataItem from './DataItem';

const MyComponent = () => {
    const [myArray, setMyArray] = useState([]);

    const getData = async () => {
        try {
            const promise = await fetch("/catalog");
            const arrayFromJSON = await promise.json();
            console.log(arrayFromJSON);
            setMyArray((prevState) => {
                return [...prevState, arrayFromJSON.map((element) => <DataItem book_id={element.book_id} />)]
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
            {myArray}
        </div>
    );

}

export default MyComponent;