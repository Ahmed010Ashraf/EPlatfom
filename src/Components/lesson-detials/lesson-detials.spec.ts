import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonDetials } from './lesson-detials';

describe('LessonDetials', () => {
  let component: LessonDetials;
  let fixture: ComponentFixture<LessonDetials>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonDetials]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonDetials);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
