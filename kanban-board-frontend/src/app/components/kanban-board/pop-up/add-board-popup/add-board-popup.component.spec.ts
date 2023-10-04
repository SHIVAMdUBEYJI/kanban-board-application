import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoardPopupComponent } from './add-board-popup.component';

describe('AddBoardPopupComponent', () => {
  let component: AddBoardPopupComponent;
  let fixture: ComponentFixture<AddBoardPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBoardPopupComponent]
    });
    fixture = TestBed.createComponent(AddBoardPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
