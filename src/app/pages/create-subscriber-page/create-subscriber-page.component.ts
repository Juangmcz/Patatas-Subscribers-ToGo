import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { CountryService } from 'src/app/services/country/country.service';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { SubscriberService } from 'src/app/services/subscriber/subscriber.service';

@Component({
  selector: 'app-create-subscriber-page',
  templateUrl: './create-subscriber-page.component.html',
  styleUrls: ['./create-subscriber-page.component.scss'],
  standalone: true,
  imports: [
    MatLabel,
    MatInput,
    MatError,
    MatSelect,
    MatOption,
    MatButton,
    MatFormField,
    ReactiveFormsModule,
  ],
})
export class CreateSubscriberPageComponent implements OnInit {
  countries: string[] = [];
  form: FormGroup = new FormGroup({});

  data: any = {
    Subscribers: [],
  };

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private countryService: CountryService,
    private subscriberService: SubscriberService
  ) {}

  ngOnInit(): void {
    this.getAllCountries();
    this.buildForm();
  }

  onSubmit() {
    this.data['Subscribers'].push(this.form.value);
    this.subscriberService
      .createSubscriber(this.data)
      .subscribe((answer) => console.log(answer));
    this.form.reset();
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

  onAddAnotherSubscriber() {
    Swal.fire({
      title: 'Are you sure you want to add another subscriber?',
      text: 'You cannot undo this action',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.data['Subscribers'].push(this.form.value);
        this.form.reset();
        this.buildForm();
      }
    });
  }

  buildForm() {
    this.form = this.builder.group({
      Name: ['', [Validators.required, Validators.minLength(3)]],
      Email: ['', [Validators.required, Validators.email]],
      CountryCode: ['', [Validators.required]],
      PhoneNumber: ['', [Validators.required, Validators.minLength(4)]],
      JobTitle: '',
      Area: '',
      Topics: [[]],
    });
  }

  getAllCountries() {
    this.countryService.getAllCountries(255).subscribe({
      next: (answer) => {
        this.countries = answer.Data.map(function (item: any) {
          return item.Code;
        });
      },
      error: console.log,
      complete: console.log,
    });
  }
}
