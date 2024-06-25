// Test de l'ajout d'une note en localSorage
import { RouterProvider } from '@tanstack/react-router';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';

import App from './components/App/app';
import router from './components/App/routes.tsx';
import useStore from './components/App/use_store';

// Mock localStorage for Zustand
const mockLocalStorage = () => {
  let storage: { [key: string]: string } = {};
  return {
    getItem: (key: string) => storage[key] || null,
    setItem: (key: string, value: string) => {
      storage[key] = value;
    },
    removeItem: (key: string) => {
      delete storage[key];
    },
    clear: () => {
      storage = {};
    }
  };
};

describe('NoteForm Component', () => {
  // Reset the Zustand store before each test
  beforeEach(() => {
    // Clear Zustand store
    useStore.setState({ notes: [] });

    // Mock localStorage for tests
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage(),
    });
  });

  it('should create a new note and add it to the store', () => {
    render(
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    );

    // Navigate to the note creation form
    fireEvent.click(screen.getByText('Créer une note'));

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText('Titre'), { target: { value: 'Test Note' } });
    fireEvent.change(screen.getByLabelText('Contenu'), { target: { value: 'Ceci est le contenu de la note en Markdown.' } });

    // Submit the form
    fireEvent.click(screen.getByText('Ajouter la note'));

    // Check if the note is added to the store
    const notes = useStore.getState().notes;
    expect(notes.length).toBe(1);
    expect(notes[0].title).toBe('Test Note');
    expect(notes[0].content).toBe('Ceci est le contenu de la note en Markdown.');
    expect(notes[0]).toHaveProperty('id');
    expect(notes[0]).toHaveProperty('createdAt');
    expect(notes[0]).toHaveProperty('updatedAt');
  });
});
