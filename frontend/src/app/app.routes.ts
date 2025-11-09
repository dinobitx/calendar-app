import { Routes } from '@angular/router';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { EventFormComponent } from './pages/event-form/event-form.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: CalendarComponent },
  { path: 'add', component: EventFormComponent },
  { path: 'event/:id', component: EventDetailsComponent },
  { path: '**', component: NotFoundComponent }
];
