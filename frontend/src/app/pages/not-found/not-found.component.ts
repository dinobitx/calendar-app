import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SvgNotFoundIllustrationComponent } from '../../shared/svg-not-found-illustration/svg-not-found-illustration.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, SvgNotFoundIllustrationComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  public back(): void {
    this.router.navigate(['/']);
  }
}
