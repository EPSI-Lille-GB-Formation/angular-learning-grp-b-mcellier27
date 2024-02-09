import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl: string = 'api/users';

  constructor(private http: HttpClient) {}

  getCurrentUserNameFromId(
    currentUserId: number | null
  ): Observable<string | null> {
    if (currentUserId !== null) {
      const url = `${this.apiUrl}/${currentUserId}`;
      return this.http
        .get<User>(url)
        .pipe(map((user) => user.firstName || null));
    } else {
      return new Observable<string | null>((observer) => {
        observer.next(null);
        observer.complete();
      });
    }
  }

  getCurrentUserFirstNameFromId(
    currentUserId: number | null
  ): Observable<string | null> {
    if (currentUserId !== null) {
      const url = `${this.apiUrl}/${currentUserId}`;
      return this.http
        .get<User>(url)
        .pipe(map((user) => user.lastName || null));
    } else {
      return new Observable<string | null>((observer) => {
        observer.next(null);
        observer.complete();
      });
    }
  }

  getCurrentUserFromId(currentUserId: number | null): Observable<User | null> {
    if (currentUserId !== null) {
      const url = `${this.apiUrl}/${currentUserId}`;
      return this.http.get<User>(url);
    } else {
      return new Observable<User | null>((observer) => {
        observer.next(null);
        observer.complete();
      });
    }
  }

  // méthode pour récupérer la liste des catégories
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<User | undefined> {
    const URL = `${this.apiUrl}/${id}`;
    return this.http.get<User | undefined>(URL);
  }

  deleteUser(id: number): Observable<void> {
    const URL = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(URL);
  }

  updateUser(user: User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    const url = `${this.apiUrl}/${user.id}`;
    return this.http.put(url, user, httpOptions);
  }

  genIdUser(collection: User[]): number {
    return collection.length > 0
      ? Math.max(...collection.map((item) => item.id)) + 1
      : 1;
  }

  createUser(newUser: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, newUser);
  }
}