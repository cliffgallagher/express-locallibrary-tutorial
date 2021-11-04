import React, { useEffect, useState } from 'react';
import NewGenre from './NewGenre';
import GenreList from './GenreList';
import GenreListItem from './GenreListItem';

const GenreComponent = () => {
    const [genreArray, setGenreArray] = useState();

    async function getGenreList() {
        const response = await fetch('catalog/genres');
        const data = await response.json();
        //console.log('genreList in genre component: ' + JSON.stringify(data));
        setGenreArray(() => {
            return data.map(element => <GenreListItem genreName={element.name}/>)
        });
    }

    useEffect(() => {
        getGenreList();
    }, []);
    
    return (
        <div>
            <NewGenre />
            <GenreList genreArray={genreArray}/>
        </div>
    )
}

export default GenreComponent;