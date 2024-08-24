import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSelectListComponent } from './report-select-list.component';

describe('ReportSelectListComponent', () => {
  let component: ReportSelectListComponent;
  let fixture: ComponentFixture<ReportSelectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSelectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSelectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
