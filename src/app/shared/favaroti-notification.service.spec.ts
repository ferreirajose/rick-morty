import { TestBed } from '@angular/core/testing';
import { FavoriteNotificationService } from './favaroti-notification.service';
describe('FavoriteNotificationService', () => {
  let service: FavoriteNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavoriteNotificationService]
    });
    service = TestBed.inject(FavoriteNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have an initial favorite count of 0', (done: DoneFn) => {
    service.favoriteCount$.subscribe(count => {
      expect(count).toBe(0);
      done();
    });
  });

  it('should update the favorite count', (done: DoneFn) => {
    const newCount = 5;
    service.updateFavoriteCount(newCount);

    service.favoriteCount$.subscribe(count => {
      expect(count).toBe(newCount);
      done();
    });
  });

  xit('should emit multiple favorite counts', (done: DoneFn) => {
    const counts = [0];
    let emissionIndex = 0;

    service.favoriteCount$.subscribe(count => {
      expect(count).toBe(counts[emissionIndex]);
      emissionIndex++;

      if (emissionIndex === counts.length) {
        done();
      }
    });

    counts.forEach(c => service.updateFavoriteCount(c));
  });
});
