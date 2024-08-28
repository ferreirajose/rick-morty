import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favoriteCharacters: Set<number> = new Set();

  constructor() {}

  addFavorite(characterId: number): void {
    this.favoriteCharacters.add(characterId);
  }

  removeFavorite(characterId: number): void {
    this.favoriteCharacters.delete(characterId);
  }

  isFavorite(characterId: number): boolean {
    return this.favoriteCharacters.has(characterId);
  }

  getFavorites(): number[] {
    return Array.from(this.favoriteCharacters);
  }
}
