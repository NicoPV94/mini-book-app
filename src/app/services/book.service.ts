import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseUrl = 'http://localhost:5017';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/api/books`, {responseType: 'json'});
  }

  getBook(bookId: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/api/books/${bookId}`, {responseType: 'json'});
  }

  addBook(payload: Book): Observable<Book> {
    return this.http.post<Book>(`${this.baseUrl}/api/books`, payload, {responseType: 'json'});
  }

  updateBook(updatedBook: Book): Observable<null> {
    return this.http.put<null>(`${this.baseUrl}/api/books/${updatedBook.id}`, updatedBook, {responseType: 'json'});
  } 

  deleteBook(bookId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/books/${bookId}`, {responseType: 'json'});
  }
}
