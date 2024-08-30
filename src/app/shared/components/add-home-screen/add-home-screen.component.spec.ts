import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { of } from 'rxjs';
import { AddHomeScreenComponent } from './add-home-screen.component';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AddHomeScreenComponent', () => {
  let component: AddHomeScreenComponent;
  let fixture: ComponentFixture<AddHomeScreenComponent>;
  let mockPlatform: any;
  let mockSwUpdate: SwUpdate;

  beforeEach(async () => {
    mockPlatform = {
      is: jasmine.createSpy('is')
    } as any;

    mockSwUpdate = {
      isEnabled: true,
      versionUpdates: of({
        type: 'VERSION_READY',
        currentVersion: '1.0.0',
        latestVersion: '1.0.1'
      } as unknown as VersionReadyEvent)
    } as any;

    await TestBed.configureTestingModule({
      declarations: [AddHomeScreenComponent],
      imports:[
        CommonModule,
      ],
      providers: [
        { provide: '', useValue: mockPlatform },
        { provide: SwUpdate, useValue: mockSwUpdate }
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA],

    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHomeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update online status', () => {

    Object.defineProperty(window.navigator, 'onLine', { value: true, configurable: true });
    component['updateOnlineStatus']();
    expect(component.isOnline).toBeTrue();

    Object.defineProperty(window.navigator, 'onLine', { value: false, configurable: true });
    component['updateOnlineStatus']();
    expect(component.isOnline).toBeFalse();
  });

  it('should handle version updates', () => {
    expect(component.modalVersion).toBeFalse();
  });

  xit('should update version and reload', () => {
    spyOn(window.location, 'reload');
    component.updateVersion();
    expect(component.modalVersion).toBeFalse();
    expect(window.location.reload).toHaveBeenCalled();
  });

  it('should close version modal', () => {
    component.closeVersion();
    expect(component.modalVersion).toBeFalse();
  });

  xit('should handle beforeinstallprompt event for Android', () => {
    (mockPlatform.is as jasmine.Spy).and.returnValue(true);
    const event = new Event('beforeinstallprompt') as any;
    spyOn(event, 'preventDefault');

    window.dispatchEvent(event);
    component['loadModalPwa']();

    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.modalPwaEvent).toBe(event);
    expect(component.modalPwaPlatform).toBe('ANDROID');
  });

  it('should handle standalone mode for iOS', () => {
    (mockPlatform.is as jasmine.Spy).and.callFake((platform) => platform === 'ios');

    Object.defineProperty(window.navigator, 'standalone', {
      value: false,
      configurable: true,
    });

    component['loadModalPwa']();
    expect(component.modalPwaPlatform).toBe('IOS');
  });


  it('should add to home screen', () => {
    const event = new Event('beforeinstallprompt') as any;
    event.prompt = jasmine.createSpy('prompt');
    component.modalPwaEvent = event;

    component.addToHomeScreen();
    expect(event.prompt).toHaveBeenCalled();
    expect(component.modalPwaPlatform).toBeUndefined();
  });

  it('should close PWA modal', () => {
    component.closePwa();
    expect(component.modalPwaPlatform).toBeUndefined();
  });
});
