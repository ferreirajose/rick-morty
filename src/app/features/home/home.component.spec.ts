import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { FavoriteService } from '../favorites/favorites.service';
import { Character } from '@shared/types/character';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AllCharacter } from '@shared/types/all-character';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let homeServiceSpy: jasmine.SpyObj<HomeService>;
  let favoriteServiceSpy: jasmine.SpyObj<FavoriteService>;

  beforeEach(async () => {
    const homeServiceMock = jasmine.createSpyObj('HomeService', ['loadMoreCharacters', 'searchCharacters']);
    const favoriteServiceMock = jasmine.createSpyObj('FavoriteService', ['isFavorite', 'addFavorite', 'removeFavorite']);

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot() // For handling translations
      ],
      providers: [
        { provide: HomeService, useValue: homeServiceMock },
        { provide: FavoriteService, useValue: favoriteServiceMock },
        TranslateService
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    homeServiceSpy = TestBed.inject(HomeService) as jasmine.SpyObj<HomeService>;
    favoriteServiceSpy = TestBed.inject(FavoriteService) as jasmine.SpyObj<FavoriteService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load more characters on init', () => {
    const mockAllCharacter: AllCharacter = {
      results: [{ id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', type: '', gender: 'Male', origin: { name: 'Earth', url: '' }, location: { name: 'Earth', url: '' }, image: '', episode: [], url: '', created: '' }],
      info: {
        next: 'null',
        count: 0,
        pages: 0,
        prev: null
      }
    };

    homeServiceSpy.loadMoreCharacters.and.returnValue(of(mockAllCharacter));

    component.ngOnInit();

    expect(homeServiceSpy.loadMoreCharacters).toHaveBeenCalled();
    expect(component.characters).toEqual(mockAllCharacter.results);
  });

  xit('should search for characters', () => {
    const mockSearchResults = [{ id: 1, name: 'Morty Smith' }] as Character[];
    homeServiceSpy.searchCharacters.and.returnValue(of(mockSearchResults));

    component.searchControl.setValue('Morty');

    expect(homeServiceSpy.searchCharacters).toHaveBeenCalledWith('Morty');
    expect(component.characters).toEqual(mockSearchResults);
  });

  it('should toggle favorite status', () => {
    const character: Character = { id: 1, name: 'Rick Sanchez' } as Character;

    favoriteServiceSpy.isFavorite.and.returnValue(true);

    component.toggleFavorite(character);

    expect(favoriteServiceSpy.removeFavorite).toHaveBeenCalledWith(character.id);

    favoriteServiceSpy.isFavorite.and.returnValue(false);

    component.toggleFavorite(character);

    expect(favoriteServiceSpy.addFavorite).toHaveBeenCalledWith(character.id);
  });

  it('should check if character is favorited', () => {
    const characterId = 1;
    favoriteServiceSpy.isFavorite.and.returnValue(true);

    expect(component.isFavorited(characterId)).toBeTrue();
    expect(favoriteServiceSpy.isFavorite).toHaveBeenCalledWith(characterId);
  });
});
