import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FavoriteService } from './favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favoriteCharacters: any[] = [];

  constructor(private http: HttpClient, private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.loadFavoriteCharacters();
  }

  loadFavoriteCharacters(): void {
    const favoriteIds = this.favoriteService.getFavorites();
    if (favoriteIds.length > 0) {
      favoriteIds.forEach(id => {
        this.http.get<any>(`https://rickandmortyapi.com/api/character/${id}`).subscribe(character => {
          this.favoriteCharacters.push(character);
        });
      });
    }
  }

  toggleFavorite(character: any): void {
    this.favoriteService.removeFavorite(character.id);
    this.favoriteCharacters = this.favoriteCharacters.filter(c => c.id !== character.id);
  }
}
