import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContorlLevelComponent } from './contorl-level-component';

describe('ContorlLevelComponent', () => {
  let component: ContorlLevelComponent;
  let fixture: ComponentFixture<ContorlLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContorlLevelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContorlLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
