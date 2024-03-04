import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Author, BookService } from '../../services/book.service';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit{
  newBookForm: FormGroup;
  allAuthors: Author[] = [];
  allLanguages: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService
  ) {
    this.newBookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],
      pages: ['', [Validators.required, Validators.min(1)]],
      language: ['', Validators.required],
      genre: ['', Validators.required],
      coverImage: ['', Validators.required],
      pdfFile: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAuthors();
  }

  loadAuthors(): void {
    this.bookService.getAuthors().subscribe(authors => {
      this.allAuthors = authors;
    });
  }

  onSubmit(): void {
    if (this.newBookForm.invalid) {
      return;
    }
    const newBookData = this.newBookForm.value;
    this.bookService.createBook(newBookData).subscribe(() => {
      console.log('New book created successfully.');
      this.newBookForm.reset();
    });
  }

  onCoverImageChange(event: any): void {
    const file = event.target.files[0];
    this.newBookForm.patchValue({
      coverImage: file
    });
  }

  onPdfFileChange(event: any): void {
    const file = event.target.files[0];
    this.newBookForm.patchValue({
      pdfFile: file
    });
  }
}
