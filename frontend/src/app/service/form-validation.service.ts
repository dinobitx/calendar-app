import { Injectable } from '@angular/core';
import { CalendarEvent } from '../model/calendar-event.model';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  public validateEvent(model: CalendarEvent): string | null {
    return model.validate();
  }
}
