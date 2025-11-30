import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificCourse } from './specific-course';

describe('SpecificCourse', () => {
  let component: SpecificCourse;
  let fixture: ComponentFixture<SpecificCourse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecificCourse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificCourse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
