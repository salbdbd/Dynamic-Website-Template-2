import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveChatApplicationComponent } from './live-chat-application.component';

describe('LiveChatApplicationComponent', () => {
  let component: LiveChatApplicationComponent;
  let fixture: ComponentFixture<LiveChatApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveChatApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveChatApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
