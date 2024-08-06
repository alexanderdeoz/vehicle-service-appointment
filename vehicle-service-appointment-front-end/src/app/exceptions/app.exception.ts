import { MessageModel } from '@app/models';

export interface AppException extends Error {
  readonly error?: MessageModel;
  readonly statusCode?: number;
}
