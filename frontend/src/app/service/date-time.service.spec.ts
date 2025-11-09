import { DateTimeService } from './date-time.service';

describe('DateTimeService', () => {
  let service: DateTimeService;

  beforeEach(() => {
    service = new DateTimeService();
  });

  it('should format date to datetime-local string', () => {
    const d = new Date(2025, 10, 5, 3, 42);
    const res = service.toLocalInput(d);
    expect(res).toBe('2025-11-05T03:42');
  });

  it('should parse ISO date from query and keep local day', () => {
    const d = service.parseDateParamUseCurrentTime('2025-11-05T22:00:00.000Z');
    expect(d.getDate()).toBe(6);
  });

  it('should convert local datetime string to ISO', () => {
    const iso = service.toUTC('2025-11-05T10:00');
    expect(iso.startsWith('2025-11-05T')).toBeTrue();
  });
});
