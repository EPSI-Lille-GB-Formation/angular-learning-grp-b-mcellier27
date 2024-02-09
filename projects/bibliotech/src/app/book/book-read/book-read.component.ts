import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Book } from '../../models/book';
import { BookService } from '../../service/book.service';
//import { PageListComponent } from '../page/page-list/page-list.component';
import { CategoryService } from '../../service/categorie.service';
import { UserService } from '../../service/user.service';
import { ShareService } from '../../service/share.service';

@Component({
  selector: 'app-book-read',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-read.component.html',
  styleUrls: [],
})
export class BookReadComponent implements OnInit {
  authorName$: Observable<string | null>;
  authorFirstName$: Observable<string | null>;
  categoriesLabels$: Observable<string[]>;
  currentUserId$: Observable<number | null>;

  bookRead: Book | undefined;

  constructor(
    private bookService: BookService,
    private categService: CategoryService,
    private userService: UserService,
    private shareService: ShareService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.authorName$ = this.userService.getCurrentUserNameFromId(null);
    this.authorFirstName$ = this.userService.getCurrentUserFirstNameFromId(null);
    this.categoriesLabels$ = this.categService.getLabelByIdCategory(0);
    this.currentUserId$ = this.shareService.getCurrentUserId();
  }

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('idBook');

    if (bookId) {
      this.bookService.getBookById(+bookId).subscribe(
        (book: Book | undefined) => {
          this.bookRead = book;

          if (this.bookRead) {
            this.authorName$ = this.userService.getCurrentUserNameFromId(
              this.bookRead.user
            );
            this.authorFirstName$ =
              this.userService.getCurrentUserFirstNameFromId(
                this.bookRead.user
              );
            this.categoriesLabels$ = this.categService.getLabelByIdCategory(
              this.bookRead.id
            );
          }
        },
        (error: any) => {
          console.error(
            'Erreur lors de la récupération des informations du livre',
            error
          );
        }
      );
    }
  }

  goToDeletePage(idBook: number | undefined): void {
    this.router.navigate(['book/delete', idBook]);
  }

  goToUpdatePage(idBook: number | undefined): void {
    this.router.navigate(['book/update', idBook]);
  }
}