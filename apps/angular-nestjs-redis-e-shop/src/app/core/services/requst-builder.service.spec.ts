import { TestBed } from '@angular/core/testing';

import { RequstBuilderService } from './requst-builder.service';

describe('RequstBuilderService', () => {
  let service: RequstBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequstBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
