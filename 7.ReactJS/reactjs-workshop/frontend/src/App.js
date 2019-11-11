import React from 'react';
// import logo from './logo.svg';
import './App.css';

import Navigation from './components/navigation/Navigation';
import Aside from './components/aside/Aside';
import Footer from './components/footer/Footer';
import Posts from './components/posts/Posts';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
      </header>

      <Aside />

      <main className="Main">
        <h2>Sooooooooooooooome Heading</h2>
        <Posts />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
