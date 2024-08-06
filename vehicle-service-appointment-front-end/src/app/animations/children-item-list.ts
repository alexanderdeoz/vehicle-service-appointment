import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

/**
 * Cuando se quiera animar la altura de una lista, aplicar a elemento <ul>
 */
export const childrenItemList = trigger("children", [
  state(
    "collapsed",
    style({
      height: "0",
    }),
  ),
  state(
    "expanded",
    style({
      height: "*",
    }),
  ),
  transition(
    "collapsed <=> expanded",
    animate("400ms cubic-bezier(0.86, 0, 0.07, 1)"),
  ),
]);
