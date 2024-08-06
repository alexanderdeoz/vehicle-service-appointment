import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitiesFromSystemFormComponent } from './entities-from-system-form.component';

describe('EntitiesFromSystemFormComponent', () => {
  let component: EntitiesFromSystemFormComponent;
  let fixture: ComponentFixture<EntitiesFromSystemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntitiesFromSystemFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EntitiesFromSystemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
