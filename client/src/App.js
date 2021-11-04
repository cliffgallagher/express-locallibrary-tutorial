import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import BookComponent from './components/book_components/BookComponent';
import DisplaySelector from './components/DisplaySelector';
import AuthorComponent from './components/author_components/AuthorComponent';
import GenreComponent from './components/genre_components/GenreComponent';

function App() {
  const [displayBookComponent, setDisplayBookComponent] = useState(true);
  const [displayAuthorComponent, setDisplayAuthorComponent] = useState(false);
  const [displayGenreComponent, setDisplayGenreComponent] = useState(false);

  function displayBookComponentFunction() {
    setDisplayBookComponent(true);
    setDisplayAuthorComponent(false);
    setDisplayGenreComponent(false);
  }

  function displayAuthorComponentFunction() {
    setDisplayBookComponent(false);
    setDisplayAuthorComponent(true);
    setDisplayGenreComponent(false);
  }

  function displayGenreComponentFunction() {
    setDisplayBookComponent(false);
    setDisplayAuthorComponent(false);
    setDisplayGenreComponent(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <DisplaySelector displayBookComponentFunction={displayBookComponentFunction} displayAuthorComponentFunction={displayAuthorComponentFunction} displayGenreComponentFunction={displayGenreComponentFunction}/>
        {displayBookComponent && !displayAuthorComponent && !displayGenreComponent && <BookComponent />}
        {!displayBookComponent && displayAuthorComponent && !displayGenreComponent && <AuthorComponent />}
        {!displayBookComponent && !displayAuthorComponent && displayGenreComponent && <GenreComponent />}
      </header>
    </div>
  );
}

export default App;
