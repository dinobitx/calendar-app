import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalendarEventDto } from '../model/calendar-event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private http = inject(HttpClient);
  private baseUrl = '/api/events';

  getAll(): Observable<CalendarEventDto[]> {
    return this.http.get<CalendarEventDto[]>(this.baseUrl);
  }

  getById(id: number): Observable<CalendarEventDto> {
    return this.http.get<CalendarEventDto>(`${this.baseUrl}/${id}`);
  }

  create(ev: CalendarEventDto): Observable<CalendarEventDto> {
    return this.http.post<CalendarEventDto>(this.baseUrl, ev);
  }

  update(id: number, ev: CalendarEventDto): Observable<CalendarEventDto> {
    return this.http.put<CalendarEventDto>(`${this.baseUrl}/${id}`, ev);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
