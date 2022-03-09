import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadMapV2Component } from './load-map-v2.component';

describe('LoadMapV2Component', () => {
  let component: LoadMapV2Component;
  let fixture: ComponentFixture<LoadMapV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadMapV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadMapV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
