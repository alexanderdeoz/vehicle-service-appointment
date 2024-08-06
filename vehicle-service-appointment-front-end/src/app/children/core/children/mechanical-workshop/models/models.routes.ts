import { Routes } from '@angular/router';
import { ModelRoute } from '@app/shared/enum';
import { ModelListComponent } from '@app/children/core/children/mechanical-workshop/models/children/model-list/model-list.component';
import { ModelFormComponent } from '@app/children/core/children/mechanical-workshop/models/children/model-form/model-form.component';

export const ModelsRoutes: Routes = [
  {
    path: ModelRoute.list,
    component: ModelListComponent,
  },
  {
    path: ModelRoute.create,
    component: ModelFormComponent,
  },
  {
    path: ModelRoute.editWithSuffix,
    component: ModelFormComponent,
  },
];
