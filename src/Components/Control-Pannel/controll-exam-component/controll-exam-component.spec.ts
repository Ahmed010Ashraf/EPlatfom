import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllExamComponent } from './controll-exam-component';

describe('ControllExamComponent', () => {
  let component: ControllExamComponent;
  let fixture: ComponentFixture<ControllExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControllExamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControllExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
