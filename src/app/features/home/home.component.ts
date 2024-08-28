import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../favorites/favorites.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  characters: any[] = [];
  nextPage: string | null = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient, private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.loadMoreCharacters();
  }

  loadMoreCharacters(): void {
    if (this.nextPage) {
      this.http.get<any>(this.nextPage).subscribe(response => {
        this.characters = [...this.characters, ...response.results];
        this.nextPage = response.info.next;
      });
    }
  }

  toggleFavorite(character: any): void {
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
