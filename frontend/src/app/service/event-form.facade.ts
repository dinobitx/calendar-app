import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MESSAGES } from '../messages';
import { CalendarEvent } from '../model/calendar-event.model';
import { DateTimeService } from './date-time.service';
import { EventAssembler } from '../assembler/event-assembler';
import { EventsService } from './events.service';

@Injectable()
export class EventFormFacade {

  public constructor(
    private readonly eventsService: EventsService,
    private readonly router: Router,
    private readonly dateTime: DateTimeService
  ) {}

  public load(id: number) {
    return this.eventsService.getById(id);
  }

  public handleLoadResponse(ev: any): CalendarEvent {
    return EventAssembler.fromBackend(ev, this.dateTime);
  }

  public save(model: CalendarEvent, editedId?: number): void {
    const payload = EventAssembler.toBackend(model, this.dateTime);

    if (editedId) {
      this.eventsService.update(editedId, payload).subscribe({
        next: () => this.router.navigate(['/event', editedId]),
        error: () => console.error(MESSAGES.COMMON.SAVE_ERROR)
      });
    } else {
      this.eventsService.create(payload).subscribe({
        next: () => this.router.navigate(['/']),
        error: () => console.error(MESSAGES.COMMON.SAVE_ERROR)
      });
    }
  }
}
