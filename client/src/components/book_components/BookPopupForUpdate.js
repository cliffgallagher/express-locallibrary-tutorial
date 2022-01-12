import React, { useEffect, useState, useContext } from 'react';
import styles from '../ElementPopupForUpdate.module.css';
import {AuthContext} from '../../context/auth-context';

const BookPopupForUpdate = (props) => {
    const [updateFormAuthorOptions, setUpdateFormAuthorOptions] = useState([]);
    const [updateFormGenreOptions, setUpdateFormGenreOptions] = useState([])
    const [updateFormTitleInput, setUpdateFormTitleInput] = useState();
    const [updateFormISBNInput, setUpdateFormISBNInput] = useState();
    const [updateFormSummaryInput, setUpdateFormSummaryInput] = useState();
    const [updateFormAuthorInput, setUpdateFormAuthorInput] = useState();
    const [updateFormGenreInput, setUpdateFormGenreInput] = useState();
    const [displayDuplicateWarning, setDisplayDuplicateWarning] = useState(false);
    const [initialTitle, setInitialTitle] = useState();
    const [validationErrors, setValidationErrors] = useState();
    const auth = useContext(AuthContext);

    const getAuthorsFromDatabase = async () => {
        try {
            const authorsResponse = await fetch('/catalog/authors', {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });
            const authorObjectArray = await authorsResponse.json();
            if (typeof authorObjectArray === 'object') {
                if (authorObjectArray.name === 'TokenExpiredError') {
                    auth.setIsLoggedIn(false);
                }
            }
            setUpdateFormAuthorOptions(() => {
                return [authorObjectArray.map(element => <option key={element.author_id} value={element.author_id}>{element.family_name + ", " + element.first_name}</option>)];
            }); 
        } catch(e) {
            //console.log(e);
        }     
    }

    const getGenresFromDatabase = async () => {
        const genresResponse = await fetch('/catalog/genres', {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });
        const genreObjectArray = await genresResponse.json();
        if (typeof genreObjectArray === 'object') {
            if (genreObjectArray.name === 'TokenExpiredError') {
                auth.setIsLoggedIn(false);
            }
        }
        setUpdateFormGenreOptions(() => {
            return [genreObjectArray.map(element => <option key={element.genre_id} value={element.genre_id}>{element.name}</option>)];
        })   
    }
    
    async function fetchBook() {
        try {
            const response = await fetch(`catalog/book/${props.bookID}/update`, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });
            const bodyOfResponse = await response.json();
            if (typeof bodyOfResponse === 'object') {
                if (bodyOfResponse.name === 'TokenExpiredError') {
                    auth.setIsLoggedIn(false);
                }
            }
            setUpdateFormTitleInput(bodyOfResponse[0].title);
            setUpdateFormISBNInput(bodyOfResponse[0].isbn);
            setUpdateFormSummaryInput(bodyOfResponse[0].summary);
            setInitialTitle(bodyOfResponse[0].title);
            
        } catch(e) {
            //console.log(e);
        }
    }

    const updateBookWithTitleCheck = async (updatedBookInfo) => {
        //console.log('in title check: ' + JSON.stringify(updatedBookInfo));
        const response = await fetch(`catalog/book/${props.bookID}/update/one`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`
            },
            body: JSON.stringify(updatedBookInfo)
        });
        const data = await response.json();

        if (typeof data === 'object') {
            if (data.name === 'TokenExpiredError') {
                auth.setIsLoggedIn(false);
            }
            if (data.hasOwnProperty('errors')) {
                const errorMessages = data.errors.map(element => element.msg);
                if (errorMessages.includes("title already in database")) {
                    setDisplayDuplicateWarning(true);
                } else {
                    setValidationErrors(() => {
                        return errorMessages.map(element => <li>{element}</li>);
                    });
                }
            } else {
                props.getBookList();
                props.setDisplayElementPopupForUpdate(false);
                props.setDisplayElement(false);
                props.setHideElement(false);

                return response;
            }
        }
    }

    const updateBookNoTitleCheck = async (updatedBookInfo) => {
        const response = await fetch(`catalog/book/${props.bookID}/update/two`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`
            },
            body: JSON.stringify(updatedBookInfo)
        });

        const data = await response.json();
        if (typeof data === 'object') {
            if (data.name === 'TokenExpiredError') {
                auth.setIsLoggedIn(false);
            }
            if (data.hasOwnProperty('errors')) {
                const errorMessages = data.errors.map(element => element.msg);
                setValidationErrors(() => {
                        return errorMessages.map(element => <li>{element}</li>);
                });
            } else {
                props.getBookList();
                props.setDisplayElementPopupForUpdate(false);
                props.setDisplayElement(false);
                props.setHideElement(false);
            }
        }   
    }

    useEffect(async () => {
        fetchBook();
        await getAuthorsFromDatabase();
        setUpdateFormAuthorInput(props.authorID);
        await getGenresFromDatabase();
        setUpdateFormGenreInput(props.genreID);

    }, []);

    async function popupForUpdateSubmitHandler(event) {
        event.preventDefault();
        const updatedBookInfo = {
            title: updateFormTitleInput,
            escapedTitle: updateFormTitleInput.replaceAll('\'', '\\\''),
            authorID: updateFormAuthorInput,
            isbn: updateFormISBNInput,
            genreID: updateFormGenreInput,
            summary: updateFormSummaryInput.replaceAll('\'', '\\\'')
        }
        //console.log('updatedBookInfo: ' + JSON.stringify(updatedBookInfo))
        if (initialTitle === updatedBookInfo.title) {
            updateBookNoTitleCheck(updatedBookInfo);
        } else {
            updateBookWithTitleCheck(updatedBookInfo);
        }
    }
    
    function updateFormTitleInputChangeHandler(event) {
        setUpdateFormTitleInput(event.target.value);
    }

    function updateFormAuthorInputChangeHandler(event) {
        setUpdateFormAuthorInput(event.target.value);
    }

    function updateFormISBNInputChangeHandler(event) {
        setUpdateFormISBNInput(event.target.value);
    }

    function updateFormGenreInputChangeHandler(event) {
        setUpdateFormGenreInput(event.target.value);
    }

    function updateFormSummaryInputChangeHandler(event) {
        setUpdateFormSummaryInput(event.target.value);
    }

    function popupForUpdateCloseButtonHandler(event) {
        props.setDisplayElementPopupForUpdate(false);
    }

    function duplicateTitleUpdateWarningSubmitHandler(event) {
        event.preventDefault();
        const updatedBookInfo = {
            title: updateFormTitleInput,
            escapedTitle: updateFormTitleInput.replaceAll('\'', '\\\''),
            authorID: updateFormAuthorInput,
            isbn: updateFormISBNInput,
            genreID: updateFormGenreInput,
            summary: updateFormSummaryInput
        }
        updateBookNoTitleCheck(updatedBookInfo);
    }

    function duplicateWarningCancelButtonHandler() {
        setDisplayDuplicateWarning(false);
        props.setDisplayElementPopupForUpdate(false);
    }

    return <div className={styles.popup}>
        <div data-cy='book_popup_for_update'>
            {!displayDuplicateWarning && <form className={styles.popupInner} onSubmit={popupForUpdateSubmitHandler}>
                <ul>{validationErrors}</ul>
                <label>Title<input type='text' name='updateFormTitleField' value={updateFormTitleInput} onChange={updateFormTitleInputChangeHandler} data-cy='book_update_title_field'/></label>
                <label>Author<select name='updateFormAuthorField' value={updateFormAuthorInput} onChange={updateFormAuthorInputChangeHandler} data-cy='book_update_author_field'>{updateFormAuthorOptions}</select></label>
                <label>ISBN<input type='text' name='updateFormISBNField' value={updateFormISBNInput} onChange={updateFormISBNInputChangeHandler} data-cy='book_update_isbn_field'/></label>
                <label>Genre<select name='updateFormGenreField' value={updateFormGenreInput} onChange={updateFormGenreInputChangeHandler} data-cy='book_update_genre_field'>{updateFormGenreOptions}</select></label>
                <label>Summary<textarea id={styles.summary_input} name='updateFormSummaryField' value={updateFormSummaryInput} rows="5" cols="25" onChange={updateFormSummaryInputChangeHandler} data-cy='book_update_summary_field'></textarea></label>
                <div id={styles.button_div}>
                    <button type="submit">Update Book</button>
                    <button className='close-button' onClick={popupForUpdateCloseButtonHandler} id={styles.right_most_button}>Close</button>
                </div>
            </form>}
            {displayDuplicateWarning && (
                <form className={styles.popupInner} onSubmit={duplicateTitleUpdateWarningSubmitHandler}>
                    <p>A book with the title {updateFormTitleInput} already exists in the database. Are you sure you want to update this book to have that title?</p>
                    <div id={styles.button_div}>
                        <button type='submit'>Update</button>
                        <button id={styles.right_most_button} onClick={duplicateWarningCancelButtonHandler}>Cancel</button>
                    </div>
                </form>
            )}
        </div>
    </div>
}

export default BookPopupForUpdate;