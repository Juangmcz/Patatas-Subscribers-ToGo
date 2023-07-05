import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { SubscriberInfo } from 'src/app/models/subscriber-info.model';
import { SubscriberService } from 'src/app/services/subscriber.service';
import { windowWhen } from 'rxjs';

@Component({
  selector: 'app-subscriber-card',
  templateUrl: './subscriber-card.component.html',
  styleUrls: ['./subscriber-card.component.scss'],
})
export class SubscriberCardComponent {
  @Input() subscriberInfo: SubscriberInfo = {
    SystemId: null,
    Area: '',
    PublicId: 0,
    CountryCode: '',
    CountryName: '',
    Name: ' ',
    EndpointsCount: 0,
    Email: '',
    JobTitle: '',
    PhoneNumber: '',
    PhoneCode: '',
    PhoneCodeAndNumber: '',
    LastActivityUtc: null,
    LastActivity: null,
    LastActivityString: null,
    SubscriptionDate: null,
    SubscriptionMethod: 0,
    SubscriptionState: 0,
    SubscriptionStateDescription: '',
    Topics: [],
    ValidEmail: true,
    Activity: '',
    ConnectionState: 0,
    Id: 0,
  };

  constructor(
    private router: Router,
    private subscriberService: SubscriberService
  ) {}

  editSubscriber() {
    this.router.navigate(['edit-subscriber'], {
      queryParams: {
        data: JSON.stringify(this.subscriberInfo),
      },
    });
  }

  deleteSubscriber() {
    Swal.fire({
      title: 'Are you sure you want to remove this subscriber?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.subscriberService
          .deleteSubscriber(this.subscriberInfo.Id)
          .subscribe({
            error: console.log,
            complete: console.log,
          });
        window.location.reload();
        Swal.fire('Deleted!', 'This subscriber has been deleted.', 'success');
      }
    });
  }
}
