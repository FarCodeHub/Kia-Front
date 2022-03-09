import { TestBed } from '@angular/core/testing';

import { SessionSurveyService } from './session-survey.service';

describe('SessionSurveyService', () => {
  let service: SessionSurveyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionSurveyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
