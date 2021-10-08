import React, {useEffect, useState } from 'react';
import DataItem from './DataItem';

const MyComponent = () => {
    const [myArray, setMyArray] = useState([]);

    const getData = async () => {
        try {
            const promise = await fetch("/catalog");
            const arrayFromJSON = await promise.json();
            console.log(arrayFromJSON.length);
            setMyArray((prevState) => {
                return [...prevState, arrayFromJSON.map((element) => <DataItem book_id={arrayFromJSON.length} />)]
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