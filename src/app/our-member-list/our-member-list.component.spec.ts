import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurMemberListComponent } from './our-member-list.component';

describe('OurMemberListComponent', () => {
  let component: OurMemberListComponent;
  let fixture: ComponentFixture<OurMemberListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurMemberListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurMemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
