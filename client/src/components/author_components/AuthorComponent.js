import React, { useEffect } from 'react';
import NewAuthor from './NewAuthor';
import AuthorList from './AuthorList';

const AuthorComponent = () => {

    async function getAuthorList() {
        const response = await fetch('catalog/authors');
        const data = await response.json();
        console.log(JSON.stringify(data));
    }

    useEffect(() => {
        getAuthorList();
    }, [])

    return (
        <div>
            <NewAuthor />
            <AuthorList />
        </div>
    )
}

export default AuthorComponent;