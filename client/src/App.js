import logo from './logo.svg';
import './App.css';
import BookComponent from './components/book_components/BookComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <BookComponent />
      </header>
    </div>
  );
}

export default App;
