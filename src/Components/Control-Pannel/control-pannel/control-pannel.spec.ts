import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPannel } from './control-pannel';

describe('ControlPannel', () => {
  let component: ControlPannel;
  let fixture: ComponentFixture<ControlPannel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlPannel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlPannel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
