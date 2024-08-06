import { Component, OnInit } from '@angular/core';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { LoadingService } from '@app/services/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { enterComponent } from '@app/animations';

@Component({
  selector: 'app-main-loading-mask',
  standalone: true,
  animations: [enterComponent],
  template: `
    <div
      @enterComponent
      *ngIf="loading"
      class="fixed h-screen w-screen flex lg:flex-row flex-column-reverse justify-content-center align-items-center"
      style="z-index: 10000"
    >
      <div class="absolute h-screen w-screen opacity-80 surface-0"></div>
      <div class="flex flex-column text-center z-1">
        <p-progressSpinner></p-progressSpinner>
        <p>Cargando...</p>
      </div>
    </div>
  `,
  imports: [NgOptimizedImage, NgIf, ProgressSpinnerModule],
})
export class MainLoadingMaskComponent implements OnInit {
  public loading: boolean = true;

  constructor(public readonly loadingService: LoadingService) {}

  ngOnInit(): void {
    this.listenToLoading();
  }

  private listenToLoading() {
    this.loadingService.loadingSub.subscribe({
      next: (value) => {
        this.loading = value;
      },
    });
  }
}
