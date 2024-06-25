import { useNavigate } from '@tanstack/react-router';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

import useStore from '../use_store';

const NoteForm: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const addNote = useStore(state => state.addNote);
  const navigate = useNavigate();

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (!title || !content) return;

    const newNote = { title, content };
    addNote(newNote);
    console.log("Nouvelle note ajoutée:", newNote);
    
    setTitle('');
    setContent('');
    await navigate({ to: '/notes' });
  };

  return (
    <div className="note-form-container">
      <h2>Créer une nouvelle note</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Titre</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(evt) => setTitle(evt.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Contenu</label>
          <textarea
            id="content"
            value={content}
            onChange={(evt) => setContent(evt.target.value)}
            required
          />
        </div>
        <button type="submit">Ajouter la note</button>
      </form>

      <div className="preview-container">
        <h3>Aperçu</h3>
        <h4>{title}</h4>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default NoteForm;