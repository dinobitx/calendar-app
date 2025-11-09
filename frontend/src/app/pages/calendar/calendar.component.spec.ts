import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarComponent } from './calendar.component';
import { EventsService } from '../../service/events.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let eventsServiceSpy: jasmine.SpyObj<EventsService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    eventsServiceSpy = jasmine.createSpyObj('EventsService', ['getAll']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [CalendarComponent],
      providers: [
        { provide: EventsService, useValue: eventsServiceSpy },
        { provide: Router, useValue: routerSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
  });

  it('loads events and generates calendar on init', () => {
    eventsServiceSpy.getAll.and.returnValue(of([]));

    fixture.detectChanges();

    expect(eventsServiceSpy.getAll).toHaveBeenCalled();
    expect(component.weeks.length).toBeGreaterThan(0);
  });

  it('marks day as having events when event date matches current month', () => {
    const today = component.currentDate;
    const evt = {
      id: 1,
      title: 'Match',
      startDateTime: new Date(today.getFullYear(), today.getMonth(), 5, 10, 0, 0).toISOString(),
      endDateTime: new Date(today.getFullYear(), today.getMonth(), 5, 11, 0, 0).toISOString(),
      description: '',
      location: ''
    };
    eventsServiceSpy.getAll.and.returnValue(of([evt]));

    fixture.detectChanges();

    const flat = component.weeks.flat();
    const day5 = flat.find(d => d.day === 5);
    expect(day5).toBeTruthy();
    expect(day5.events.length).toBe(1);
  });

  it('goes to previous month', () => {
    eventsServiceSpy.getAll.and.returnValue(of([]));
    fixture.detectChanges();

    const initialMonth = component.currentDate.getMonth();
    component.prevMonth();
    expect(component.currentDate.getMonth()).toBe(
      initialMonth === 0 ? 11 : initialMonth - 1
    );
  });

  it('goes to next month', () => {
    eventsServiceSpy.getAll.and.returnValue(of([]));
    fixture.detectChanges();

    const initialMonth = component.currentDate.getMonth();
    component.nextMonth();
    expect(component.currentDate.getMonth()).toBe(
      (initialMonth + 1) % 12
    );
  });

  it('opens day for creation when clicking on day', () => {
    eventsServiceSpy.getAll.and.returnValue(of([]));
    fixture.detectChanges();

    component.openDay(10);

    expect(routerSpy.navigate).toHaveBeenCalled();
    const call = routerSpy.navigate.calls.mostRecent();
    const path = call.args[0] as string[];
    const extras = call.args[1] as { queryParams?: Record<string, any> } | undefined;

    expect(path).toEqual(['/add']);
    expect(extras?.queryParams?.['date']).toBeTruthy();
  });

  it('opens event details when clicking on event', () => {
    eventsServiceSpy.getAll.and.returnValue(of([]));
    fixture.detectChanges();

    const fakeEvent = { id: 42 } as any;
    const fakeMouseEvent = new MouseEvent('click');
    spyOn(fakeMouseEvent, 'stopPropagation');

    component.openEvent(fakeEvent, fakeMouseEvent);

    expect(fakeMouseEvent.stopPropagation).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/event', 42]);
  });
});
