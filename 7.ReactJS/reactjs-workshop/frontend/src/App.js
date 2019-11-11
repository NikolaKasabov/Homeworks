import React from 'react';
// import logo from './logo.svg';
import './App.css';

import Navigation from './components/navigation/Navigation';
import Aside from './components/aside/Aside';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
      </header>

      <Aside />
      <main className="Main">
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
