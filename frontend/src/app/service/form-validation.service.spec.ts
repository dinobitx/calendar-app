import { FormValidationService } from './form-validation.service';
import { MESSAGES } from '../messages';
import { CalendarEvent } from '../model/calendar-event.model';

describe('FormValidationService', () => {
  let service: FormValidationService;

  beforeEach(() => {
    service = new FormValidationService();
  });

  it('should return error if title missing', () => {
    const model = new CalendarEvent({
      startDateTime: '2025-11-05T10:00',
      endDateTime: '2025-11-05T11:00'
    });

    const err = service.validateEvent(model);
    expect(err).toBe(MESSAGES.VALIDATION.TITLE_REQUIRED);
  });

  it('should return error if end before start', () => {
    const model = new CalendarEvent({
      title: 'Test',
      startDateTime: '2025-11-05T11:00',
      endDateTime: '2025-11-05T10:00'
    });

    const err = service.validateEvent(model);
    expect(err).toBe(MESSAGES.VALIDATION.END_BEFORE_START);
  });

  it('should return null if valid', () => {
    const model = new CalendarEvent({
      title: 'Test',
      startDateTime: '2025-11-05T10:00',
      endDateTime: '2025-11-05T11:00'
    });

    const err = service.validateEvent(model);
    expect(err).toBeNull();
  });
});
