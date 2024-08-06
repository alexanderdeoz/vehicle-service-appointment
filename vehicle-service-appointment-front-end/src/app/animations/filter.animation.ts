import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from "@angular/animations";

/**
 * Diseñado para aplicar a una ul que cambia de items, por ejemplo por filtrar
 */
export const filterAnimation = trigger("filterAnimation", [
  transition(":enter, * => 0, * => -1", []),
  transition(":increment", [
    query(
      ":enter",
      [
        style({ position: "absolute", opacity: 0 }),
        stagger(50, [animate("100ms ease-out", style({ opacity: 1 }))]),
      ],
      { optional: true },
    ),
  ]),
  transition(":decrement", [
    query(":leave", [
      style({ position: "absolute", opacity: 1 }),
      stagger(50, [animate("100ms ease-out", style({ opacity: 0 }))]),
    ]),
  ]),
]);
