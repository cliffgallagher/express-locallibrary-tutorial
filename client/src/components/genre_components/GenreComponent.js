import React, { useEffect, useState, useContext } from 'react';
import NewGenre from './NewGenre';
import GenreList from './GenreList';
import GenreListItem from './GenreListItem';
import GenrePopupForUpdate from './GenrePopupForUpdate';
import GenrePopupForDelete from './GenrePopupForDelete';
import { AuthContext } from '../../context/auth-context';
import ReactGA from 'react-ga';

const GenreComponent = () => {
    const [genreArray, setGenreArray] = useState();
    const [displayGenrePopupForUpdate, setDisplayGenrePopupForUpdate] = useState(false);
    const [genreIDInPopups, setGenreIDInPopups] = useState();
    const [displayGenrePopupForDelete, setDisplayGenrePopupForDelete] = useState(false);
    const auth = useContext(AuthContext);

    async function getGenreList() {
        const response = await fetch('catalog/genres', {
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

        setGenreArray(() => {
            return data.map(element => <GenreListItem key={element.genre_id} genreID={element.genre_id} genreName={element.name} setDisplayGenrePopupForUpdate={setDisplayGenrePopupForUpdate} receiveGenreID={receiveGenreID} setDisplayGenrePopupForDelete={setDisplayGenrePopupForDelete} getGenreList={getGenreList}/>)
        });
    }

    function receiveGenreID(genreID) {
        setGenreIDInPopups(genreID);
    }

    useEffect(() => {
        getGenreList();
    }, []);
    
    return (
        <div data-cy='genre_component'>
            {!displayGenrePopupForUpdate && !displayGenrePopupForDelete && <div>
                <NewGenre getGenreList={getGenreList}/>
                <GenreList genreArray={genreArray}/>    
            </div>}
            {displayGenrePopupForUpdate && <div>
                <NewGenre getGenreList={getGenreList}/>
                <GenreList genreArray={genreArray}/> 
                <GenrePopupForUpdate setDisplayGenrePopupForUpdate={setDisplayGenrePopupForUpdate} genreID={genreIDInPopups} getGenreList={getGenreList}/>   
            </div>}
            {displayGenrePopupForDelete && <div>
                <NewGenre getGenreList={getGenreList}/>
                <GenreList genreArray={genreArray}/> 
                <GenrePopupForDelete genreID={genreIDInPopups} getGenreList={getGenreList} setDisplayGenrePopupForDelete={setDisplayGenrePopupForDelete}/>   
            </div>}
        </div>
    )
}

export default GenreComponent;