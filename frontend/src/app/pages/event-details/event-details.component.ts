import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../../service/events.service';
import { CalendarEventDto } from '../../model/calendar-event';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss'
})
export class EventDetailsComponent implements OnInit {

  public event?: CalendarEventDto;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private eventsService: EventsService
  ) {}

  public ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.eventsService.getById(id).subscribe(ev => this.event = ev);
  }

  public delete(): void {
    if (!this.event?.id) return;
    this.eventsService.delete(this.event.id).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  public edit(): void {
    if (!this.event?.id) return;
    this.router.navigate(['/add'], { queryParams: { id: this.event.id } });
  }
}
