export interface CalendarEventDto {
  id?: number;
  title: string;
  description?: string;
  startDateTime: string;
  endDateTime: string;
  location?: string;
}
