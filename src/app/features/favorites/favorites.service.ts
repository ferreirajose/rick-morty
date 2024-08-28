import { Injectable } from '@angular/core';
import { FavoriteNotificationService } from '@shared/favaroti-notification.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private readonly STORAGE_KEY = 'favoriteCharacters';
  private favoriteCharacters: Set<number> = new Set();

  constructor(private notificationService: FavoriteNotificationService) {
    this.loadFavoritesFromStorage();
  }

  private loadFavoritesFromStorage(): void {
    const storedFavorites = localStorage.getItem(this.STORAGE_KEY);
    if (storedFavorites) {
      this.favoriteCharacters = new Set(JSON.parse(storedFavorites));
    }
    this.notifyFavoriteCount();
  }

  private saveFavoritesToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(Array.from(this.favoriteCharacters)));
  }

  private notifyFavoriteCount(): void {
    this.notificationService.updateFavoriteCount(this.favoriteCharacters.size);
  }

  addFavorite(characterId: number): void {
    this.favoriteCharacters.add(characterId);
    this.saveFavoritesToStorage();
    this.notifyFavoriteCount();
  }

  removeFavorite(characterId: number): void {
    this.favoriteCharacters.delete(characterId);
    this.saveFavoritesToStorage();
    this.notifyFavoriteCount();
  }

  isFavorite(characterId: number): boolean {
    return this.favoriteCharacters.has(characterId);
  }

  getFavorites(): number[] {
    return Array.from(this.favoriteCharacters);
  }
}
