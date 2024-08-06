import { Component, DestroyRef, OnInit } from '@angular/core';
import { CoreHttpService } from '@app/children/core/services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DataDashboard } from '@app/children/core/models';
import { GalleriaModule } from 'primeng/galleria';
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [GalleriaModule, CardModule, RadioButtonModule, CheckboxModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  public dataDashboard: DataDashboard = {};
  images: any[] | undefined = [
    {
      itemImageSrc:
        'https://www.usnews.com/object/image/00000191-0014-dec1-afb3-28fd8ee80000/01-2023-acura-integra-a-spec.jpg?update-time=1722283232504&size=responsiveGallery',
      title: 'Car 1',
      alt: 'subtitle',
    },
    {
      itemImageSrc:
        'https://www.usnews.com/object/image/00000190-f084-dcb0-a5b9-f7ced1e10000/2024-honda-civic-sedan-sport.jpg?update-time=1722022154400&size=responsiveGallery',
      title: 'Car 2',
      alt: 'subtitle',
    },
    {
      itemImageSrc:
        'https://www.usnews.com/object/image/00000190-2d47-d53c-aff7-bdcfefbd0000/27-2025-honda-cr-v-efcev-1.jpg?update-time=1718746606762&size=responsiveGallery',
      title: 'Car 3',
      alt: 'subtitle',
    },
    {
      itemImageSrc:
        'https://www.usnews.com/object/image/00000191-001a-dec1-afb3-28fb775b0000/22117-2025-seltos.jpg?update-time=1722283620026&size=responsiveGallery',
      title: 'Car 4',
      alt: 'subtitle',
    },
    {
      itemImageSrc:
        'https://www.usnews.com/object/image/00000190-4bfb-d86e-a59a-cffb8c2c0000/hero-2025-lexus-nx-350-fsport-1372.jpg?update-time=1719261694556&size=responsiveGallery',
      title: 'Car 5',
      alt: 'subtitle',
    },
    {
      itemImageSrc:
        'https://www.usnews.com/object/image/0000018e-b584-dea1-adef-f5f7dad60001/01-2025-ram-1500-angular-front-jmv.JPG?update-time=1712442411786&size=responsiveGallery',
      title: 'Car 6',
      alt: 'subtitle',
    },
    {
      itemImageSrc:
        'https://www.usnews.com/object/image/00000191-0017-da2c-a99d-6d1742d10001/23my-outback-1.jpg?update-time=1722283409635&size=responsiveGallery',
      title: 'Car 7',
      alt: 'subtitle',
    },
    {
      itemImageSrc:
        'https://www.usnews.com/object/image/00000190-4b28-dd37-a1dd-dbecc1430001/01-2025-toyota-camry-angular-front-jmv.JPG?update-time=1719248017898&size=responsiveGallery',
      title: 'Car 8',
      alt: 'subtitle',
    },
    {
      itemImageSrc:
        'https://cars.usnews.com/static/images/Auto/custom/15256/2024_Acura_Integra_Angular_Front_1.jpg',
      title: 'Car 9',
      alt: 'subtitle',
    },
  ];

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly coreHttpService: CoreHttpService,
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.coreHttpService
      .dataDashboard()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (value) => {
          if (value.body?.data) {
            this.dataDashboard = value.body?.data ?? {};
          }
        },
      });
  }
}
