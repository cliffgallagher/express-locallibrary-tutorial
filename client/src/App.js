import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import BookComponent from './components/book_components/BookComponent';
import DisplaySelector from './components/DisplaySelector';

function App() {
  const [displayBookComponent, setDisplayBookComponent] = useState(true);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <DisplaySelector />
        {displayBookComponent && <BookComponent setDisplayBookComponent={setDisplayBookComponent}/>}
      </header>
    </div>
  );
}

export default App;
