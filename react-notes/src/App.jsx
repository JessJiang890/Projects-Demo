import { useState } from 'react';
import './style/App.css';
import Header from './components/Header';
import Notes from './components/Notes';

function App() {
  return (
    <main className="App">
      <Header />
      <Notes />
    </main>
  );
}

export default App;
