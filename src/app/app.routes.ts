import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { NewBookComponent } from './components/new-book/new-book.component';
import { UpdateBookComponent } from './components/update-book/update-book.component';

export const routes: Routes = [
    { path: '', component: BookListComponent },
    { path: 'new-book', component: NewBookComponent},
    { path: 'update-book/:id', component: UpdateBookComponent}
];
