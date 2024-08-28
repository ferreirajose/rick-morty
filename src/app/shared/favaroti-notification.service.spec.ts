/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FavarotiNotificationService } from './favaroti-notification.service';

describe('Service: FavarotiNotification', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavarotiNotificationService]
    });
  });

  it('should ...', inject([FavarotiNotificationService], (service: FavarotiNotificationService) => {
    expect(service).toBeTruthy();
  }));
});
