import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelListComponent } from './model-list.component';

describe('RoleListComponent', () => {
  let component: ModelListComponent;
  let fixture: ComponentFixture<ModelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
