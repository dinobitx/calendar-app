import { MESSAGES } from '../messages';

export class CalendarEvent {
  private _id?: number;
  private _title = '';
  private _description = '';
  private _startDateTime = '';
  private _endDateTime = '';
  private _location = '';

  public constructor(init?: Partial<CalendarEvent>) {
    if (init) {
      Object.assign(this, init);
    }
  }

  public get id(): number | undefined {
    return this._id;
  }

  public set id(v: number | undefined) {
    this._id = v;
  }

  public get title(): string {
    return this._title;
  }
  public set title(v: string) {
    this._title = v?.trim() ?? '';
  }

  public get description(): string {
    return this._description;
  }
  public set description(v: string) {
    this._description = v?.trim() ?? '';
  }

  public get startDateTime(): string {
    return this._startDateTime;
  }
  public set startDateTime(v: string) {
    this._startDateTime = v;
  }

  public get endDateTime(): string {
    return this._endDateTime;
  }
  public set endDateTime(v: string) {
    this._endDateTime = v;
  }

  public get location(): string {
    return this._location;
  }
  public set location(v: string) {
    this._location = v?.trim() ?? '';
  }

  public validate(): string | null {
    if (!this._title) return MESSAGES.VALIDATION.TITLE_REQUIRED;
    if (!this._startDateTime) return MESSAGES.VALIDATION.START_REQUIRED;
    if (!this._endDateTime) return MESSAGES.VALIDATION.END_REQUIRED;
    if (new Date(this._endDateTime) < new Date(this._startDateTime))
      return MESSAGES.VALIDATION.END_BEFORE_START;
    return null;
  }
}
