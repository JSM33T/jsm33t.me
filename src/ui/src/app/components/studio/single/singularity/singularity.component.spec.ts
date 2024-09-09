import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularityComponent } from './singularity.component';

describe('SingularityComponent', () => {
  let component: SingularityComponent;
  let fixture: ComponentFixture<SingularityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingularityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingularityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
