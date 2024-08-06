import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { SeverityMessageServiceEnum } from '@app/shared/enum';
import { MessageModel } from '@app/models';
import { IRouteStateModel } from '@app/shared/models';
import { MessageModule } from 'primeng/message';
import { ButtonDirective } from 'primeng/button';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [MessageModule, ButtonDirective, Ripple],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  public serverMessage?: MessageModel = {
    severity: SeverityMessageServiceEnum.warning,
    summary: 'Recurso no encontrado',
  };
  public buttonLabel: string = 'Volver a inicio';
  public buttonHref: string = '/';

  constructor(private location: Location) {
    const data = this.location.getState() as IRouteStateModel<MessageModel>;
    this.serverMessage = data.data;
    if (data.buttonLabel) this.buttonLabel = data.buttonLabel;
    if (data.buttonHref) this.buttonHref = data.buttonHref;
  }
}
