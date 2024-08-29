import { TestBed } from '@angular/core/testing';
import { FavoriteNotificationService } from '@shared/favaroti-notification.service';
import { FavoriteService } from './favorites.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FavoriteService', () => {
  let service: FavoriteService;
  let notificationService: jasmine.SpyObj<FavoriteNotificationService>;

  beforeEach(() => {
    const notificationServiceSpy = jasmine.createSpyObj('FavoriteNotificationService', ['updateFavoriteCount']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FavoriteService,
        { provide: FavoriteNotificationService, useValue: notificationServiceSpy }
      ]
    });

    service = TestBed.inject(FavoriteService);
    notificationService = TestBed.inject(FavoriteNotificationService) as jasmine.SpyObj<FavoriteNotificationService>;

    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xit('should load favorites from localStorage on initialization', () => {
    const mockFavorites = [1, 2, 3];
    localStorage.setItem('favoriteCharacters', JSON.stringify(mockFavorites));

    const newService = TestBed.inject(FavoriteService);
    expect(newService.getFavorites()).toEqual(mockFavorites);
    expect(notificationService.updateFavoriteCount).toHaveBeenCalledWith(mockFavorites.length);
  });

  it('should add a favorite and save it to localStorage', () => {
    service.addFavorite(1);
    expect(service.isFavorite(1)).toBeTrue();
    expect(localStorage.getItem('favoriteCharacters')).toEqual(JSON.stringify([1]));
    expect(notificationService.updateFavoriteCount).toHaveBeenCalledWith(1);
  });

  xit('should remove a favorite and update localStorage', () => {
    service.addFavorite(1);
    service.removeFavorite(1);
    expect(service.isFavorite(1)).toBeFalse();
    expect(localStorage.getItem('favoriteCharacters')).toEqual(JSON.stringify([]));
    expect(notificationService.updateFavoriteCount).toHaveBeenCalledWith(0);
  });

  xit('should return the list of favorite character IDs', () => {
    service.addFavorite(1);
    service.addFavorite(2);
    expect(service.getFavorites()).toEqual([1, 2]);
  });

  xit('should notify the favorite count when favorites are added', () => {
    service.addFavorite(1);
    expect(notificationService.updateFavoriteCount).toHaveBeenCalledWith(1);
  });

  it('should notify the favorite count when favorites are removed', () => {
    service.addFavorite(1);
    service.removeFavorite(1);
    expect(notificationService.updateFavoriteCount).toHaveBeenCalledWith(0);
  });
});
