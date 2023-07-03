import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubscriberPageComponent } from './create-subscriber-page.component';

describe('CreateSubscriberPageComponent', () => {
  let component: CreateSubscriberPageComponent;
  let fixture: ComponentFixture<CreateSubscriberPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSubscriberPageComponent]
    });
    fixture = TestBed.createComponent(CreateSubscriberPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
