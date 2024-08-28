import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../favorites/favorites.service';
import { Character } from '@shared/types/character';
import { AllCharacter } from '@shared/types/all-character';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, filter, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  characters: Character[] = [];
  nextPage: string | null = 'https://rickandmortyapi.com/api/character';
  searchControl: FormControl = new FormControl('');

  constructor(private http: HttpClient, private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.loadMoreCharacters();

    // Search functionality
    this.searchControl.valueChanges.pipe(
      debounceTime(300), // Wait for the user to stop typing for 300ms
      distinctUntilChanged(), // Only trigger if the search term is different from the last one
      filter(searchTerm => searchTerm.length > 2 || searchTerm.length === 0), // Trigger search only if more than 2 characters
      switchMap(searchTerm => this.searchCharacters(searchTerm)) // Cancel previous request and switch to the new one
    ).subscribe(characters => {
      this.characters = characters;
    });
  }

  loadMoreCharacters(): void {
    if (this.nextPage) {
      this.http.get<AllCharacter>(this.nextPage).subscribe(response => {
        this.characters = [...this.characters, ...response.results];
        this.nextPage = response.info.next;
      });
    }
  }

  searchCharacters(name: string) {
    if (name) {
      return this.http.get<AllCharacter>(`https://rickandmortyapi.com/api/character/?name=${name}`)
        .pipe(
          catchError(err => {
            // If an error occurs, return an empty array to trigger the "nothing found" message
            console.error('Error occurred during search:', err);
            return of({ results: [] } as unknown as AllCharacter);
          }),
          switchMap(response => {
            // Check if the API returns no results
            if (response.results.length === 0) {
              return of([]); // Return an empty array to show the "nothing found" message
            }
            return of(response.results);
          })
        );
    } else {
      this.characters = []; // Clear characters if search input is empty
      this.loadMoreCharacters(); // Load the initial characters again
      return of([]); // Return an empty array to reset the list
    }
  }

  toggleFavorite(character: Character): void {
    if (this.favoriteService.isFavorite(character.id)) {
      this.favoriteService.removeFavorite(character.id);
    } else {
      this.favoriteService.addFavorite(character.id);
    }
  }

  isFavorited(characterId: number): boolean {
    return this.favoriteService.isFavorite(characterId);
  }

}
