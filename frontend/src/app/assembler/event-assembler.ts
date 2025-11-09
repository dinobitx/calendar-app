import { CalendarEvent } from '../model/calendar-event.model';
import { DateTimeService } from '../service/date-time.service';

export class EventAssembler {

  public static fromBackend(ev: any, dateTime: DateTimeService): CalendarEvent {
    return new CalendarEvent({
      id: ev.id,
      title: ev.title,
      description: ev.description,
      startDateTime: dateTime.toLocalInput(new Date(ev.startDateTime)),
      endDateTime: dateTime.toLocalInput(new Date(ev.endDateTime)),
      location: ev.location,
    });
  }

  public static toBackend(model: CalendarEvent, dateTime: DateTimeService): any {
    return {
      title: model.title,
      description: model.description,
      startDateTime: dateTime.toUTC(model.startDateTime),
      endDateTime: dateTime.toUTC(model.endDateTime),
      location: model.location,
    };
  }
}
