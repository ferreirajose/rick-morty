import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CharacterService } from './character.service';

describe('CharacterService', () => {
  let service: CharacterService;
  let httpMock: HttpTestingController;
  const mockApiUrl = 'https://rickandmortyapi.com/api/character';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CharacterService]
    });

    service = TestBed.inject(CharacterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch characters from the API', () => {
    const mockResponse = {
      results: [
        {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: { name: 'Earth', url: '' },
          location: { name: 'Earth', url: '' },
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          episode: [],
          url: '',
          created: ''
        }
      ],
      info: {
        count: 1,
        pages: 1,
        next: null,
        prev: null
      }
    };

    service.getCharacters(mockApiUrl).subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(response.results.length).toBe(1);
      expect(response.results[0].name).toBe('Rick Sanchez');
    });

    const req = httpMock.expectOne(mockApiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
