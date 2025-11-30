import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlCourseComponent } from './control-course-component';

describe('ControlCourseComponent', () => {
  let component: ControlCourseComponent;
  let fixture: ComponentFixture<ControlCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
