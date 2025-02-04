import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  /**
   * Contains in-progress loading requests
   */
  loadingMap: Map<string, boolean> = new Map<string, boolean>();

  constructor(private readonly router: Router) {
    this.listenRouter();
  }

  /**
   * Sets the loadingSub property value based on the following:
   * - If loading is true, add the provided url to the loadingMap with a true value, set loadingSub value to true
   * - If loading is false, remove the loadingMap entry and only when the map is empty will we set loadingSub to false
   *
   * This pattern ensures if there are multiple requests awaiting completion, we don't set loading to false before
   * other requests have completed. At the moment, this function is only called from the @link{HttpRequestInterceptor}
   *
   * @param loading {boolean}
   * @param url {string}
   */
  public setLoading(loading: boolean, url: string): void {
    if (!url) {
      throw new Error(
        'The request URL must be provided to the LoadingService.setLoading function',
      );
    }
    if (loading) {
      this.loadingMap.set(url, loading);
      this.loadingSub.next(true);
    } else if (!loading && this.loadingMap.has(url)) {
      this.loadingMap.delete(url);
    }
    if (this.loadingMap.size === 0) {
      this.loadingSub.next(false);
    }
  }

  private listenRouter(): void {
    this.router.events.subscribe({
      next: (value) => {
        if (value instanceof NavigationStart) {
          this.setLoading(true, value.url);
        }
        if (
          value instanceof NavigationEnd ||
          value instanceof NavigationCancel ||
          value instanceof NavigationError
        ) {
          this.setLoading(false, value.url);
        }
      },
    });
  }
}
