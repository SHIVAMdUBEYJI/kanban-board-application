import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddColumnPopupComponent } from './add-column-popup.component';

describe('AddColumnPopupComponent', () => {
  let component: AddColumnPopupComponent;
  let fixture: ComponentFixture<AddColumnPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddColumnPopupComponent]
    });
    fixture = TestBed.createComponent(AddColumnPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
