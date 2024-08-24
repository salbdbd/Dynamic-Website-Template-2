import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberShipCriteriaComponent } from './member-ship-criteria.component';

describe('MemberShipCriteriaComponent', () => {
  let component: MemberShipCriteriaComponent;
  let fixture: ComponentFixture<MemberShipCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberShipCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberShipCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
