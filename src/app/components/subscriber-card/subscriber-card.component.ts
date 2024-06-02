import Swal from 'sweetalert2';
import {
  MatCard,
  MatCardTitle,
  MatCardHeader,
  MatCardContent,
  MatCardActions,
  MatCardSubtitle,
} from '@angular/material/card';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { Component, inject, input } from '@angular/core';
import { SubscriberInfo } from 'src/app/models/subscriber-info.model';
import { SubscriberService } from 'src/app/services/subscriber/subscriber.service';

@Component({
  selector: 'app-subscriber-card',
  templateUrl: './subscriber-card.component.html',
  styleUrls: ['./subscriber-card.component.scss'],
  standalone: true,
  imports: [
    MatCard,
    MatButton,
    MatCardTitle,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatCardSubtitle,
  ],
})
export class SubscriberCardComponent {
  // Properties
  public subscriberInfo = input.required<SubscriberInfo>();

  // Services
  private router = inject(Router);
  private subscriberService = inject(SubscriberService);

  // Methods
  public editSubscriber(): void {
    this.router.navigate(['edit-subscriber'], {
      queryParams: {
        data: JSON.stringify(this.subscriberInfo()),
      },
    });
  }

  public deleteSubscriber(): void {
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
          .deleteSubscriber(this.subscriberInfo().Id)
          .subscribe({
            error: console.log,
            complete: console.log,
          });
        Swal.fire('Deleted!', 'This subscriber has been deleted.', 'success');
      }
    });
  }
}
