import React from 'react';
import styles from './BookList.module.css';

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
    

    return (
        <div>
            <ul className={styles.ulGrid}>{props.bookArray}</ul>
        </div>
    )
}

export default BookList;