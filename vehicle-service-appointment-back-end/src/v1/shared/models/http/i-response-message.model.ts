import { SeverityMessage } from '@v1/shared/enum';

/**
 * Esta definición parametriza las notificaciones del cliente web.
 * */
export interface IResponseMessageModel {
  statusCode?: number;
  severity?: SeverityMessage;
  summary?: string;
  detail?: string;
  error?: unknown;
  id?: any;
  key?: string;
  life?: number;
  sticky?: boolean;
  closable?: boolean;
  data?: any;
  icon?: string;
  contentStyleClass?: string;
  styleClass?: string;
  closeIcon?: string;
}
