import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book, BookService } from '../../services/book.service';
import { map, startWith } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})

export class FiltersComponent implements OnInit {
  @Input() allBooks: Book[] = [];
  @Output() filteredBooks = new EventEmitter<Book[]>();

  filterForm: FormGroup;

  selectedAuthors: string[] = [];
  selectedLanguages: string[] = [];
  authors: string[] = [];
  languages: string[] = [];
  genres: string[] = [];
  booksLoaded: boolean = false;

  constructor(private bookService: BookService, private router: Router) {
    this.filterForm = new FormGroup({
      search: new FormControl(''),
      genre: new FormControl(''),
      minPages: new FormControl(''),
      maxPages: new FormControl(''),
      authors: new FormControl([]),
      languages: new FormControl([]),
    });
  }

  isAuthorIncluded(author: string): boolean {
    const authors = this.filterForm.get('authors')?.value as string[];
    return authors ? authors.includes(author) : false;
  }

  isLanguageIncluded(language: string): boolean {
    const languages = this.filterForm.get('languages')?.value as string[];
    return languages ? languages.includes(language) : false;
  }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(books => {
      this.allBooks = books;
      this.authors = Array.from(new Set(this.allBooks.map(book => book.authorId)));
      this.languages = Array.from(new Set(this.allBooks.map(book => book.language)));
      this.genres = Array.from(new Set(this.allBooks.map(book => book.genre)));

      console.log('Authors:', this.authors);
      console.log('Languages:', this.languages);
      this.booksLoaded = true;
    });

    this.filterForm.valueChanges.pipe(
      startWith(this.filterForm.value),
      map(value => this.applyFilters(value))
    ).subscribe(filteredBooks => {
      this.filteredBooks.emit(filteredBooks);
    });
  }

  updateAuthors(event: MatCheckboxChange, author: string) {
    const isChecked = event.checked;
    if (isChecked) {
      this.selectedAuthors.push(author);
    } else {
      this.selectedAuthors = this.selectedAuthors.filter(a => a !== author);
    }
    this.filterForm.get('authors')?.setValue(this.selectedAuthors);
    this.applyFilters(this.filterForm.value);
  }

  updateLanguages(event: MatCheckboxChange, language: string) {
    const isChecked = event.checked;
    if (isChecked) {
      this.selectedLanguages.push(language);
    } else {
      this.selectedLanguages = this.selectedLanguages.filter(l => l !== language);
    }
    this.filterForm.get('languages')?.setValue(this.selectedLanguages);
    this.applyFilters(this.filterForm.value);
  }

  applyFilters(filters: any): Book[] {
    const {search, minPages, maxPages, genre} = filters;
    return this.allBooks.filter(book => {
      // Фильтрация по названию и описанию
      const searchMatch = !search ||
        (book.title && book.title.toLowerCase().includes(search.toLowerCase())) ||
        (book.description && book.description.toLowerCase().includes(search.toLowerCase()));
      // Остальные фильтры оставлены без изменений
      const authorsMatch = !this.selectedAuthors.length || this.selectedAuthors.includes(book.authorId);
      const languagesMatch = !this.selectedLanguages.length || this.selectedLanguages.includes(book.language);
      const pagesMatch = (!minPages || book.pages >= minPages) && (!maxPages || book.pages <= maxPages);
      const genreMatch = !genre || book.genre === genre;
      return searchMatch && authorsMatch && languagesMatch && pagesMatch && genreMatch;
    });
  }


  goToAddNewBook(): void {
    this.router.navigate(['/create']);
  }

  goToAddNewAuthor(): void {
    this.router.navigate(['/create-author']);
  }
}
