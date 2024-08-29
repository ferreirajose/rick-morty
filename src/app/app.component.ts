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

  currentLang = 'pt_br';
  favoriteCount$: Observable<number> = this.favoriteNotificationService.favoriteCount$.pipe(
    startWith(0)
  );

  constructor(
    public translate: TranslateService,
    private favoriteNotificationService: FavoriteNotificationService
  ) {
    translate.addLangs(['en', 'es', 'pt_br']);
    translate.setDefaultLang(this.currentLang);
  }

  changeLang(lang: string): void {
    this.translate.setDefaultLang(lang);
    this.currentLang = lang;
  }

  isLangSelected(lang: string): boolean {
    return this.currentLang === lang;
  }
}
