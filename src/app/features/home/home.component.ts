import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';
import { FavoriteService } from '../favorites/favorites.service';
import { Character } from '@shared/types/character';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  characters: Character[] = [];
  searchControl: FormControl = new FormControl('');

  constructor(
    private characterService: HomeService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.loadMoreCharacters();

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(searchTerm => searchTerm.length > 2 || searchTerm.length === 0),
      switchMap(searchTerm => this.characterService.searchCharacters(searchTerm))
    ).subscribe(characters => {
      this.characters = characters;
    });
  }

  loadMoreCharacters(): void {
    this.characterService.loadMoreCharacters().subscribe(response => {
      this.characters = [...this.characters, ...response.results];
    });
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
