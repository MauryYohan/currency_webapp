import { useNavigate } from '@tanstack/react-router';
import React, { useState } from 'react';

import useStore from '../use_store';

const NoteForm: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const addNote = useStore(state => state.addNote);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const newNote = { title, content };
    addNote(newNote);
    console.log("Nouvelle note ajoutée:", newNote); // Log de la nouvelle note ajoutée
    
    setTitle('');
    setContent('');
    navigate({ to: '/notes' });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Contenu (markdown)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit">Ajouter</button>
      </form>
      <a href="/notes">Retour à la liste des notes</a>
    </div>
  );
}

export default NoteForm;
