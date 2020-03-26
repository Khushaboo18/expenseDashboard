import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';


describe('UserService', () => {
  let authenticationService: AuthenticationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AuthenticationService
      ],
    });

    authenticationService = TestBed.get(AuthenticationService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(authenticationService).toBeTruthy();
  });

  it('should add an expense and return it', () => {
    const user = {
        username: "admin",
        password: "admin"
    };
    authenticationService.login(user.username, user.password).subscribe(
      data => expect(data).toEqual(user, 'should return the expense'),
      fail
    );

    let req = httpMock.expectOne('http://localhost:4200/users/authenticate');
    expect(req.request.method).toBe("POST");
    expect(req.request.body).toEqual(user);

  });
});
