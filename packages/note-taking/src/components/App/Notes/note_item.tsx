import React, { useState } from 'react';

import useStore from '../use_store';
import Note from '../use_store';

interface NoteItemProps {
  note: typeof Note;
}

const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
  if (!note) {
    // Afficher un message d'erreur ou rediriger l'utilisateur si la note n'est pas trouvée
    return <div>Note introuvable</div>;
  }

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(note.title);
  const [content, setContent] = useState<string>(note.content);
  const updateNote = useStore(state => state.updateNote);
  const deleteNote = useStore(state => state.deleteNote);

  const handleUpdate = () => {
    updateNote({
      ...note,
      title,
      content,
    });
    setIsEditing(false);
  };

  return (
    <div className="note-item">
      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button onClick={handleUpdate}>Enregistrer</button>
          <button onClick={() => setIsEditing(false)}>Annuler</button>
        </>
      ) : (
        <>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <p><strong>Créé le :</strong> {new Date(note.createdAt).toLocaleString()}</p>
          <p><strong>Modifié le :</strong> {new Date(note.updatedAt).toLocaleString()}</p>
          <button onClick={() => setIsEditing(true)}>Modifier</button>
          <button onClick={() => deleteNote(note.id)}>Supprimer</button>
        </>
      )}
    </div>
  );
}

export default NoteItem;
