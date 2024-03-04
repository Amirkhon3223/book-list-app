import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Author, Book, BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  bookId!: number;
  book!: Book;
  author!: Author;

  constructor(private route: ActivatedRoute, private bookService: BookService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bookId = +params['id'];
      this.loadBookDetails(this.bookId.toString());
    });
  }

  loadBookDetails(id: string): void {
    this.bookService.getBookById(id).subscribe(book => {
      this.book = book;
      this.loadAuthorDetails(book.authorId); // Загрузить детали автора после получения книги
    });
  }

  loadAuthorDetails(authorId: string): void {
    this.bookService.getAuthorById(authorId).subscribe(author => {
      this.author = author;
    });
  }
}
