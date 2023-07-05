import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubscriberService } from 'src/app/services/subscriber.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-subscriber-page',
  templateUrl: './create-subscriber-page.component.html',
  styleUrls: ['./create-subscriber-page.component.scss'],
})
export class CreateSubscriberPageComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  data: any = {
    Subscribers: [],
  };

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private subscriberService: SubscriberService
  ) {}

  ngOnInit(): void {
    this.form = this.builder.group({
      Name: ['', [Validators.required, Validators.minLength(3)]],
      Email: ['', [Validators.required, Validators.email]],
      CountryCode: ['', [Validators.required, Validators.minLength(2)]],
      PhoneNumber: ['', [Validators.required, Validators.minLength(4)]],
      JobTitle: '',
      Area: '',
      Topics: [[]],
    });
  }

  onSubmit() {
    this.data['Subscribers'].push(this.form.value);
    this.subscriberService
      .createSubscriber(this.data)
      .subscribe((answer) => console.log(answer));
    this.form.reset()
    Swal.fire('Created!', 'This subscriber has been created.', 'success');
  }

  onBack() {
    Swal.fire({
      title: 'Are you sure you want to exit this menu?',
      text: 'You will lose all the progress!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['manage-subscribers']);
      }
    });
  }
}
