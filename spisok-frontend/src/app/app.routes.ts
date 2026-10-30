import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'notes', pathMatch: 'full' },
    { path: 'notes', loadChildren: () => import('./notes-components/notes.routes').then(m => m.NOTES_ROUTES),}
];
