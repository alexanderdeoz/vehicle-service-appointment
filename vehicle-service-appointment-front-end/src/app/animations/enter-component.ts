import {animate, state, style, transition, trigger,} from '@angular/animations';

/**
 * Anima la entrada de un componente, primero estará con opacity = 0, luego de 300 ms a 1
 */
export const enterComponent = trigger('enterComponent', [
  state(
    'void',
    style({
      width: '100%',
      transitionProperty: 'all',
      transitionTimingFunction: 'ease',
    }),
  ),
  transition(':enter', [
    style({ opacity: 0, position: 'relative' }),
    animate('250ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1, position: 'absolute' }),
    animate('250ms', style({ opacity: 0 })),
  ]),
]);
