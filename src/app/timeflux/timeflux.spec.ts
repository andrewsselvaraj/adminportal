import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Timeflux } from './timeflux';

describe('Timeflux', () => {
  let component: Timeflux;
  let fixture: ComponentFixture<Timeflux>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Timeflux]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Timeflux);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
