import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonPageComponent } from './common-page.component';

describe('CommonPageComponent', () => {
  let component: CommonPageComponent;
  let fixture: ComponentFixture<CommonPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommonPageComponent]
    });
    fixture = TestBed.createComponent(CommonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
