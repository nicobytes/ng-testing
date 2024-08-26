import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToSingalComponent } from './to-singal.component';

describe('ToSingalComponent', () => {
  let component: ToSingalComponent;
  let fixture: ComponentFixture<ToSingalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToSingalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToSingalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
