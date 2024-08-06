export interface MessageModel {
  statusCode?: number;
  error?: Object | string;
  severity?:
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | 'help'
    | 'primary'
    | 'secondary'
    | 'contrast'
    | null
    | undefined;
  summary?: string;
  detail?: string;
}
