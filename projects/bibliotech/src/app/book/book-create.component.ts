import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, forkJoin, map } from 'rxjs';

import { Book } from '../models/book';
import { BookService } from '../service/book.service';
import { Categorie } from '../models/categorie';
import { CategorieService } from '../service/categorie.service';
import { Belong } from '../models/belong';
import { BelongService } from '../service/belong.service';
import { ShareService } from'../service/share.service';
import { User } from '../models/user';

@Component({
  selector: 'app-book-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: '../book/book-create.component.html',
  styleUrl: './book-create.component.css',
})
export class BookCreateComponent implements OnInit {
  categoryControls: { [key: number]: FormControl } = {};
  Categories$: Observable<Categorie[]> = new Observable<Categorie[]>();

  ajoutReussi: boolean = false;
  ajoutError: boolean = false;

  bookForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    resume: ['', Validators.required],
    image: ['', Validators.required],
  });

  constructor(
    private bookService: BookService,
    private CategorieService: CategorieService,
    private belongService: BelongService,
    private formBuilder: FormBuilder,
    private router: Router,
    private shareService: ShareService,
  ) {}

  ngOnInit(): void {
    this.CategorieService.getLabelByIdCategory().subscribe(
      (Categorie: Categorie[]) => {
        this.Categories$ = new Observable<Categorie[]>((observer) => {
          observer.next(Categorie);
          observer.complete();
        });
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getCategoryControl(categoryId: number): FormControl {
    if (!this.categoryControls[categoryId]) {
      this.categoryControls[categoryId] = this.formBuilder.control(false);
    }
    return this.categoryControls[categoryId];
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      this.shareService.getCurrentUserId().subscribe(User=> {
        if (User !== null) {
          this.bookService.getBooks().subscribe(
            (books: Book[]) => {
              const newBook: Book = {
                id: this.bookService.genIdBook(books),
                title: this.bookForm.get('title')?.value,
                resume: this.bookForm.get('resume')?.value,
                image: this.bookForm.get('image')?.value,
                createdAt: new Date(),
                updatedAt: null,
                idUser: User,
              };
  
              const selectedCategories = Object.keys(this.categoryControls)
                .filter(
                  (categoryId) => this.categoryControls[categoryId as any].value
                )
                .map((categoryId) => +categoryId);
  
              const belongObservables = selectedCategories.map((categoryId) =>
                this.belongService.getBelongs().pipe(
                  map((belongs: Belong[]) => ({
                    id: this.belongService.genIdBelong(belongs),
                    idBook: newBook.id,
                    idCategory: categoryId,
                  }))
                )
              );
  
              forkJoin(belongObservables).subscribe((newBelongs: Belong[]) => {
                newBelongs.forEach((newBelong: Belong, index) => {
                  newBelong.id += index;
                  this.belongService.createBelong(newBelong).subscribe();
                });
  
                this.bookService.createBook(newBook).subscribe(
                  () => {
                    this.ajoutReussi = true;
                    this.ajoutError = false;
                  },
                  () => {
                    this.ajoutReussi = false;
                    this.ajoutError = true;
                  }
                );
              });
            },
            (error: any) => {
              console.error(error);
            }
          );
        } else {
          console.error("Current user ID is null.");
        }
      });
    }
  }

  goToHomePage(): void {
    this.router.navigate(['']);
  }
}