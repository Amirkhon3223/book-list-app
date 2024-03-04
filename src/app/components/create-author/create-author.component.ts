import { Component, OnInit } from '@angular/core';
import { Author, BookService } from '../../services/book.service';

@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.css']
})
export class CreateAuthorComponent implements OnInit {
  authors: Author[] = [];
  newAuthorName: string = '';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadAuthors();
  }

  loadAuthors(): void {
    this.bookService.getAuthors().subscribe(authors => {
      this.authors = authors;
    });
  }

  createNewAuthor(name: string): void {
    const id = this.authors.length + 1;
    const newAuthor: Author = { id, name, editing: false };
    this.bookService.createAuthor(newAuthor).subscribe((author) => {
      console.log('New author created successfully:', author);
      this.loadAuthors();
    }, error => {
      console.error('Error occurred while creating new author:', error);
    });
  }

  editAuthor(author: Author): void {
    author.editing = true;
  }

  saveAuthor(author: Author): void {
    author.editing = false;
    this.bookService.updateAuthor(author).subscribe(
      () => console.log('Author updated successfully'),
      error => console.error('Error occurred while updating author:', error)
    );
  }
}
