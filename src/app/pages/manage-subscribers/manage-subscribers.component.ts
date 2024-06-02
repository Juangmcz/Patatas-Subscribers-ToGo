import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { SubscriberInfo } from 'src/app/models/subscriber-info.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SubscriberService } from 'src/app/services/subscriber/subscriber.service';
import { SubscriberCardComponent } from '../../components/subscriber-card/subscriber-card.component';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-manage-subscribers',
  templateUrl: './manage-subscribers.component.html',
  styleUrls: ['./manage-subscribers.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    MatIcon,
    MatLabel,
    MatInput,
    MatButton,
    MatSelect,
    MatOption,
    MatFormField,
    MatIconButton,
    ReactiveFormsModule,
    SubscriberCardComponent,
  ],
})
export class ManageSubscribersComponent implements OnInit {
  count: number = 10;
  criteria: string = '';
  sortType: string = '';
  sortOrder: string = '';
  currentPage: number = 1;
  totalOfSubscribers: number = 0;
  totalOfPages: number = 0;
  subscribers: SubscriberInfo[] = [];

  form: FormGroup = new FormGroup({});

  constructor(
    private service: SubscriberService,
    private builder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllSubscribers();
    this.form = this.builder.group({
      search: '',
    });
  }

  onNextPage() {
    if (this.totalOfSubscribers > 10 && this.currentPage < this.totalOfPages) {
      this.currentPage += 1;
      this.getAllSubscribers();
    }
  }

  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.getAllSubscribers();
    }
  }

  pageGreaterThanOne(): boolean {
    if (this.currentPage > 1) {
      return true;
    } else {
      return false;
    }
  }

  onApply() {
    this.currentPage = 1;
    this.criteria = this.form.value.search;
    this.getAllSubscribers();
  }

  getAllSubscribers() {
    this.service
      .getAllSubscribers(
        this.count,
        this.currentPage,
        this.criteria,
        this.sortType,
        this.sortOrder
      )
      .subscribe({
        next: (subscriber) => {
          (this.subscribers = subscriber.Data),
            (this.totalOfSubscribers = subscriber.Count);
          this.totalOfPages = Math.ceil(this.totalOfSubscribers / 10);
        },
        error: console.log,
        complete: console.log,
      });
  }
}
