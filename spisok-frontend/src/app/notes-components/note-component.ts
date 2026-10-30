import { Component, Input } from '@angular/core';
import { Note } from './note.model';

@Component({
  selector: 'app-note-component',
  templateUrl: './note-component.html',
  styleUrl: './note-component.css',
})
export class NoteComponent {
  @Input({ required: true }) note!: Note;
}
