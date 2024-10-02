import { forwardRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AvaliacaoEstrelasComponent } from './avaliacao-estrelas.component';

describe('AvaliacaoEstrelasComponent', () => {
  let component: AvaliacaoEstrelasComponent;
  let fixture: ComponentFixture<AvaliacaoEstrelasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AvaliacaoEstrelasComponent],
      providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => AvaliacaoEstrelasComponent),
          multi: true,
        },
      ],
    });

    fixture = TestBed.createComponent(AvaliacaoEstrelasComponent);
    component = fixture.componentInstance;

    component.readOnly = false;
    component.classificacao = 1;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should set value to classification when writeValue called', () => {
    const stars = 3;

    component.writeValue(stars);

    expect(component.classificacao).toBe(stars);
  });

  it('should call onChange when classificar called', () => {
    const spyOnChange = jest.spyOn(component, 'onChange');
    const stars = 3;

    component.readOnly = false;
    component.classificar(stars);

    expect(spyOnChange).toHaveBeenCalled();
  });

  it('should call onTouched when classificar called', () => {
    const spyOnChange = jest.spyOn(component, 'onTouched');
    const stars = 3;

    component.readOnly = false;
    component.classificar(stars);

    expect(spyOnChange).toHaveBeenCalled();
  });

  it('classificar should not work when readOnly is true', () => {
    const spyOnChange = jest.spyOn(component, 'onChange');

    component.readOnly = true;
    component.classificar(3);

    expect(spyOnChange).not.toHaveBeenCalled();
  });

  it('should set readOnly value when setDisabledState called', () => {
    component.setDisabledState(true);

    expect(component.readOnly).toBe(true);

    component.setDisabledState(false);

    expect(component.readOnly).toBe(false);
  });

  it('should ignore invalid values and set classificacao to 1', () => {
    const invalidValues = [
      0,
      '',
      undefined,
      -1,
      null,
      NaN,
      {},
      [],
      6,
      Infinity,
    ];

    invalidValues.forEach((invalidValue) => {
      component.writeValue(invalidValue as any);

      expect(component.classificacao).toBe(1);
    });
  });

  it('should update DOM when classificacao change', () => {
    const stars = 3;

    component.classificar(stars);
    fixture.detectChanges();

    const filledStar = fixture.nativeElement.querySelector('.filled');

    expect(filledStar).toBeTruthy();
  });
});
