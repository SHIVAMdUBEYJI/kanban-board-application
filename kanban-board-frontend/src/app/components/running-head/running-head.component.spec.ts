import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningHeadComponent } from './running-head.component';

describe('RunningHeadComponent', () => {
  let component: RunningHeadComponent;
  let fixture: ComponentFixture<RunningHeadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RunningHeadComponent]
    });
    fixture = TestBed.createComponent(RunningHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
