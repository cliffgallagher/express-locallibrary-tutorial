import logo from './logo.svg';
import './App.css';
import MyComponent from './components/MyComponent';
import MyComponentNew from './components/MyComponentNew';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <MyComponentNew />
      </header>
    </div>
  );
}

export default App;
