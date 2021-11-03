import React, { useState, useEffect } from 'react';
import NewAuthor from './NewAuthor';
import AuthorList from './AuthorList';
import AuthorListElement from './AuthorListElement';

const AuthorComponent = () => {
    const [authorArray, setAuthorArray] = useState();

    async function getAuthorList() {
        const response = await fetch('catalog/authors');
        const data = await response.json();
        console.log('author data: ' + JSON.stringify(data));
        setAuthorArray(() => {
            return data.map(element => <AuthorListElement key={element.author_id} authorID={element.author_id} firstName={element.first_name} familyName={element.family_name} dateOfBirth={element.date_of_birth} dateOfDeath={element.date_of_death}/>);
        });
        
    }

    useEffect(() => {
        getAuthorList();
    }, [])

    return (
        <div>
            <NewAuthor getAuthorList={getAuthorList}/>
            <AuthorList authorArray={authorArray}/>
        </div>
    )
}

export default AuthorComponent;