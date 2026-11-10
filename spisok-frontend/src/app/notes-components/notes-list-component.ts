import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoteComponent } from './note-component';
import { Note } from './note.model';
import { NotesService } from './notes.service';

@Component({
  imports: [FormsModule, NoteComponent],
  selector: 'app-notes-list-component',
  styleUrl: './notes.css',
  templateUrl: './notes-list-component.html',
})
export class NotesListComponent implements OnInit {
  private readonly notesService = inject(NotesService);
  notes = signal<Note[]>([]);
  isCreateFormOpen = signal(false);
  isSaving = signal(false);
  title = '';
  description = '';
  createError = signal('');

  ngOnInit(): void {
    this.notesService.getNotes().subscribe((notes) => {
      this.notes.set(notes);
    });
  }

  createNote(): void {
    this.isSaving.set(true);
    this.createError.set('');

    this.notesService
      .createNote({ title: this.title, description: this.description })
      .subscribe({
        next: (note) => {
          this.notes.update((notes) => [...notes, note]);
          this.title = '';
          this.description = '';
          this.isCreateFormOpen.set(false);
          this.isSaving.set(false);
        },
        error: () => {
          this.createError.set('Could not create the note. Please try again.');
          this.isSaving.set(false);
        },
      });
  }
}
