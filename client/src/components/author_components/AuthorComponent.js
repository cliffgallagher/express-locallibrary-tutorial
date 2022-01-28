import React, { useState, useEffect, useContext } from 'react';
import NewAuthor from './NewAuthor';
import AuthorList from './AuthorList';
import AuthorListElement from './AuthorListElement';
import AuthorPopupForUpdate from './AuthorPopupForUpdate';
import AuthorPopupForDelete from './AuthorPopupForDelete';
import { AuthContext } from '../../context/auth-context';
import ReactGA from 'react-ga';

const AuthorComponent = () => {
    const [displayAuthors, setDisplayAuthors] = useState(true);
    const [authorArray, setAuthorArray] = useState();
    const [displayAuthorPopupForUpdate, setDisplayAuthorPopupForUpdate] = useState(false);
    const [authorIDForPopupForUpdate, setAuthorIDForPopupForUpdate] = useState();
    const [displayAuthorPopupForDelete, setDisplayAuthorPopupForDelete] = useState(false);
    const auth = useContext(AuthContext);

    async function getAuthorList() {
        try {
            const response = await fetch('catalog/authors', {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });
            const data = await response.json();
            if (typeof data === 'object') {
                if (data.name === 'TokenExpiredError') {
                    auth.setIsLoggedIn(false);
                }
            }

            setAuthorArray(() => {
                return data.map(element => <AuthorListElement key={element.author_id} authorID={element.author_id} firstName={element.first_name} familyName={element.family_name} dateOfBirth={element.date_of_birth} dateOfDeath={element.date_of_death} setDisplayAuthorPopupForUpdate={setDisplayAuthorPopupForUpdate} authorInfoToAuthorComponent={authorInfoToAuthorComponent} setDisplayAuthorPopupForDelete={setDisplayAuthorPopupForDelete} setDisplayAuthors={setDisplayAuthors} getAuthorList={getAuthorList}/>);
            });
        } catch(e) {
            //console.log('error: ' + e);
        }        
    }

    useEffect(() => {
        getAuthorList();
    }, [])

    function authorInfoToAuthorComponent(authorID) {
        setAuthorIDForPopupForUpdate(authorID);
    }

    return (
        <div data-cy='author_component'>
            <NewAuthor getAuthorList={getAuthorList}/>
            <AuthorList authorArray={authorArray} />
        </div>
    )
}

export default AuthorComponent;