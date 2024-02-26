import { Component, OnInit } from '@angular/core';
import { BookFormComponent } from "../book-form/book-form.component";
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-update-book',
    standalone: true,
    templateUrl: './update-book.component.html',
    styleUrl: './update-book.component.scss',
    imports: [BookFormComponent, CommonModule]
})
export class UpdateBookComponent implements OnInit {

  formTitle = 'Update Book';
  formDescription = `Please fill the form with the updated book's information.`;
  bookId: number = 0;
  book?: Book;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.bookId = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.getBook(this.bookId);
  }

  getBook(bookId: number): void {
    this.bookService.getBook(bookId).subscribe({
      next: res => {
        this.book = res;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  onBookUpdated(book: Book): void {
    book.id = this.bookId;
    this.bookService.updateBook(book).subscribe({
      next: res => {
        this._snackBar.open('Book updated succesfully!', undefined, {
          duration: 2000
        });
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
