import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatOption } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { SubscriberInfo } from 'src/app/models/subscriber-info.model';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SubscriberService } from 'src/app/services/subscriber/subscriber.service';
import { SubscriberCardComponent } from '../../components/subscriber-card/subscriber-card.component';

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
  // Properties
  private count: number = 10;
  public sortType: string = '';
  private criteria: string = '';
  public sortOrder: string = '';
  public currentPage = signal(1);
  public totalOfSubscribers = signal(0);
  public form: FormGroup = new FormGroup({});
  public totalOfPages = computed(() =>
    Math.ceil(this.totalOfSubscribers() / 10)
  );
  public subscribers = signal<SubscriberInfo[]>([]);

  // Services
  private builder = inject(FormBuilder);
  private subscriberService = inject(SubscriberService);

  // Methods
  ngOnInit(): void {
    this.getAllSubscribers();
    this.form = this.builder.group({
      search: '',
    });
  }

  public onNextPage(): void {
    if (
      this.totalOfSubscribers() > 10 &&
      this.currentPage() < this.totalOfPages()
    ) {
      this.currentPage.update((p) => p + 1);
      this.getAllSubscribers();
    }
  }

  public onPreviousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update((p) => p - 1);
      this.getAllSubscribers();
    }
  }

  public onApply(): void {
    this.currentPage.set(1);
    this.criteria = this.form.value.search;
    this.getAllSubscribers();
  }

  private getAllSubscribers(): void {
    this.subscriberService
      .getAllSubscribers(
        this.count,
        this.currentPage(),
        this.criteria,
        this.sortType,
        this.sortOrder
      )
      .subscribe({
        next: (subscriber) => {
          this.subscribers.set(subscriber.Data),
            this.totalOfSubscribers.set(subscriber.Count);
        },
        error: console.log,
        complete: console.log,
      });
  }
}
