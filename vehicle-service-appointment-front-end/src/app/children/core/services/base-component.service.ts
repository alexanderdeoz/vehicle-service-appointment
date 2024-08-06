import { FormControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseComponentService {
  public listToForm<T>(
    payload: T[],
    fn: (value: FormGroup, index: number) => void,
  ): void {
    payload?.forEach((d: T, i: number): void => {
      const f = new FormGroup({});
      Object.keys(d as any).forEach((k: string) =>
        f.addControl(k.toString(), new FormControl((d as any)[k])),
      );
      fn(f, i);
    });
  }
}
