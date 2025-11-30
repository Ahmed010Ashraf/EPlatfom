import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlLectComponent } from './control-lect-component';

describe('ControlLectComponent', () => {
  let component: ControlLectComponent;
  let fixture: ComponentFixture<ControlLectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlLectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlLectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
