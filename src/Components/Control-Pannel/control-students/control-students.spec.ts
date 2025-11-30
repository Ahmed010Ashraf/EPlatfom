import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlStudents } from './control-students';

describe('ControlStudents', () => {
  let component: ControlStudents;
  let fixture: ComponentFixture<ControlStudents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlStudents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlStudents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
