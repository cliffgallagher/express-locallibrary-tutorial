import React from 'react';

const BookList = (props) => {
    //const [myArray, setMyArray] = useState([]);

    console.log("rendered BookList component");

    /*const getBookList = async () => {
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
    }*/

    /*() => {
        return [arrayFromJSON.map((element) => <DataItem key={element.book_id} title={element.title} isbn={element.isbn} summary={element.summary}/>)]
    }*/
    

    return <ul>
    {props.myArray}
    </ul>
}

export default BookList;