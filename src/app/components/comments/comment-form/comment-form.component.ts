import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [ FormsModule, CommonModule ],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css'
})
export class CommentFormComponent {
  text!: string;
  @Input() parentId!: number | null;
  @Output() commentText = new EventEmitter();

  addComment() {

    this.commentText.emit([ this.text, this.parentId ]);
    this.text = ''
    this.parentId = null

  }
}
