import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
    public translate: TranslateService,
    private favoriteNotificationService: FavoriteNotificationService
  ) {
    translate.addLangs(['en', 'es', 'pt_br']);
    translate.setDefaultLang('pt_br');

  }

  changeLang(lang: string) {
    this.translate.setDefaultLang(lang);
  }

}
