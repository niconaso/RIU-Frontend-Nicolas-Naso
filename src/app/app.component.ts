import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent, NavComponent } from './shared/components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
