import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  Logger,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { IResponseMessageModel } from '@v1/shared/models';
import { HttpExceptionBody } from '@nestjs/common/interfaces/http/http-exception-body.interface';
import { SeverityMessage } from '@v1/shared/enum';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ExceptionsFilter.name);
  }

  catch(exception: unknown, host: ArgumentsHost) {
    console.log(exception);
    this.logger.error(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const _ = ctx.getRequest<Request>();
    const errorResponseHttpModel: IResponseMessageModel = {
      detail: 'Error del servidor',
      summary: exception.toString(),
      statusCode: 500,
    };
    // errorResponseHttpModel.error = JSON.parse(JSON.stringify(exception));
    errorResponseHttpModel.error = exception;
    errorResponseHttpModel.severity = SeverityMessage.error;

    if (exception instanceof HttpException) {
      const { message } = exception.getResponse() as HttpExceptionBody;
      errorResponseHttpModel.detail = exception.toString();
      errorResponseHttpModel.summary = 'Error del Servidor';
      errorResponseHttpModel.statusCode = exception.getStatus();

      if (exception instanceof BadRequestException) {
        errorResponseHttpModel.summary = 'Petición inválida';
        errorResponseHttpModel.detail = message.toString();
      }

      if (exception instanceof UnprocessableEntityException) {
        errorResponseHttpModel.summary = 'Entidad no procesable';
        errorResponseHttpModel.detail = message.toString();
      }

      if (exception instanceof UnauthorizedException) {
        errorResponseHttpModel.summary = 'No autorizado';
        errorResponseHttpModel.detail =
          message.toString() ?? 'No tienes autorización';
      }

      if (exception instanceof NotFoundException) {
        errorResponseHttpModel.summary = 'Recurso no encontrado';
        errorResponseHttpModel.detail = exception.toString();
      }

      if (exception instanceof ForbiddenException) {
        errorResponseHttpModel.summary = 'Prohibido';
        errorResponseHttpModel.detail = message.toString();
      }
    }

    if (exception instanceof QueryFailedError) {
      errorResponseHttpModel.summary = exception.name || 'Consulta SQL fallida';
      errorResponseHttpModel.detail = exception.message;
    }

    if (exception instanceof EntityNotFoundError) {
      errorResponseHttpModel.summary = 'No encontrado';
      errorResponseHttpModel.detail = exception.message;
    }

    if (process.env.DB_PORT == exception['port']) {
      errorResponseHttpModel.summary = 'Conexión rechazada';
      errorResponseHttpModel.detail = `La base de datos principal no esta disponible en ${process.env.DB_HOST}:${process.env.DB_PORT}`;
    }
    response
      .status(errorResponseHttpModel.statusCode)
      .send(errorResponseHttpModel);
  }
}
