import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

export interface Book {
  id: number;
  title: string;
  authorId: string;
  pages: number;
  language: string;
  genre: string;
  preview: string;
  pdfUrl: string;
  description: string;
}

export interface Author {
  id: number;
  name: string;
  editing: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private booksUrl = 'http://localhost:3000/books';
  private authorsUrl = 'http://localhost:3000/authors';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl);
  }

  getBookById(id: string): Observable<Book> {
    const url = `${this.booksUrl}/${id}`;
    return this.http.get<Book>(url);
  }

  createBook(newBook: Partial<Book>): Observable<Book> {
    return this.http.post<Book>(this.booksUrl, newBook);
  }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.authorsUrl);
  }

  getAuthorById(id: string): Observable<Author> {
    const url = `${this.authorsUrl}/${id}`;
    return this.http.get<Author>(url);
  }

  createAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(this.authorsUrl, author);
  }

  updateAuthor(author: Author): Observable<Author> {
    const url = `${this.authorsUrl}/${author.id}`;
    return this.http.put<Author>(url, author);
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong, please try again later.');
  }
}
