import { v4 as uuidv4 } from 'uuid';
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface NoteState {
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (updatedNote: Note) => void;
  deleteNote: (id: string) => void;
}

const useStore = create<NoteState>()(persist(
  (set) => ({
    notes: [],
    addNote: (note) => {
      const newNote = {
        ...note,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      set((state) => ({
        notes: [...state.notes, newNote],
      }));
      console.log("Notes après ajout:", newNote); // Log des notes après ajout
    },
    updateNote: (updatedNote) => {
      set((state) => ({
        notes: state.notes.map(note => note.id === updatedNote.id
          ? { ...updatedNote, updatedAt: new Date().toISOString() }
          : note),
      }));
      console.log("Notes après mise à jour:", updatedNote); // Log des notes après mise à jour
    },
    deleteNote: (id) => {
      set((state) => ({
        notes: state.notes.filter(note => note.id !== id),
      }));
      console.log("Notes après suppression de l'ID:", id); // Log des notes après suppression
    },
  }),
  {
    name: 'notes-storage',
    storage: {
      getItem: (name) => JSON.parse(localStorage.getItem(name) ?? 'null'),
      setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
      removeItem: (name) => localStorage.removeItem(name),
    },
  }
));

export default useStore;