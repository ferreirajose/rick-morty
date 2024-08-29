import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HomeService } from './home.service';
import { AllCharacter } from '@shared/types/all-character';

describe('HomeService', () => {
  let service: HomeService;
  let httpMock: HttpTestingController;
  const apiUrl = 'https://rickandmortyapi.com/api/character';

  const mockAllCharacter: AllCharacter = {
    info: {
      next: `${apiUrl}?page=2`,
      count: 0,
      pages: 0,
      prev: null
    },
    results: [
      {
        "id": 2,
        "name": "Morty Smith",
        "status": "Alive",
        "species": "Human",
        "type": "",
        "gender": "Male",
        "origin": {
          "name": "Earth",
          "url": "https://rickandmortyapi.com/api/location/1"
        },
        "location": {
          "name": "Earth",
          "url": "https://rickandmortyapi.com/api/location/20"
        },
        "image": "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
        "episode": [
          "https://rickandmortyapi.com/api/episode/1",
          "https://rickandmortyapi.com/api/episode/2",
        ],
        "url": "https://rickandmortyapi.com/api/character/2",
        "created": "2017-11-04T18:50:21.651Z"
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HomeService]
    });

    service = TestBed.inject(HomeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load more characters and update nextPage', () => {
    service.loadMoreCharacters().subscribe(response => {
      expect(response).toEqual(mockAllCharacter);
      expect(service['nextPage']).toBe(`${apiUrl}?page=2`);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockAllCharacter);
  });

  it('should return empty results when nextPage is null', () => {
    service['nextPage'] = null;

    service.loadMoreCharacters().subscribe(response => {
      expect(response.results).toEqual([]);
      expect(response.info.next).toBeNull();
    });

    httpMock.expectNone(apiUrl);
  });

  it('should search characters by name', () => {
    const characterName = 'Morty Smith';
    service.searchCharacters(characterName).subscribe(characters => {
      expect(characters).toEqual(mockAllCharacter.results);
    });

    const req = httpMock.expectOne(`${apiUrl}/?name=${characterName}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAllCharacter);
  });

  xit('should handle search error and load initial characters', () => {
    const characterName = 'Unknown';
    const errorResponse = { status: 404, statusText: 'Not Found' };

    service.searchCharacters(characterName).subscribe(characters => {
      expect(characters).toEqual(mockAllCharacter.results);
    });

    const searchReq = httpMock.expectOne(`${apiUrl}/?name=${characterName}`);
    searchReq.flush(null, errorResponse);

    const loadInitialReq = httpMock.expectOne(apiUrl);
    expect(loadInitialReq.request.method).toBe('GET');
    loadInitialReq.flush(mockAllCharacter);
  });

  it('should reset nextPage to the initial API URL', () => {
    service.resetNextPage();
    expect(service['nextPage']).toBe(apiUrl);
  });
});
