import { useEffect, useState } from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import BookComponent from './components/book_components/BookComponent';
import AuthorComponent from './components/author_components/AuthorComponent';
import GenreComponent from './components/genre_components/GenreComponent';
import NavbarHeader from './components/NavbarHeader';
import NavbarOptions from './components/NavbarOptions';
import Login from './components/Login.js';

function App() {
  const [displayBookComponent, setDisplayBookComponent] = useState(true);
  const [displayAuthorComponent, setDisplayAuthorComponent] = useState(false);
  const [displayGenreComponent, setDisplayGenreComponent] = useState(false);
  const [displayNavbar, setDisplayNavbar] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    <div className={styles.appClass}>
        {!isLoggedIn && isNewUser && (
          <div>
            <Login />
          </div>
        )}
        {isLoggedIn && (
          <div>
            <NavbarHeader setDisplayNavbar={setDisplayNavbar}/>
            <NavbarOptions displayNavbar={displayNavbar} setDisplayNavbar={setDisplayNavbar} displayBookComponentFunction={displayBookComponentFunction} displayAuthorComponentFunction={displayAuthorComponentFunction} displayGenreComponentFunction={displayGenreComponentFunction}/>
            {displayBookComponent && !displayAuthorComponent && !displayGenreComponent && <BookComponent />}
            {!displayBookComponent && displayAuthorComponent && !displayGenreComponent && <AuthorComponent />}
            {!displayBookComponent && !displayAuthorComponent && displayGenreComponent && <GenreComponent />}
          </div>
        )}
    </div>
  );
}

export default App;
