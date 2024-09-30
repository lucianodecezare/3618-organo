import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CabecalhoComponent } from './cabecalho.component';

describe('CabecalhoComponent', () => {
  let component: CabecalhoComponent;
  let fixture: ComponentFixture<CabecalhoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CabecalhoComponent],
    });

    fixture = TestBed.createComponent(CabecalhoComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should define alt and src properties', () => {
    expect(component.alt).toBeDefined();
    expect(component.src).toBeDefined();
  });

  it('should render content based on src and alt', () => {
    component.src = 'https://example.com/test-image.jpg';
    component.alt = 'Imagem teste';

    expect(component).toMatchSnapshot();
  });
});
