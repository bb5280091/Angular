import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberInfoPageComponent } from './member-info-page.component';

describe('MemberInfoPageComponent', () => {
  let component: MemberInfoPageComponent;
  let fixture: ComponentFixture<MemberInfoPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberInfoPageComponent]
    });
    fixture = TestBed.createComponent(MemberInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
