import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Directive({
  selector: '[appLabel]',
  standalone: true,
})
export class LabelDirective implements OnInit {
  nativeElement: any;
  @Input() label!: string;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2,
  ) {
    this.nativeElement = this.elementRef.nativeElement;
  }

  private _formField?: FormControl;

  @Input() set formField(fc: FormControl) {
    this._formField = fc;
  }

  @Input() set getValueForLabel(fc: FormControl) {
    fc.valueChanges.subscribe({
      next: (value) => this.setFieldRequired(value),
    });
  }

  ngOnInit(): void {
    this.setFieldRequired(this.label);
  }

  private setFieldRequired(label: string): void {
    if (this._formField?.hasValidator(Validators.required)) {
      this.nativeElement.innerText = label + ' ';
      const i = this.renderer.createElement('i');
      i.innerText = ' * ';
      this.renderer.addClass(i, 'p-error');
      this.renderer.appendChild(this.nativeElement, i);
    } else {
      this.nativeElement.innerText = label;
    }
  }
}
