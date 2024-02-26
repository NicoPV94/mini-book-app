import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import {MatTableModule} from '@angular/material/table';
import { Book } from '../../models/book.model';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from '../../shared/components/custom-dialog/custom-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [MatTableModule, RouterLink, RouterLinkActive],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'author', 'actions'];
  dataSource: Book[] = [];

  constructor(
    private bookService: BookService,
    public dialog: MatDialog, private router: Router,
    private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (res) => {
        this.dataSource = res;
      }
    });
  }

  onDeleteBook(bookId: number): void {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      width: '30vw',
      data: {
        title: 'Delete Book',
        description: 'Do you really want to delete this book?',
        acceptText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    const dialogSub = this.router.events.subscribe(() => {
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe({
      next: res => {
        if (res) {
          this.deleteBook(bookId);
        }
        dialogSub.unsubscribe();
      }
    });
  }

  deleteBook(bookId: number): void {
    this.bookService.deleteBook(bookId).subscribe({
      next: (res) => {
        this.getBooks();
        this._snackBar.open('Book deleted succesfully!', undefined, {
          duration: 2000
        });
      },
      error: (err) => {
        this._snackBar.open(err, 'Close');
      }
    });
  }

}
