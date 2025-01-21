import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoehetwerktComponent } from './hoehetwerkt.component';

describe('HoehetwerktComponent', () => {
  let component: HoehetwerktComponent;
  let fixture: ComponentFixture<HoehetwerktComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoehetwerktComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoehetwerktComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
