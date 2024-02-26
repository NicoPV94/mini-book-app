import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent implements OnInit {

  @Input() preserveOnSubmit: boolean = false;
  @Input() title: string = 'Book Form';
  @Input() description: string = 'Please fill out the form.';
  @Input() book?: Book;
  @Output() onSubmitBook: EventEmitter<Book> = new EventEmitter<Book>();

  bookForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.book) {
      this.bookForm.setValue({
        title: this.book.title,
        author: this.book.author
      });
    }
  }
 
  onSubmit(): void {
    const newBook: Book = {
      title: this.bookForm.get('title')?.value,
      author: this.bookForm.get('author')?.value
    }
    this.onSubmitBook.emit(newBook);
    if (!this.preserveOnSubmit) {
      this.bookForm.reset();
    }
  }

}
