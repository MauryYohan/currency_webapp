import { Outlet } from '@tanstack/react-router';
import React from 'react';

import NoteDetails from './Notes/note_details';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Application de prise de notes</h1>
      <nav>
        <a href="/notes">Liste des Notes</a> | 
        <a href="/create">Créer une Note</a> | 
        <a href="/notes/sdfg">Détails de la Note</a> |
      </nav>
      <hr />
      <Outlet />
      <NoteDetails noteId="a359d95e-74fe-407e-8e8f-230eee88eec5" />
    </div>
  );
}

export default App;
