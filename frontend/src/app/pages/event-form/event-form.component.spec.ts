import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventFormComponent } from './event-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { DateTimeService } from '../../service/date-time.service';
import { FormValidationService } from '../../service/form-validation.service';
import { EventsService } from '../../service/events.service';

describe('EventFormComponent', () => {
  let fixture: ComponentFixture<EventFormComponent>;
  let component: EventFormComponent;

  let eventsServiceSpy: jasmine.SpyObj<EventsService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    eventsServiceSpy = jasmine.createSpyObj('EventsService', [
      'getById',
      'create',
      'update'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [EventFormComponent],
      providers: [
        DateTimeService,
        FormValidationService,
        { provide: EventsService, useValue: eventsServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: {
                get: (_: string) => null
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EventFormComponent);
    component = fixture.componentInstance;
  });

  it('should init with current time when no query param', () => {
    fixture.detectChanges();

    expect(component.model.startDateTime).toContain('T');
    expect(component.model.endDateTime).toContain('T');
  });

  it('should load event when id is present', () => {
    const ar = TestBed.inject(ActivatedRoute) as any;
    ar.snapshot.queryParamMap.get = (name: string) => (name === 'id' ? '7' : null);

    const backendEvent = {
      id: 7,
      title: 'From backend',
      description: 'desc',
      startDateTime: '2025-11-05T10:00:00Z',
      endDateTime: '2025-11-05T11:00:00Z',
      location: 'Home'
    };

    eventsServiceSpy.getById.and.returnValue(of(backendEvent));

    fixture = TestBed.createComponent(EventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(eventsServiceSpy.getById).toHaveBeenCalledWith(7);
    expect(component.model.title).toBe('From backend');
  });

  it('should not save when validation fails', () => {
    fixture.detectChanges();

    component.model.title = '';
    component.model.startDateTime = '';
    component.model.endDateTime = '';

    component.submit({
      invalid: false,
      controls: {}
    } as any);

    expect(eventsServiceSpy.create).not.toHaveBeenCalled();
    expect(eventsServiceSpy.update).not.toHaveBeenCalled();
  });

  it('should save when valid', () => {
    fixture.detectChanges();

    component.model.title = 'Test';
    component.model.startDateTime = '2025-11-05T10:00';
    component.model.endDateTime = '2025-11-05T11:00';

    eventsServiceSpy.create.and.returnValue(of({
      id: 1,
      title: 'Test',
      description: '',
      startDateTime: '2025-11-05T10:00:00Z',
      endDateTime: '2025-11-05T11:00:00Z',
      location: ''
    }));

    component.submit({ invalid: false } as any);

    expect(eventsServiceSpy.create).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });
});
