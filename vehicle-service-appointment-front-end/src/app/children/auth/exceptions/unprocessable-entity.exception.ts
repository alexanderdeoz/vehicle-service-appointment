import { MessageModel } from '@app/models';
import { AppException } from '@app/exceptions';

export class UnprocessableEntityException implements AppException {
  public readonly name = 'UnprocessableEntityException';
  public message: string = '';
  public statusCode: number = 0;

  constructor(public readonly error?: MessageModel) {}
}
