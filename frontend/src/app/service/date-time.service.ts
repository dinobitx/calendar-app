import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  public toLocalInput(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  public toUTC(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toISOString();
  }

  public parseDateParamUseCurrentTime(value: string): Date {
    const paramDate = new Date(value);
    const now = new Date();

    return new Date(
      paramDate.getFullYear(),
      paramDate.getMonth(),
      paramDate.getDate(),
      now.getHours(),
      now.getMinutes(),
      0,
      0
    );
  }
}
