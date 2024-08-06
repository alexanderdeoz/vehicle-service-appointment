import {
  animate,
  animateChild,
  group,
  keyframes,
  query,
  stagger,
  style,
  transition,
  trigger,
} from "@angular/animations";

/**
 * Anima las transiciones entre rutas.
 */
export const routeAnimationsOpacity = trigger("routeAnimations", [
  transition("* => *", [
    query(
      ":enter",
      stagger("300ms", [
        style({
          position: "relative",
          width: "100%",
        }),
        animate(
          "300ms ease-in",
          keyframes([style({ opacity: 0 }), style({ opacity: 1 })]),
        ),
      ]),
      { optional: true },
    ),
    query(
      ":leave",
      stagger("300ms", [
        style({
          position: "absolute",
          width: "100%",
        }),
        animate(
          "300ms ease-in",
          keyframes([style({ opacity: 1 }), style({ opacity: 0 })]),
        ),
      ]),
      { optional: true },
    ),
  ]),
]);
