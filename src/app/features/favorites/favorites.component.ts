import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FavoriteService } from './favorites.service';
import { Character } from '@shared/types/character';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favoriteCharacters: Character[] = [];

  constructor(
    private http: HttpClient,
    private favoriteService: FavoriteService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadFavoriteCharacters();
  }

  loadFavoriteCharacters(): void {
    const favoriteIds = this.favoriteService.getFavorites();
    if (favoriteIds.length > 0) {
      favoriteIds.forEach(id => {
        this.http.get<Character>(`https://rickandmortyapi.com/api/character/${id}`).subscribe(character => {
          this.favoriteCharacters.push(character);
        });
      });
    }
  }

  toggleFavorite(character: Character): void {
    this.favoriteService.removeFavorite(character.id);
    this.favoriteCharacters = this.favoriteCharacters.filter(c => c.id !== character.id);
  }
}
