import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { FavoriteNotificationService } from '@shared/favaroti-notification.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let translateService: TranslateService;

  beforeEach(async () => {
    const mockFavoriteNotificationService = {
      favoriteCount$: of(0)
    };

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [
        TranslateService,
        { provide: FavoriteNotificationService, useValue: mockFavoriteNotificationService }
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the initial language set to "pt_br"', () => {
    expect(component.currentLang).toBe('pt_br');
  });

  it('should change the language when changeLang is called', () => {
    spyOn(translateService, 'setDefaultLang');
    component.changeLang('en');
    expect(component.currentLang).toBe('en');
    expect(translateService.setDefaultLang).toHaveBeenCalledWith('en');
  });

  it('should return true for isLangSelected when the language matches currentLang', () => {
    component.currentLang = 'es';
    expect(component.isLangSelected('es')).toBeTrue();
  });

  it('should return false for isLangSelected when the language does not match currentLang', () => {
    component.currentLang = 'es';
    expect(component.isLangSelected('pt_br')).toBeFalse();
  });

  it('should apply the "focus" class to the selected language', () => {
    component.currentLang = 'en';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const englishLangItem = compiled.querySelector('li:nth-child(2)');

    expect(englishLangItem?.classList).toContain('focus');
  });

  it('should not apply the "focus" class to non-selected languages', () => {
    component.currentLang = 'en';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const portugueseLangItem = compiled.querySelector('li:nth-child(1)');

    expect(portugueseLangItem?.classList).not.toContain('focus');
  });
});
