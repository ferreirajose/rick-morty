import { Component } from '@angular/core';
import { FavoriteNotificationService } from '@shared/favaroti-notification.service';
import { Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  favoriteCount$: Observable<number> = this.favoriteNotificationService.favoriteCount$.pipe(
    startWith(0)
  );

  constructor(
    private favoriteNotificationService: FavoriteNotificationService
  ) {}

}
