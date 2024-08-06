import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ValidatorsMessageService } from '@app/shared/services';

@Directive({
  selector: '[appErrorMessage]',
  standalone: true,
})
export class ErrorMessageDirective {
  nativeElement: any;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private messageService: ValidatorsMessageService,
  ) {
    this.nativeElement = this.elementRef.nativeElement;
  }

  private _errors: ValidationErrors | null | undefined = null;

  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setMessage();
  }

  private _dirty: boolean | undefined = false;

  @Input() set dirty(value: boolean | undefined) {
    this._dirty = value;
    this.setMessage();
  }

  private _touched: boolean | undefined = false;

  @Input() set touched(value: boolean | undefined) {
    this._touched = value;
    this.setMessage();
  }

  private setMessage(): void {
    if (this._touched == true || this._dirty == true) {
      if (this._errors) {
        if (this._errors['required']) {
          this.nativeElement.innerText = this.messageService.fieldRequired;
        } else if (this._errors['requiredTrue']) {
          this.nativeElement.innerText = this.messageService.fieldRequired;
        } else if (this._errors['email']) {
          this.nativeElement.innerText = this.messageService.fieldEmail;
        } else if (this._errors['minlength']) {
          this.nativeElement.innerText = this.messageService.fieldMinLength(
            this._errors,
          );
        } else if (this._errors['maxlength']) {
          this.nativeElement.innerText = this.messageService.fieldMaxLength(
            this._errors,
          );
        } else if (this._errors['min']) {
          this.nativeElement.innerText = this.messageService.fieldMin(
            this._errors,
          );
        } else if (this._errors['max']) {
          this.nativeElement.innerText = this.messageService.fieldMax(
            this._errors,
          );
        } else if (this._errors['pattern']) {
          this.nativeElement.innerText = this.messageService.fieldPattern;
        } else if (this._errors['identification']) {
          this.nativeElement.innerText =
            this.messageService.fieldIdentification;
        } else if (this._errors['NoPasswordMatch']) {
          this.nativeElement.innerText =
            this.messageService.fieldNoPasswordMatch;
        } else if (this._errors['UserNotAvailable']) {
          this.nativeElement.innerText =
            this.messageService.fieldUserNotAvailable;
        } else if (this._errors['UserAvailable']) {
          this.nativeElement.innerText = this.messageService.fieldUserAvailable;
        } else if (this._errors['EmailNotAvailable']) {
          this.nativeElement.innerText =
            this.messageService.fieldEmailNotAvailable;
        } else if (this._errors['PhoneNotAvailable']) {
          this.nativeElement.innerText =
            this.messageService.fieldPhoneNotAvailable;
        } else if (this._errors['dateInvalid']) {
          this.nativeElement.innerText = this.messageService.fieldDateValid;
        } else if (this._errors['dateMax']) {
          this.nativeElement.innerText = this.messageService.fieldDateMax(
            this._errors,
          );
        } else if (this._errors['dateMin']) {
          this.nativeElement.innerText = this.messageService.fieldDateMin(
            this._errors,
          );
        } else if (this._errors['dateStartGreaterThanDateEnd']) {
          this.nativeElement.innerText =
            this.messageService.fieldDateGreaterThanStart(this._errors);
        } else if (this._errors['timeMin']) {
          this.nativeElement.innerText = this.messageService.fieldTimeMin(
            this._errors,
          );
        } else if (this._errors['run']) {
          this.nativeElement.innerText =
            this.messageService.fieldCustomIdentification(this._errors);
        } else {
          this.nativeElement.innerText = this.messageService.fieldTimeMin(
            this._errors,
          );
        }

        this.renderer.removeClass(this.nativeElement, 'hidden');
        this.renderer.addClass(this.nativeElement, 'p-error');
      } else {
        this.renderer.addClass(this.nativeElement, 'hidden');
        this.renderer.removeClass(this.nativeElement, 'p-error');
      }
    }
  }
}
