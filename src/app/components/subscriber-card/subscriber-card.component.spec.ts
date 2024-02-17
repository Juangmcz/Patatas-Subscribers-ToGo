import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberCardComponent } from './subscriber-card.component';

describe('SubscriberCardComponent', () => {
  let component: SubscriberCardComponent;
  let fixture: ComponentFixture<SubscriberCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [SubscriberCardComponent]
});
    fixture = TestBed.createComponent(SubscriberCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
