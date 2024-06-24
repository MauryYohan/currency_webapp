import { Link } from '@tanstack/react-router';
import React from 'react';

import useStore from '../use_store';

const NoteList: React.FC = () => {
  const notes = useStore(state => state.notes);

  console.log("Liste des notes:", notes); // Log des notes disponibles

  return (
    <div>
      <h2>Liste des notes</h2>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.title}</Link>
          </li>
        ))}
      </ul>
      <Link to="/create">Créer une nouvelle note</Link>
    </div>
  );
};

export default NoteList;
