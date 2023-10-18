import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetgivingRecordPageComponent } from './petgiving-record-page.component';

describe('PetgivingRecordPageComponent', () => {
  let component: PetgivingRecordPageComponent;
  let fixture: ComponentFixture<PetgivingRecordPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PetgivingRecordPageComponent]
    });
    fixture = TestBed.createComponent(PetgivingRecordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
