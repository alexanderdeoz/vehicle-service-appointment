import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsMessageService {
  public get fieldRequired(): string {
    return 'El campo es obligatorio.';
  }

  public get fieldEmail(): string {
    return 'Correo electrónico no válido.';
  }

  public get fieldPattern() {
    return `No cumple con el formato.`;
  }

  public get fieldIdentification() {
    return `No cumple con el formato de una cédula Ecuatoriana.`;
  }

  public get fieldNoPasswordMatch(): string {
    return 'Las contraseñas no coinciden.';
  }

  public get fieldUserNotAvailable(): string {
    return 'Este usuario ya se encuentra registrado.';
  }

  public get fieldUserAvailable(): string {
    return 'Usuario está disponible.';
  }

  public get fieldEmailNotAvailable(): string {
    return 'Este correo electrónico no está disponible.';
  }

  public get fieldPhoneNotAvailable(): string {
    return 'Este teléfono no está disponible.';
  }

  public get fieldDateValid(): string {
    return 'No es una fecha válida.';
  }

  public fieldMinLength(errors: ValidationErrors) {
    return `Debe contener como mínimo ${errors['minlength']['requiredLength']} caracteres.`;
  }

  public fieldMaxLength(errors: ValidationErrors): string {
    return `Debe contener como máximo ${errors['maxlength']['requiredLength']} caracteres.`;
  }

  public fieldMin(errors: ValidationErrors) {
    return `Numero mínimo permitido es ${errors['min']['min']}.`;
  }

  public fieldMax(errors: ValidationErrors): string {
    return `Numero máximo permitido es ${errors['max']['max']}.`;
  }

  public fieldDateMax(errors: ValidationErrors): string {
    return `La fecha ${errors['dateMax']['actualDate']} no puede ser mayor a ${errors['dateMax']['requiredDate']}.`;
  }

  public fieldDateMin(errors: ValidationErrors): string {
    return `La fecha ${errors['dateMin']['actualDate']} no puede ser menor a ${errors['dateMin']['requiredDate']}.`;
  }

  public fieldDateGreaterThanStart(errors: ValidationErrors): string {
    return `La fecha `;
  }

  public fieldTimeMin(_errors: ValidationErrors) {
    return _errors['message'] ?? `${_errors['minTime']} horas mínimo`;
  }

  public fieldCustomIdentification(_errors: ValidationErrors) {
    return _errors['message'];
  }
}
