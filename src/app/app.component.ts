import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoriteNotificationService } from '@shared/favaroti-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  favoriteCount = 0;

  ngOnInit(): void {
    this.favoriteNotificationService.favoriteCount$.subscribe(count => {
      this.favoriteCount = count;
    });
  }

  constructor(
    private router: Router,
    private favoriteNotificationService: FavoriteNotificationService
  ) {}

  redirect(page: string): void {
    this.router.navigate([page]);
  }

}
