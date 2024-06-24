import { Outlet } from '@tanstack/react-router';
import React from 'react';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Application de prise de notes</h1>
      <nav>
        <a href="/notes">Liste des Notes</a> | <a href="/create">Créer une Note</a>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}

export default App;
