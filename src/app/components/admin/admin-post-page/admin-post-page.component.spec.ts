import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPostPageComponent } from './admin-post-page.component';

describe('AdminPostPageComponent', () => {
  let component: AdminPostPageComponent;
  let fixture: ComponentFixture<AdminPostPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPostPageComponent]
    });
    fixture = TestBed.createComponent(AdminPostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
