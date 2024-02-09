import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, of, switchMap } from 'rxjs';

import { Categorie } from '../models/categorie';
import { BelongService } from './belong.service';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  apiURL: string = 'api/Categorie';

  constructor(private http: HttpClient, private belongService: BelongService) {}

  // méthode pour récupérer la liste des catégories
  getCategorie(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.apiURL);
  }

  // méthode pour créer une catégorie
  createCategory(newCateg: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.apiURL, newCateg);
  }

  // méthode pour générer un nouvel id
  genIdCategory(collection: Categorie[]): number {
    return collection.length > 0
      ? Math.max(...collection.map((item) => item.id)) + 1
      : 1;
  }

  // méthode pour récupérer une catégorie par son id
  getCategoryById(id: number): Observable<Categorie | undefined> {
    const URL = `${this.apiURL}/${id}`;
    return this.http.get<Categorie | undefined>(URL);
  }

  // méthode pour update une catégorie
  updateCategory(Categorie: Categorie): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    const url = `${this.apiURL}/${Categorie.id}`;
    return this.http.put(url, Categorie, httpOptions);
  }

  // méthode pour supprimer une catégorie
  deleteCategory(id: number): Observable<void> {
    const URL = `${this.apiURL}/${id}`;
    return this.http.delete<void>(URL);
  }

  // méthode pour récupérer les labels des catégories en fonction de l'ID du livre
  getLabelByIdCategory(idBook: number): Observable<string[]> {
    return this.belongService.getIdCategoryByIdBook(idBook).pipe(
      switchMap((categoryIds) => {
        if (categoryIds.length === 0) {
          // Aucune catégorie trouvée, retourner un Observable vide
          return of([]);
        }

        // Pour chaque ID de catégorie, faites une requête HTTP pour obtenir le label
        const requests = categoryIds.map((categoryId) =>
          this.http.get<any>(`${this.apiURL}/${categoryId}`).pipe(
            map((response) => response.label) // Remplacez 'label' par la propriété correcte dans votre objet de réponse
          )
        );

        // Utilisez forkJoin pour exécuter toutes les requêtes en parallèle
        return forkJoin(requests);
      })
    );
  }

  getIdCategoryByLabel(label: string): Observable<number | undefined> {
    const url = `${this.apiURL}?label=${label}`;
    return this.http
      .get<any[]>(url)
      .pipe(
        map((Categorie) =>
          Categorie.length > 0 ? Categorie[0].id : undefined
        )
      );
  }

  getLabel(): Observable<string[]> {
    return this.http
      .get<any[]>(this.apiURL)
      .pipe(map((Categorie) => Categorie.map((category) => category.label)));
  }
}