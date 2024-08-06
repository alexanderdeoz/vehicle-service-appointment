import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { MessageSeverity } from '@app/shared/enum/theme';
import { MessageConfig } from '@app/shared/config';

@Injectable({
  providedIn: 'root',
})
export class ToastMessageService {
  constructor(private readonly messageService: MessageService) {}

  public info(message: Message): void {
    this.messageService.add({
      severity: MessageSeverity.info,
      ...MessageConfig,
      ...message,
    });
  }

  public success(message: Message): void {
    this.messageService.add({
      severity: MessageSeverity.success,
      ...MessageConfig,
      ...message,
    });
  }

  public warn(message: Message): void {
    this.messageService.add({
      severity: MessageSeverity.warning,
      ...MessageConfig,
      ...message,
    });
  }

  public error(message: Message): void {
    this.messageService.add({
      severity: MessageSeverity.danger,
      ...MessageConfig,
      ...message,
    });
  }

  public custom(message: Message) {
    this.messageService.add({
      ...MessageConfig,
      ...message,
    });
  }
}
