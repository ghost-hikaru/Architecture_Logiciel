import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifInfoComponent } from './modif-info.component';

describe('ModifInfoComponent', () => {
  let component: ModifInfoComponent;
  let fixture: ComponentFixture<ModifInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
