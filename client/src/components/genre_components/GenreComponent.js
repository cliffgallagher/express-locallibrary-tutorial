import React, { useEffect, useState } from 'react';
import NewGenre from './NewGenre';
import GenreList from './GenreList';
import GenreListItem from './GenreListItem';
import GenrePopupForUpdate from './GenrePopupForUpdate';

const GenreComponent = () => {
    const [genreArray, setGenreArray] = useState();
    const [displayGenrePopupForUpdate, setDisplayGenrePopupForUpdate] = useState(false);

    async function getGenreList() {
        const response = await fetch('catalog/genres');
        const data = await response.json();
        //console.log('genreList in genre component: ' + JSON.stringify(data));
        setGenreArray(() => {
            return data.map(element => <GenreListItem genreName={element.name} setDisplayGenrePopupForUpdate={setDisplayGenrePopupForUpdate}/>)
        });
    }

    useEffect(() => {
        getGenreList();
    }, []);
    
    return (
        <div>
            {!displayGenrePopupForUpdate && <div>
                <NewGenre getGenreList={getGenreList}/>
                <GenreList genreArray={genreArray}/>    
            </div>}
            {displayGenrePopupForUpdate && <div>
                <NewGenre getGenreList={getGenreList}/>
                <GenreList genreArray={genreArray}/> 
                <GenrePopupForUpdate />   
            </div>}
        </div>
    )
}

export default GenreComponent;