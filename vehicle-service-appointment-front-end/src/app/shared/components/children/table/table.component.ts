import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Table, TableModule, TableSelectAllChangeEvent } from 'primeng/table';
import {
  CurrencyPipe,
  DatePipe,
  NgForOf,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
} from '@angular/common';
import { Button, ButtonDirective } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { ScreenSize, SelectionModeEnum } from '@app/shared/enum';
import { IColumnModel } from '@app/shared/models';
import { ToolbarModule } from 'primeng/toolbar';
import { ChipsModule } from 'primeng/chips';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TagModule } from 'primeng/tag';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    TableModule,
    NgForOf,
    Button,
    Ripple,
    NgIf,
    ToolbarModule,
    ButtonDirective,
    ChipsModule,
    PaginatorModule,
    CardModule,
    MenuModule,
    OverlayPanelModule,
    NgSwitch,
    NgSwitchDefault,
    NgSwitchCase,
    CurrencyPipe,
    TagModule,
    FileUploadModule,
    DatePipe,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() selectionMode?: SelectionModeEnum;
  @Input() value: any[] = [];
  @Input() columns: IColumnModel[] = [];
  @Input() dataKey: string = 'id';
  @Input() selection: any = null;
  @Input() selectAll: boolean = false;
  @Input() loading: unknown;
  @Input() globalFilterFields: string[] | undefined;
  @Input() title: string = 'Lista';
  @ViewChild('filter') filter!: ElementRef;
  @Output() edit = new EventEmitter();
  @Output() document = new EventEmitter();
  @Output() documentStatus = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() create = new EventEmitter();
  @Output() reload = new EventEmitter();
  @Output() selectAllChange = new EventEmitter<TableSelectAllChangeEvent>();
  @Output() selectionChange = new EventEmitter<any>();
  @Input() rows!: number;
  @Input() totalRecords!: number;
  @Output() onPageChange = new EventEmitter();
  @Input() showCaption2 = true;
  @Input() showReload = true;
  @Input() showCreate = true;
  @Input() showPagination = true;
  @Input() menuItems: MenuItem[] = [];
  items: MenuItem[] | undefined = [
    {
      label: 'Options',
      items: [
        {
          label: 'Refresh',
          icon: 'pi pi-refresh',
        },
        {
          label: 'Export',
          icon: 'pi pi-upload',
        },
      ],
    },
  ];
  protected readonly SelectionModeEnum = SelectionModeEnum;
  protected readonly ScreenSize = ScreenSize;

  public onGlobalFilter(table: Table, event: Event): void {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  public clear(table: Table): void {
    table.clear();
    this.filter.nativeElement.value = '';
  }
}
