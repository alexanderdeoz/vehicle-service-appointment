import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitiesFromSystemListComponent } from './entities-from-system-list.component';

describe('EntitiesFromSystemListComponent', () => {
  let component: EntitiesFromSystemListComponent;
  let fixture: ComponentFixture<EntitiesFromSystemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntitiesFromSystemListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EntitiesFromSystemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
