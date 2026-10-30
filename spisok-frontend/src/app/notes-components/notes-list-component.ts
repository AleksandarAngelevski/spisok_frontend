import { Component, OnInit, inject } from '@angular/core';
import { NoteComponent } from './note-component';
import { Note } from './note.model';
import { NotesService } from './notes.service';

@Component({
  imports: [NoteComponent],
  selector: 'app-notes-list-component',
  styleUrl: './notes.css',
  templateUrl: './notes-list-component.html',
})
export class NotesListComponent implements OnInit {
  private readonly notesService = inject(NotesService);
  notes: Note[] = [];

  ngOnInit(): void {
    this.notesService.getNotes().subscribe((notes) => {
      this.notes = notes;
    });
  }
}
