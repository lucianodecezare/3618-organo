import { TestBed } from '@angular/core/testing';
import { GeneroLiterario, Livro } from '../componentes/livro/livro';
import { livros } from '../mock-livros';
import { ErroGeneroLiterario, LivroService } from './livro.service';

describe('LivroService', () => {
  let service: LivroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LivroService],
    });

    service = TestBed.inject<LivroService>(LivroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new book', () => {
    const newBook: Livro = {
      autoria: 'Autor Desconhecido(a)',
      classificacao: 5,
      dataLeitura: '2024-04-19',
      genero: { id: 'romance', value: 'Romance' },
      imagem: 'http://example.com/cover.jpg',
      titulo: 'Novo Livro',
    };

    service.adicionarLivro(newBook);

    const booksByGender = service.obterLivrosPorGenero('romance');

    expect(booksByGender).toContain(newBook);
  });

  it('should get the books by gender', () => {
    const booksByGender = service.obterLivrosPorGenero('romance');
    const expectedBooks = livros.filter((book: Livro) => {
      return book.genero.id === 'romance';
    });

    expect(booksByGender).toEqual(expectedBooks);
  });

  it('should initialize gender correctly', () => {
    const genders: GeneroLiterario[] = [
      { id: 'romance', value: 'Romance' },
      { id: 'misterio', value: 'Mistério' },
      { id: 'fantasia', value: 'Fantasia' },
      { id: 'ficcao-cientifica', value: 'Ficção Científica' },
      { id: 'tecnicos', value: 'Técnicos' },
    ];

    expect(service.generos).toEqual(genders);
  });

  it('should throw error when adding a book with unknow gender', () => {
    const newBook: Livro = {
      autoria: 'Autor Desconhecido(a)',
      classificacao: 5,
      dataLeitura: '2024-04-19',
      genero: { id: 'random', value: 'random' },
      imagem: 'http://example.com/cover.jpg',
      titulo: 'Novo Livro',
    };

    expect(() => service.adicionarLivro(newBook)).toThrow(ErroGeneroLiterario);
  });
});
