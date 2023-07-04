import { Component, OnInit } from '@angular/core';
import { SubscriberInfo } from 'src/app/models/subscriber-info.model';
import { SubscriberService } from 'src/app/services/subscriber.service';

@Component({
  selector: 'app-manage-subscribers',
  templateUrl: './manage-subscribers.component.html',
  styleUrls: ['./manage-subscribers.component.scss'],
})
export class ManageSubscribersComponent implements OnInit {
  subscribers: SubscriberInfo[] = [];
  total: number = this.subscribers.length;

  constructor(private service: SubscriberService) {}

  ngOnInit(): void {
    this.service.getAllSubscribers().subscribe({
      next: (subscriber) => {
        console.log(subscriber.data);
        (this.subscribers = subscriber.Data),
          (this.total = this.subscribers.length);
      },
      error: console.log,
      complete: console.log,
    });
  }
}
