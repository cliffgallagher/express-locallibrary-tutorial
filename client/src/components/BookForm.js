import React, { useEffect, useState } from 'react';

const BookForm = (props) => {
    const [authorOptions, setAuthorOptions] = useState([<option key='0' value='0'>Select Author</option>]);
    const [genreOptions, setGenreOptions] = useState([<option key='0' value='0'>Select Genre</option>]);
    const [titleInput, setTitleInput] = useState("");
    const [isbnInput, setISBNInput] = useState("");
    const [summaryInput, setSummaryInput] = useState("");
    const [authorInput, setAuthorInput] = useState();
    const [genreInput, setGenreInput] = useState();

    const getAuthorsFromDatabase = async () => {
        const authorsResponse = await fetch('/catalog/authors');
        const authorObjectArray = await authorsResponse.json();
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
    

    function bookFormSubmitHandler(event) {
        event.preventDefault();
        const userInputData = {
            title: {titleInput},
            author_id: {authorInput},
            summary: {summaryInput},
            isbn: {isbnInput},
            genre_id: {genreInput}
        }
        console.log(userInputData);
        
        //console.log("submitted");
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
    
    return <form onSubmit={bookFormSubmitHandler}>
            <label>Title<input type='text' name='titleField' value={titleInput} onChange={titleInputChangeHandler} /></label>
            <label>ISBN<input type='text' name='isbnField' value={isbnInput} onChange={isbnInputChangeHandler}/></label>
            <label>Summary<input type='text' name='summaryField' value={summaryInput} onChange={summaryInputChangeHandler}/></label>
            <label>Author<select name='authors' onChange={authorInputChangeHandler}>{authorOptions}</select></label>
            <label>Genre<select name='genres' onChange={genreInputChangeHandler}>{genreOptions}</select></label>
            <button onClick={props.onCancel}>Cancel</button>
            <button type='submit'>Submit</button>
        </form>
}

export default BookForm;