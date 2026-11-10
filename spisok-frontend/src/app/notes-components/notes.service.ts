import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private readonly http = inject(HttpClient);
  private readonly notesUrl = `${environment.apiUrl}/notes`;

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.notesUrl);
  }

  getNote(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.notesUrl}/${id}`);
  }

  createNote(note: Omit<Note, 'id'>): Observable<Note> {
    return this.http.post<Note>(`${this.notesUrl}/create`, note);
  }

  updateNote(id: number, note: Omit<Note, 'id'>): Observable<Note> {
    return this.http.put<Note>(`${this.notesUrl}/${id}`, note);
  }

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.notesUrl}/${id}`);
  }
}