import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[compareDateStartGreaterThanDateEnd]',
  standalone: true,
})
export class CompareDateGreaterThanStartDirective {
  nativeElement: any;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {
    this.nativeElement = this.elementRef.nativeElement;
  }

  public _dateStart: Date = new Date();

  @Input() set dateStart(value: Date) {
    this._dateStart = value;
    this.setMessage();
  }

  public _dateEnd: Date = new Date();

  @Input() set dateEnd(value: Date) {
    this._dateEnd = value;
    this.setMessage();
  }

  private _touched: boolean = false;

  @Input() set touched(value: boolean) {
    this._touched = value;
    this.setMessage();
  }

  private _dirty: boolean = false;

  @Input() set dirty(value: boolean) {
    this._dirty = value;
    this.setMessage();
  }

  private _isInfinity: boolean = false;

  @Input() set isInfinity(value: boolean) {
    this._isInfinity = value;
    this.setMessage();
  }

  private setMessage(): void {
    if (this._touched || this._dirty) {
      if (this._dateStart >= this._dateEnd && !this._isInfinity) {
        this.nativeElement.innerText =
          'La fecha de inicio no debe ser mayor o igual a la de finalización';
        this.renderer.removeClass(this.nativeElement, 'hidden');
        this.renderer.addClass(this.nativeElement, 'text-red-700');
        this.renderer.addClass(this.nativeElement, 'px-3');
        this.renderer.addClass(this.nativeElement, 'py-1');
        this.renderer.addClass(this.nativeElement, 'rounded');
        this.renderer.addClass(this.nativeElement, 'w-full');
        this.renderer.addClass(this.nativeElement, 'flex');
      } else if (!this._isInfinity) {
        this.renderer.addClass(this.nativeElement, 'hidden');
        this.renderer.removeClass(this.nativeElement, 'text-red-700');
        this.renderer.removeClass(this.nativeElement, 'px-3');
        this.renderer.removeClass(this.nativeElement, 'py-1');
        this.renderer.removeClass(this.nativeElement, 'rounded');
        this.renderer.removeClass(this.nativeElement, 'w-full');
        this.renderer.removeClass(this.nativeElement, 'flex');
      }
    }
  }
}
