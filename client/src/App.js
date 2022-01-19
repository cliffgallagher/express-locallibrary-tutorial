import { useEffect, useState } from 'react';
import styles from './App.module.css';
import BookComponent from './components/book_components/BookComponent';
import AuthorComponent from './components/author_components/AuthorComponent';
import GenreComponent from './components/genre_components/GenreComponent';
import NavbarHeader from './components/NavbarHeader';
import NavbarOptions from './components/NavbarOptions';
import Login from './components/user_components/Login.js';
import NewUserSignup from './components/user_components/NewUserSignup.js';
import {AuthContext} from './context/auth-context';
import MetaTags from 'react-meta-tags';

function App() {
  const [displayBookComponent, setDisplayBookComponent] = useState(true);
  const [displayAuthorComponent, setDisplayAuthorComponent] = useState(false);
  const [displayGenreComponent, setDisplayGenreComponent] = useState(false);
  const [displayNavbar, setDisplayNavbar] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayUserInfoComponent, setDisplayUserInfoComponent] = useState(false);
  const [token, setToken] = useState();
  const [searchText, setSearchText] = useState();

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

  function receiveLoggedInUserFromLogin(data) {
    const token = data.accessToken;
    setToken(token);
  }

  async function checkForTokenInCookies() {
    const response = await fetch('users/checkcookies', {
      method: 'POST'
    });
    const data = await response.json();
    if (data.hasOwnProperty('success')) {
      setToken(data.token);
      setIsLoggedIn(true);
    };
  }

  useEffect(() => {
    checkForTokenInCookies();
  }, [])

  return (
    <div className={styles.appClass}>
        <MetaTags>
          <meta name="viewport" content="initial-scale=1.0"/>
        </MetaTags>
        {!isLoggedIn && !isNewUser && (
          <div>
            <Login setIsNewUser={setIsNewUser} setIsLoggedIn={setIsLoggedIn} sendLoggedInUserToApp={receiveLoggedInUserFromLogin}/>
          </div>
        )}
        {!isLoggedIn && isNewUser && (
          <NewUserSignup setIsNewUser={setIsNewUser}/>
        )}
        {isLoggedIn && (
          <div>
            <AuthContext.Provider value={{
                token: token,
                setIsLoggedIn: setIsLoggedIn,
                searchText: searchText
                }}>
              <NavbarHeader setDisplayNavbar={setDisplayNavbar} setSearchText={setSearchText}/>
              <NavbarOptions displayNavbar={displayNavbar} setDisplayNavbar={setDisplayNavbar} displayBookComponentFunction={displayBookComponentFunction} displayAuthorComponentFunction={displayAuthorComponentFunction} displayGenreComponentFunction={displayGenreComponentFunction} displayUserInfoComponentFunction={displayUserInfoComponentFunction} setIsLoggedIn={setIsLoggedIn}/>
              {displayBookComponent && !displayAuthorComponent && !displayGenreComponent && !displayUserInfoComponent && <BookComponent/>}
              {!displayBookComponent && displayAuthorComponent && !displayGenreComponent && !displayUserInfoComponent &&<AuthorComponent />}
              {!displayBookComponent && !displayAuthorComponent && displayGenreComponent && !displayUserInfoComponent &&<GenreComponent />}
            </AuthContext.Provider>
          </div>
        )}
    </div>
  );
}

export default App;
