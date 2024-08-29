import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllCharacter } from '@shared/types/all-character';
import { Character } from '@shared/types/character';
import { Observable, switchMap, of, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';
  private nextPage: string | null = this.apiUrl;

  constructor(private http: HttpClient) {}

  loadMoreCharacters(): Observable<AllCharacter> {
    if (this.nextPage) {
      return this.http.get<AllCharacter>(this.nextPage).pipe(
        switchMap(response => {
          this.nextPage = response.info.next;
          return of(response);
        })
      );
    } else {
      return of({ results: [], info: { next: null } } as unknown as AllCharacter);
    }
  }

  searchCharacters(name: string): Observable<Character[]> {
    if (name) {
      return this.http.get<AllCharacter>(`${this.apiUrl}/?name=${name}`).pipe(
        catchError(err => {
          console.error('Error occurred during search:', err);
          this.resetNextPage();
          return this.loadInitialCharacters();
        }),
        map(response => {

          if ('results' in response) {
            if (response.results.length === 0 || 'error' in response) {
              return [];
            }
            return response.results;
          } else {
            return [];
          }
        })
      );
    } else {
      this.resetNextPage();
      return this.loadInitialCharacters();
    }
  }


  private loadInitialCharacters(): Observable<Character[]> {
    return this.http.get<AllCharacter>(this.apiUrl).pipe(
      map(response => {
        this.nextPage = response.info.next;
        return response.results;
      })
    );
  }


  resetNextPage(): void {
    this.nextPage = this.apiUrl;
  }
}
