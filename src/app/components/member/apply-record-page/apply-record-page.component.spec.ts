import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyRecordPageComponent } from './apply-record-page.component';

describe('ApplyRecordPageComponent', () => {
  let component: ApplyRecordPageComponent;
  let fixture: ComponentFixture<ApplyRecordPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplyRecordPageComponent]
    });
    fixture = TestBed.createComponent(ApplyRecordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
