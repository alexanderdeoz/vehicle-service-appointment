import { Injectable } from '@angular/core';
import { MenuItemCommandEvent } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  public dataRow(event: MenuItemCommandEvent): number {
    return parseInt(
      (
        (event.originalEvent?.target as HTMLSpanElement).dataset['index'] ??
        '-1'
      ).toString(),
    );
  }
}
