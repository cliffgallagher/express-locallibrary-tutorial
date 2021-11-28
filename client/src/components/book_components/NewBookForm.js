import React, { useEffect, useState } from 'react';
import styles from "../NewElementForm.module.css";

const NewBookForm = (props) => {
    const [authorOptions, setAuthorOptions] = useState([<option key='0' value='0'>Select Author</option>]);
    const [genreOptions, setGenreOptions] = useState([<option key='0' value='0'>Select Genre</option>]);
    const [titleInput, setTitleInput] = useState("");
    const [isbnInput, setISBNInput] = useState("");
    const [summaryInput, setSummaryInput] = useState("");
    const [authorInput, setAuthorInput] = useState();
    const [genreInput, setGenreInput] = useState();
    const [validationErrors, setValidationErrors] = useState();

    const getAuthorsFromDatabase = async () => {
        const authorsResponse = await fetch('/catalog/authors');
        const authorObjectArray = await authorsResponse.json();
        //console.log(JSON.stringify(authorObjectArray));
        setAuthorOptions((prevState) => {
            return [...prevState, authorObjectArray.map(element => <option key={element.author_id} value={element.author_id}>{element.family_name + ", " + element.first_name}</option>)];
        })     
    }

    const getGenresFromDatabase = async () => {
        const genresResponse = await fetch('/catalog/genres');
        const genreObjectArray = await genresResponse.json();
        setGenreOptions((prevState) => {
            return [...prevState, genreObjectArray.map(element => <option key={element.genre_id} value={element.genre_id}>{element.name}</option>)];
        })   
    }

    useEffect(() => {
        getAuthorsFromDatabase();
        getGenresFromDatabase();
    }, [])
    

    async function bookFormSubmitHandler(event) {
        event.preventDefault();
        const userInputData = {
            title: titleInput,
            author_id: authorInput,
            summary: summaryInput,
            isbn: isbnInput,
            genre_id: genreInput
        }

        //console.log("input data in New Book Form: " + JSON.stringify(userInputData));

        props.newBookInfoToNewBook(userInputData);

        //console.log("userInput in new book form: " + JSON.stringify(userInputData));
        
        const insertBook = async () => {
            //console.log("entered insertBook");
            const response = await fetch('catalog/book/create/one', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInputData)
            });
            const data = await response.json();
            console.log("data in NewBookForm: " + JSON.stringify(data));
            return data;
        }

        const data = await insertBook();
        //console.log("data has property 'errors': " + data.hasOwnProperty('errors'));
        /*if (data === "title already present in database") {
            props.isAddingDuplicate();
        } else {
            console.log("book inserted");
            props.getBookListNewBookToBookForm();
            setTitleInput("");
            setISBNInput("");
            setSummaryInput("");
            setAuthorInput(0);
            setGenreInput(0);
        }*/

        if (typeof data === 'object') {
            if (data.hasOwnProperty('errors')) {
                //console.log("data.errors: " + JSON.stringify(data.errors));
                const errorMessages = data.errors.map(element => element.msg);
                if (errorMessages.includes("title already in database")) {
                    props.isAddingDuplicate();
                } else {
                    //console.log("errorMessages: " + JSON.stringify(errorMessages));
                    setValidationErrors(() => {
                        return errorMessages.map(element => <li>{element}</li>);
                    });
                }
                //console.log("errorMessages: " + JSON.stringify(errorMessages));
            } else {
                // figure out
                //console.log("book inserted");
                props.getBookListNewBookToBookForm();
                setTitleInput("");
                setISBNInput("");
                setSummaryInput("");
                setAuthorInput(0);
                setGenreInput(0);
            }
        }
    }

    function titleInputChangeHandler(event) {
        setTitleInput(event.target.value);

    }

    function isbnInputChangeHandler(event) {
        setISBNInput(event.target.value);
    }

    function summaryInputChangeHandler(event) {
        setSummaryInput(event.target.value);
    }

    function authorInputChangeHandler(event) {
        setAuthorInput(event.target.value);
    }

    function genreInputChangeHandler(event) {
        setGenreInput(event.target.value);
    }
    
    return <form id={styles.newElementForm} onSubmit={bookFormSubmitHandler}>
            <ul>{validationErrors}</ul>
            <label>Title<input type='text' name='titleField' value={titleInput} onChange={titleInputChangeHandler} /></label>
            <label>ISBN<input type='text' name='isbnField' value={isbnInput} onChange={isbnInputChangeHandler}/></label>
            <label id={styles.newBookSummaryLabel}>Summary<textarea id={styles.newBookSummaryInput} name='summaryField' value={summaryInput} rows="5" cols="25" onChange={summaryInputChangeHandler}/></label>
            <label>Author<select name='authors' value ={authorInput} onChange={authorInputChangeHandler}>{authorOptions}</select></label>
            <label>Genre<select name='genres' value={genreInput} onChange={genreInputChangeHandler}>{genreOptions}</select></label>
            <button type='submit'>Submit</button>
            <button onClick={props.onCancel}>Cancel</button>
        </form>
}

export default NewBookForm;