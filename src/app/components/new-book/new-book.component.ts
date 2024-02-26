import { Component, Input } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BookFormComponent } from "../book-form/book-form.component";
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-new-book',
    standalone: true,
    templateUrl: './new-book.component.html',
    styleUrl: './new-book.component.scss',
    imports: [MatInputModule, MatFormFieldModule, BookFormComponent]
})
export class NewBookComponent {

  formTitle = 'New Book Form';
  formDescription = `Please fill the form with the new book's information.`;

  constructor(private bookService: BookService, private _snackBar: MatSnackBar) {}

  addNewBook(newBook: Book): void {
    this.bookService.addBook(newBook).subscribe({
      next: (res) => {
        this._snackBar.open('New book added succesfully!', undefined, {
          duration: 2000
        });
      },
      error: (err) => {
        this._snackBar.open(err, 'Close');
      }
    });
  }

}
