import { TestBed } from '@angular/core/testing';

import { TwitterDataService } from './twitter-data.service';

describe('TwitterDataService', () => {
  let service: TwitterDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwitterDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
