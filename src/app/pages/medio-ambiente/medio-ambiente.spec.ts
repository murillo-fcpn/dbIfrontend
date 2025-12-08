import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedioAmbiente } from './medio-ambiente';

describe('MedioAmbiente', () => {
  let component: MedioAmbiente;
  let fixture: ComponentFixture<MedioAmbiente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedioAmbiente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedioAmbiente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
