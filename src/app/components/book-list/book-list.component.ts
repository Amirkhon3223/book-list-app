import { Component, OnInit } from '@angular/core';
import { Book, BookService } from '../../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  public allBooks: Book[] = [];
  filteredBooks: Book[] = [];
  authorsMap: { [key: string]: string } = {};

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.loadBooks();
    this.loadAuthors();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe(books => {
      this.allBooks = books;
      this.filteredBooks = books;
    });
  }

  loadAuthors(): void {
    this.bookService.getAuthors().subscribe(authors => {
      authors.forEach(author => {
        this.authorsMap[author.id] = author.name;
      });
    });
  }

  applyFilters(filteredBooks: Book[]): void {
    this.filteredBooks = filteredBooks;
  }

  goToBookDetails(id: string): void {
    this.router.navigate(['/book', id]);
  }

  // Метод для получения имени автора по его id
  getAuthorName(authorId: string): string {
    return this.authorsMap[authorId] || '';
  }
}
