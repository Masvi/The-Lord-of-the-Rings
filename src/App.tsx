import React from 'react';
import './app.scss';
import Home from "./views/Home";

function App() {

  return (
    <div className="app">
      <header className="app__header">
        The Lord of the Rings
      </header>
      <Home />
    </div>
  );
}

export default App;
