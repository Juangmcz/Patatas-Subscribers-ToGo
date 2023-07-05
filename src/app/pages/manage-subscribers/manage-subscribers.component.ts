import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubscriberInfo } from 'src/app/models/subscriber-info.model';
import { SubscriberService } from 'src/app/services/subscriber.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-manage-subscribers',
  templateUrl: './manage-subscribers.component.html',
  styleUrls: ['./manage-subscribers.component.scss'],
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
    console.log(this.totalOfSubscribers);
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

  getNumberOfPages() {}

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
