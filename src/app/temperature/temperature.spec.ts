import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Temperature } from './temperature';

describe('Temperature', () => {
  let component: Temperature;
  let fixture: ComponentFixture<Temperature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Temperature]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Temperature);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
