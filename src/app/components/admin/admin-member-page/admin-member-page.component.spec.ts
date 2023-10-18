import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMemberPageComponent } from './admin-member-page.component';

describe('AdminMemberPageComponent', () => {
  let component: AdminMemberPageComponent;
  let fixture: ComponentFixture<AdminMemberPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminMemberPageComponent]
    });
    fixture = TestBed.createComponent(AdminMemberPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
