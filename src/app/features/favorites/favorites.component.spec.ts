import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { FavoritesComponent } from './favorites.component';
import { FavoriteService } from './favorites.service';
import { Character } from '@shared/types/character';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let favoriteService: FavoriteService;
  let httpMock: HttpTestingController;

  const mockFavorites: number[] = [1, 2];
  const mockCharacter: Character = {
     "id": 1,
      "name": "Rick Sanchez",
      "status": "Alive",
      "species": "Human",
      "type": "",
      "gender": "Male",
      "origin": {
        "name": "Earth",
        "url": "https://rickandmortyapi.com/api/location/1"
      },
      "location": {
        "name": "Earth",
        "url": "https://rickandmortyapi.com/api/location/20"
      },
      "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      "episode": [
        "https://rickandmortyapi.com/api/episode/1",
        "https://rickandmortyapi.com/api/episode/2",
      ],
      "url": "https://rickandmortyapi.com/api/character/1",
      "created": "2017-11-04T18:48:46.250Z"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoritesComponent],
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [FavoriteService],
      schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    favoriteService = TestBed.inject(FavoriteService);
    httpMock = TestBed.inject(HttpTestingController);

    spyOn(favoriteService, 'getFavorites').and.returnValue(mockFavorites);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  xit('should create the component', () => {
    expect(component).toBeTruthy();
  });

  xit('should call loadFavoriteCharacters on ngOnInit', () => {
    spyOn(component, 'loadFavoriteCharacters').and.callThrough();
    component.ngOnInit();
    expect(component.loadFavoriteCharacters).toHaveBeenCalled();
  });

  xit('should load favorite characters', () => {
    component.loadFavoriteCharacters();
    mockFavorites.forEach(id => {
      const req = httpMock.expectOne(`https://rickandmortyapi.com/api/character/${id}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockCharacter);
    });
    expect(component.favoriteCharacters.length).toBe(2);
    expect(component.favoriteCharacters[0].id).toBe(1);
  });

  xit('should remove a favorite character', () => {
    component.favoriteCharacters = [mockCharacter];
    spyOn(favoriteService, 'removeFavorite').and.callThrough();
    component.toggleFavorite(mockCharacter);
    expect(favoriteService.removeFavorite).toHaveBeenCalledWith(mockCharacter.id);
    expect(component.favoriteCharacters.length).toBe(0);
  });
});
