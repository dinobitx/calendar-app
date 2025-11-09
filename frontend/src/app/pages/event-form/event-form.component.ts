import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarEvent } from '../../model/calendar-event.model';
import { EventFormFacade } from '../../service/event-form.facade';
import { FormValidationService } from '../../service/form-validation.service';
import {DateTimeService} from '../../service/date-time.service';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [EventFormFacade],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.scss'
})
export class EventFormComponent implements OnInit {
  public model = new CalendarEvent();
  public isEdit = false;
  public editedId?: number;
  public error = '';

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly facade: EventFormFacade,
    private readonly validation: FormValidationService,
    private readonly dateTimeService: DateTimeService
  ) {}

  public ngOnInit(): void {
    const idFromQuery = this.route.snapshot.queryParamMap.get('id');
    const dateFromQuery = this.route.snapshot.queryParamMap.get('date');

    if (idFromQuery) {
      this.isEdit = true;
      this.editedId = Number(idFromQuery);
      this.facade.load(this.editedId).subscribe(ev => {
        this.model = this.facade.handleLoadResponse(ev);
      });
      return;
    }

    if (dateFromQuery) {
      const base = this.dateTimeService.parseDateParamUseCurrentTime(dateFromQuery);
      this.model.startDateTime = this.dateTimeService.toLocalInput(base);

      const oneHourLater = new Date(base.getTime() + 60 * 60 * 1000);
      this.model.endDateTime = this.dateTimeService.toLocalInput(oneHourLater);
      return;
    }

    const now = new Date();
    this.model.startDateTime = this.dateTimeService.toLocalInput(now);

    const inOneHour = new Date(now.getTime() + 60 * 60 * 1000);
    this.model.endDateTime = this.dateTimeService.toLocalInput(inOneHour);
  }

  public submit(form: NgForm): void {
    this.error = '';

    const validationError = this.validation.validateEvent(this.model);
    if (validationError) {
      this.error = validationError;
      Object.values(form.controls).forEach(c => c.markAsTouched());
      return;
    }

    this.facade.save(this.model, this.editedId);
  }

  public back(): void {
    if (this.isEdit && this.editedId) {
      this.router.navigate(['/event', this.editedId]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
