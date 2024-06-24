import { Link } from '@tanstack/react-router';
import React from 'react';

import useStore from '../use_store';

interface NoteDetailsProps {
  noteId: string;
}

const NoteDetails: React.FC<NoteDetailsProps> = ({ noteId }) => {
  const notes = useStore(state => state.notes);

  console.log("Paramètre noteId reçu:", noteId); // Log de l'ID de la note
  console.log("Notes disponibles dans le store:", notes); // Log des notes dans le store

  const note = notes.find(n => n.id === noteId);

  if (!note) {
    return <div>Note non trouvée</div>;
  }

  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p><strong>Créé le :</strong> {new Date(note.createdAt).toLocaleString()}</p>
      <p><strong>Modifié le :</strong> {new Date(note.updatedAt).toLocaleString()}</p>
      <Link to="/notes">Retour à la liste des notes</Link>
    </div>
  );
};

export default NoteDetails;