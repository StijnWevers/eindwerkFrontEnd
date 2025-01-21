import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntensysteemComponent } from './puntensysteem.component';

describe('PuntensysteemComponent', () => {
  let component: PuntensysteemComponent;
  let fixture: ComponentFixture<PuntensysteemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuntensysteemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuntensysteemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
