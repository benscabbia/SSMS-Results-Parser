import { TestBed, inject } from '@angular/core/testing';

import { DataProcessorService } from './data-processor.service';

describe('DataProcessorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataProcessorService]
    });
  });

  it('should be created', inject([DataProcessorService], (service: DataProcessorService) => {
    expect(service).toBeTruthy();
  }));
});
