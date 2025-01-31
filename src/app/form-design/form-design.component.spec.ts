import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDesignComponent } from './form-design.component';

describe('FormDesignComponent', () => {
  let component: FormDesignComponent;
  let fixture: ComponentFixture<FormDesignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormDesignComponent]
    });
    fixture = TestBed.createComponent(FormDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
