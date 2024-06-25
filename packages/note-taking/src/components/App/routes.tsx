import React from 'react';
import { RootRoute, Route, Router, RouterProvider } from '@tanstack/react-router';
import App from './app';
import NoteDetails from './Notes/note_details';
import NoteForm from './Notes/note_form';
import NoteList from './Notes/note_list';

// Route de base qui englobe toute l'application
const rootRoute = new RootRoute({
  component: App,
  options: {
    notFoundComponent: () => <div>Page non trouvée</div>, // Gestion des routes non trouvées
  },
});

// Route pour la liste des notes
const notesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'notes',
  component: NoteList,
});

// Route pour créer une nouvelle note
const createNoteRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'create',
  component: NoteForm,
});

// Route pour afficher les détails d'une note spécifique
const noteDetailsRoute = new Route({
  getParentRoute: () => notesRoute, // Utilisation de notesRoute comme parent pour une structure imbriquée
  path: ':noteId', // Chemin relatif à la route parent (notes)
  component: ({ params }: { params: { noteId: string } }) => {
    console.log("Params reçus pour la route noteDetails:", params);
    return <NoteDetails noteId={params.noteId} />;
  },
});

// Assemble la structure des routes
const routeTree = rootRoute.addChildren([notesRoute, createNoteRoute, noteDetailsRoute]);

// Crée l'instance du routeur
const router = new Router({ routeTree });

export default router;
