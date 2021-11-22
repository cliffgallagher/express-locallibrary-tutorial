import React, { useState, useEffect } from 'react';
import NewAuthor from './NewAuthor';
import AuthorList from './AuthorList';
import AuthorListElement from './AuthorListElement';
import AuthorPopupForUpdate from './AuthorPopupForUpdate';
import AuthorPopupForDelete from './AuthorPopupForDelete';

const AuthorComponent = () => {
    const [displayAuthors, setDisplayAuthors] = useState(true);
    const [authorArray, setAuthorArray] = useState();
    const [displayAuthorPopupForUpdate, setDisplayAuthorPopupForUpdate] = useState(false);
    const [authorIDForPopupForUpdate, setAuthorIDForPopupForUpdate] = useState();
    const [displayAuthorPopupForDelete, setDisplayAuthorPopupForDelete] = useState(false);

    async function getAuthorList() {
        const response = await fetch('catalog/authors');
        const data = await response.json();
        //console.log('author data: ' + JSON.stringify(data));
        setAuthorArray(() => {
            return data.map(element => <AuthorListElement key={element.author_id} authorID={element.author_id} firstName={element.first_name} familyName={element.family_name} dateOfBirth={element.date_of_birth} dateOfDeath={element.date_of_death} setDisplayAuthorPopupForUpdate={setDisplayAuthorPopupForUpdate} authorInfoToAuthorComponent={authorInfoToAuthorComponent} setDisplayAuthorPopupForDelete={setDisplayAuthorPopupForDelete} setDisplayAuthors={setDisplayAuthors}/>);
        });
        
    }

    useEffect(() => {
        getAuthorList();
    }, [])

    function authorInfoToAuthorComponent(authorID) {
        setAuthorIDForPopupForUpdate(authorID);
    }

    return (
        <div>
            {displayAuthors && !displayAuthorPopupForUpdate && (
                <div>
                    <NewAuthor getAuthorList={getAuthorList}/>
                    <AuthorList authorArray={authorArray} />
                </div>
            )}
            {displayAuthorPopupForUpdate && (
                <div>
                    <NewAuthor getAuthorList={getAuthorList}/>
                    <AuthorList authorArray={authorArray}/>
                    <AuthorPopupForUpdate setDisplayAuthorPopupForUpdate={setDisplayAuthorPopupForUpdate} authorID={authorIDForPopupForUpdate} getAuthorList={getAuthorList}/>
                </div>
            )}
            {displayAuthorPopupForDelete && !displayAuthors && (
                <div>
                    <NewAuthor getAuthorList={getAuthorList}/>
                    <AuthorList authorArray={authorArray}/>
                    <AuthorPopupForDelete setDisplayAuthorPopupForDelete={setDisplayAuthorPopupForDelete} authorID={authorIDForPopupForUpdate} getAuthorList={getAuthorList} setDisplayAuthors={setDisplayAuthors}/>
                </div>
            )}
        </div>
    )
}

export default AuthorComponent;