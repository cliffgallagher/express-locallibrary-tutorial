import React, { useEffect, useState } from 'react';

const BookForm = (props) => {
    console.log("BookForm rendered");
    const [authorOptions, setAuthorOptions] = useState([<option key='0' value='0'>Select Author</option>]);
    const [genreOptions, setGenreOptions] = useState();

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
        setGenreOptions(() => {
            return genreObjectArray.map(element => <option key={element.genre_id} value={element.genre_id}>{element.name}</option>);
        })     
    }

    
    useEffect(() => {
        getAuthorsFromDatabase();
        getGenresFromDatabase();
    }, [])
    

    function bookFormSubmitHandler(event) {
        event.preventDefault();
        console.log("submitted");
    }
    return <form onSubmit={bookFormSubmitHandler}>
            <label>Title<input type='text' name='titleField'/></label>
            <label>ISBN<input type='text' name='isbnField' /></label>
            <label>Summary<input type='text' name='summaryField' /></label>
            <label>Author<select name='authors'>{authorOptions}</select></label>
            <label>Genre<select name='genres'>{genreOptions}</select></label>
            <button onClick={props.onCancel}>Cancel</button>
            <button type='submit'>Submit</button>
        </form>
}

export default BookForm;