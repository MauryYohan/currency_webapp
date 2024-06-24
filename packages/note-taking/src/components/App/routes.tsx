import { RootRoute, Route, Router } from '@tanstack/react-router';
import React from 'react';

import App from './app';
import NoteDetails from './Notes/note_details';
import NoteForm from './Notes/note_form.tsx';
import NoteList from './Notes/note_list';

// Routeur principal avec un layout
const rootRoute = new RootRoute({
  component: App,
  options: {
    notFoundComponent: () => <div>Page non trouvée</div>,
  },
});

// Route pour la liste des notes
const notesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'notes',
  component: NoteList,
});

// Route pour la création d'une nouvelle note
const createNoteRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'create',
  component: NoteForm,
});

// Route pour afficher les détails d'une note spécifique
const noteDetailsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'notes/:noteId',
  component: ({ params }) => {
    console.log("Params reçus pour la route noteDetails:", params);
    return <NoteDetails noteId={params.noteId} />;
  },
});

// Arbre de routes
const routeTree = rootRoute.addChildren([notesRoute, createNoteRoute, noteDetailsRoute]);

// Configuration du routeur
const router = new Router({ routeTree });

export default router;