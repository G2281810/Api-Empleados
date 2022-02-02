import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModEmpleadosComponent } from './mod-empleados.component';

describe('ModEmpleadosComponent', () => {
  let component: ModEmpleadosComponent;
  let fixture: ComponentFixture<ModEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModEmpleadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
