import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import BookComponent from './components/book_components/BookComponent';
import AuthorComponent from './components/author_components/AuthorComponent';
import GenreComponent from './components/genre_components/GenreComponent';
import NavbarHeader from './components/NavbarHeader';
import NavbarOptions from './components/NavbarOptions';

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
    <div>
        <NavbarHeader />
        <NavbarOptions />
        {displayBookComponent && !displayAuthorComponent && !displayGenreComponent && <BookComponent />}
        {!displayBookComponent && displayAuthorComponent && !displayGenreComponent && <AuthorComponent />}
        {!displayBookComponent && !displayAuthorComponent && displayGenreComponent && <GenreComponent />}
    </div>
  );
}

export default App;
