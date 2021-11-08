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
    const [newAuthorInfoForWarning, setNewAuthorInfoForWarning] = useState();

    async function getAuthorList() {
        const response = await fetch('catalog/authors');
        const data = await response.json();
        //console.log('author data: ' + JSON.stringify(data));
        setAuthorArray(() => {
            return data.map(element => <AuthorListElement key={element.author_id} authorID={element.author_id} firstName={element.first_name} familyName={element.family_name} dateOfBirth={element.date_of_birth} dateOfDeath={element.date_of_death} setDisplayAuthorPopupForUpdate={setDisplayAuthorPopupForUpdate} authorInfoToAuthorComponent={authorInfoToAuthorComponent} setDisplayAuthorPopupForDelete={setDisplayAuthorPopupForDelete}/>);
        });
        
    }

    useEffect(() => {
        getAuthorList();
    }, [])

    function authorInfoToAuthorComponent(authorID) {
        setAuthorIDForPopupForUpdate(authorID);
    }

    function passNewAuthorInfo(newAuthorInfo) {
        //console.log("new author info in AuthorComponent: " + JSON.stringify(newAuthorInfo));
        setNewAuthorInfoForWarning(newAuthorInfo);
    }

    return (
        <div>
            {displayAuthors && !displayAuthorPopupForUpdate && (
                <div>
                    <NewAuthor getAuthorList={getAuthorList} passNewAuthorInfo={passNewAuthorInfo} newAuthorInfoForWarning={newAuthorInfoForWarning}/>
                    <AuthorList authorArray={authorArray}/>
                </div>
            )}
            {displayAuthorPopupForUpdate && (
                <div>
                    <NewAuthor getAuthorList={getAuthorList}/>
                    <AuthorList authorArray={authorArray}/>
                    <AuthorPopupForUpdate setDisplayAuthorPopupForUpdate={setDisplayAuthorPopupForUpdate} authorID={authorIDForPopupForUpdate} getAuthorList={getAuthorList}/>
                </div>
            )}
            {displayAuthorPopupForDelete && (
                <div>
                    <NewAuthor getAuthorList={getAuthorList}/>
                    <AuthorList authorArray={authorArray}/>
                    <AuthorPopupForDelete displayAuthorPopupForDelete={setDisplayAuthorPopupForDelete} authorID={authorIDForPopupForUpdate} getAuthorList={getAuthorList}/>
                </div>
            )}
        </div>
    )
}

export default AuthorComponent;