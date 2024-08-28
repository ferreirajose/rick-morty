import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteNotificationService {
  private favoriteCountSubject = new BehaviorSubject<number>(0);
  favoriteCount$ = this.favoriteCountSubject.asObservable();

  constructor() {}

  updateFavoriteCount(count: number): void {
    this.favoriteCountSubject.next(count);
  }
}
