import { Component } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  template: `
    <p-confirmDialog
      [style]="{ width: '30rem' }"
      [dismissableMask]="true"
      [closable]="true"
    ></p-confirmDialog>
  `,
  imports: [ConfirmDialogModule],
})
export class ConfirmDialogComponent {}
