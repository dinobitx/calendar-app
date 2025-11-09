import { MESSAGES } from '../messages';
import {CalendarEvent} from './calendar-event.model';

describe('CalendarEvent.validate', () => {
  it('returns title message from MESSAGES', () => {
    const ev = new CalendarEvent({
      startDateTime: '2025-11-05T10:00',
      endDateTime: '2025-11-05T11:00'
    });

    const err = ev.validate();

    expect(err).toBe(MESSAGES.VALIDATION.TITLE_REQUIRED);
  });

  it('returns end-before-start message from MESSAGES', () => {
    const ev = new CalendarEvent({
      title: 'Test',
      startDateTime: '2025-11-05T11:00',
      endDateTime: '2025-11-05T10:00'
    });

    const err = ev.validate();

    expect(err).toBe(MESSAGES.VALIDATION.END_BEFORE_START);
  });

  it('returns null if valid', () => {
    const ev = new CalendarEvent({
      title: 'Test',
      startDateTime: '2025-11-05T10:00',
      endDateTime: '2025-11-05T11:00'
    });

    const err = ev.validate();

    expect(err).toBeNull();
  });
});
