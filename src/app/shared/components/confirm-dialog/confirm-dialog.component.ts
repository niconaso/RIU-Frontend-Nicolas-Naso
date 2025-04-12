import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Inject,
  OnInit,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent implements OnInit {
  title!: string;
  message!: string;

  #dialogRef = inject(MatDialogRef);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string },
  ) {}

  ngOnInit(): void {
    const { title, message } = this.data;

    this.title = title;
    this.message = message;
  }

  confirm() {
    this.#dialogRef.close(true);
  }
}
