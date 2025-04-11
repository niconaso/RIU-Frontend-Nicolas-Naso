import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../../../core/services';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [MatProgressSpinnerModule, AsyncPipe],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  #loadingService = inject(LoadingService);

  isLoading$ = this.#loadingService.loading$;
}
