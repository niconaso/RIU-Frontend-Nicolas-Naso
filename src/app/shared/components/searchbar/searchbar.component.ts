import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  input,
  OnInit,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, tap } from 'rxjs';
@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchbarComponent implements OnInit {
  placeholder = input<string>('Search...');

  searchControl = new FormControl('');

  search = output<string | null>();

  onSearch$ = this.searchControl.valueChanges.pipe(
    debounceTime(300),
    tap((value) => this.search.emit(value)),
    takeUntilDestroyed(),
  );

  ngOnInit(): void {
    this.onSearch$.subscribe();
  }

  @HostListener('window:keyup.escape', ['$event'])
  clear() {
    this.searchControl.reset();
    this.search.emit('');
  }
}
