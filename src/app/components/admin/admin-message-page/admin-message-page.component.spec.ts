import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMessagePageComponent } from './admin-message-page.component';

describe('AdminMessagePageComponent', () => {
  let component: AdminMessagePageComponent;
  let fixture: ComponentFixture<AdminMessagePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminMessagePageComponent]
    });
    fixture = TestBed.createComponent(AdminMessagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
