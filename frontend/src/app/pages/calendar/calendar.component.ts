import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EventsService } from '../../service/events.service';
import { CalendarEventDto } from '../../model/calendar-event';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {

  public currentDate = new Date();
  public weeks: any[] = [];
  private events: CalendarEventDto[] = [];

  constructor(
    private eventsService: EventsService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.generateCalendar();
    this.loadEvents();
  }

  public loadEvents(): void {
    this.eventsService.getAll().subscribe({
      next: (evts) => {
        this.events = evts;
        this.generateCalendar();
      },
      error: () => {
        this.generateCalendar();
      }
    });
  }

  public generateCalendar(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const startDay = firstDay.getDay() === 0 ? 7 : firstDay.getDay(); // 1-7

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const weeks: any[] = [];
    let week: any[] = [];

    for (let i = 1; i < startDay; i++) {
      week.push({ day: null, events: [] });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dayEvents = this.eventsForDay(year, month, d);
      week.push({ day: d, events: dayEvents });

      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }

    if (week.length) {
      while (week.length < 7) {
        week.push({ day: null, events: [] });
      }
      weeks.push(week);
    }

    this.weeks = weeks;
  }

  private eventsForDay(year: number, month: number, day: number): CalendarEventDto[] {
    return this.events.filter(e => {
      const start = new Date(e.startDateTime);
      return start.getFullYear() === year &&
        start.getMonth() === month &&
        start.getDate() === day;
    });
  }

  public prevMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendar();
  }

  public nextMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar();
  }

  public openEvent(ev: CalendarEventDto, event: MouseEvent): void {
    event.stopPropagation();
    this.router.navigate(['/event', ev.id]);
  }

  public openDay(day: number | null): void {
    if (!day) return;
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const date = new Date(year, month, day);

    this.router.navigate(['/add'], {
      queryParams: {
        date: date.toISOString()
      }
    });
  }

  public addEvent(): void {
    this.router.navigate(['/add']);
  }
}
