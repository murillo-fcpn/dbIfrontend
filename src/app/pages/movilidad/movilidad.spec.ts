import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Movilidad } from './movilidad';

describe('Movilidad', () => {
  let component: Movilidad;
  let fixture: ComponentFixture<Movilidad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Movilidad]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Movilidad);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
