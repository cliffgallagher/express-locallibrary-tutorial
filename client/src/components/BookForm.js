const BookForm = (props) => {

    function bookFormSubmitHandler(event) {
        event.preventDefault();
        console.log("submitted");
    }
    return <form onSubmit={bookFormSubmitHandler}>
            <label>Title<input type='text' name='titleField'/></label>
            <label>ISBN<input type='text' name='isbnField' /></label>
            <label>Summary<input type='text' name='summaryField' /></label>
            <button onClick={props.onCancel}>Cancel</button>
            <button type='submit'>Submit</button>
        </form>
}

export default BookForm;