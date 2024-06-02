import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriberInfo } from 'src/app/models/subscriber-info.model';
import { SubscriberService } from 'src/app/services/subscriber.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-edit-subscriber',
  templateUrl: './edit-subscriber.component.html',
  styleUrls: ['./edit-subscriber.component.scss'],
  standalone: true,
  imports: [
    MatLabel,
    MatInput,
    MatError,
    MatButton,
    MatFormField,
    ReactiveFormsModule,
  ],
})
export class EditSubscriberComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  subscriberInfo: SubscriberInfo = {
    Id: 0,
    Name: '',
    Email: '',
    CountryCode: '',
    PhoneNumber: '',
    Area: '',
    JobTitle: '',
    Topics: [],
  };

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private subscriberService: SubscriberService
  ) {}

  ngOnInit(): void {
    this.form = this.builder.group({
      name: '',
      email: '',
      countryCode: '',
      phoneNumber: 0,
      area: '',
      jobTitle: '',
      topics: [],
    });

    this.route.queryParams.subscribe((info) => {
      if (JSON.stringify(info) !== JSON.stringify({})) {
        this.form.setValue({
          name: JSON.parse(info['data']).Name,
          email: JSON.parse(info['data']).Email,
          countryCode: JSON.parse(info['data']).CountryCode,
          phoneNumber: JSON.parse(info['data']).PhoneNumber,
          area: JSON.parse(info['data']).Area,
          jobTitle: JSON.parse(info['data']).JobTitle,
          topics: JSON.parse(info['data']).Topics,
        });
        this.subscriberInfo.Id = JSON.parse(info['data']).Id;
      }
    });
  }

  onSubmit() {
    this.subscriberInfo.Name = this.form['value'].name;
    this.subscriberInfo.Email = this.form['value'].email;
    this.subscriberInfo.CountryCode = this.form['value'].countryCode;
    this.subscriberInfo.PhoneNumber = this.form['value'].phoneNumber;
    this.subscriberInfo.Area = this.form['value'].area;
    this.subscriberInfo.JobTitle = this.form['value'].jobTitle;
    this.subscriberInfo.Topics = this.form['value'].topics;

    this.subscriberService
      .updateSubscriber(this.subscriberInfo)
      .subscribe((answer) => console.log(answer));

    this.router.navigate(['manage-subscribers']);
    Swal.fire('Updated!', 'This subscriber has been updated.', 'success');
  }

  onBack() {
    Swal.fire({
      title: 'Are you sure you want to exit this menu?',
      text: 'You will lose all the progress!!',
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
