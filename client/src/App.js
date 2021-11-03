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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <DisplaySelector setDisplayBookComponent={setDisplayBookComponent} setDisplayAuthorComponent={setDisplayAuthorComponent} setDisplayGenreComponent={setDisplayGenreComponent}/>
        {displayBookComponent && !displayAuthorComponent && !displayGenreComponent && <BookComponent />}
        {!displayBookComponent && displayAuthorComponent && !displayGenreComponent && <AuthorComponent />}
        {!displayBookComponent && !displayAuthorComponent && displayGenreComponent && <GenreComponent />}
      </header>
    </div>
  );
}

export default App;
