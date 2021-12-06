import { useEffect, useState } from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import BookComponent from './components/book_components/BookComponent';
import AuthorComponent from './components/author_components/AuthorComponent';
import GenreComponent from './components/genre_components/GenreComponent';
import UserInfoComponent from './components/user_components/UserInfoComponent';
import NavbarHeader from './components/NavbarHeader';
import NavbarOptions from './components/NavbarOptions';
import Login from './components/user_components/Login.js';
import NewUserSignup from './components/user_components/NewUserSignup.js';

function App() {
  const [displayBookComponent, setDisplayBookComponent] = useState(true);
  const [displayAuthorComponent, setDisplayAuthorComponent] = useState(false);
  const [displayGenreComponent, setDisplayGenreComponent] = useState(false);
  const [displayNavbar, setDisplayNavbar] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayUserInfoComponent, setDisplayUserInfoComponent] = useState(false);

  function displayBookComponentFunction() {
    setDisplayBookComponent(true);
    setDisplayAuthorComponent(false);
    setDisplayGenreComponent(false);
    setDisplayUserInfoComponent(false);
  }

  function displayAuthorComponentFunction() {
    setDisplayBookComponent(false);
    setDisplayAuthorComponent(true);
    setDisplayGenreComponent(false);
    setDisplayUserInfoComponent(false);
  }

  function displayGenreComponentFunction() {
    setDisplayBookComponent(false);
    setDisplayAuthorComponent(false);
    setDisplayGenreComponent(true);
    setDisplayUserInfoComponent(false);
  }

  function displayUserInfoComponentFunction() {
    setDisplayBookComponent(false);
    setDisplayAuthorComponent(false);
    setDisplayGenreComponent(false);
    setDisplayUserInfoComponent(true);
  }

  useEffect(() => {
    setIsLoggedIn(true);
  }, []);

  return (
    <div className={styles.appClass}>
        {!isLoggedIn && !isNewUser && (
          <div>
            <Login setIsNewUser={setIsNewUser}/>
          </div>
        )}
        {!isLoggedIn && isNewUser && (
          <NewUserSignup setIsNewUser={setIsNewUser}/>
        )}
        {isLoggedIn && (
          <div>
            <NavbarHeader setDisplayNavbar={setDisplayNavbar}/>
            <NavbarOptions displayNavbar={displayNavbar} setDisplayNavbar={setDisplayNavbar} displayBookComponentFunction={displayBookComponentFunction} displayAuthorComponentFunction={displayAuthorComponentFunction} displayGenreComponentFunction={displayGenreComponentFunction} displayUserInfoComponentFunction={displayUserInfoComponentFunction}/>
            {displayBookComponent && !displayAuthorComponent && !displayGenreComponent && !displayUserInfoComponent && <BookComponent />}
            {!displayBookComponent && displayAuthorComponent && !displayGenreComponent && !displayUserInfoComponent &&<AuthorComponent />}
            {!displayBookComponent && !displayAuthorComponent && displayGenreComponent && !displayUserInfoComponent &&<GenreComponent />}
            {!displayBookComponent && !displayAuthorComponent && !displayGenreComponent && displayUserInfoComponent &&<UserInfoComponent/>}
          </div>
        )}
    </div>
  );
}

export default App;
