import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { Expenses, Expense, ExpenseDetails } from '../_models/expenses';

describe('UserService', () => {
  let userService: UserService;
  let httpMock: HttpTestingController;
 
  beforeAll(() => {
    let user = { id: 1, username: 'khushaboo', password: 'admin@123', firstName: 'Khushaboo', lastName: 'Rani' };
    localStorage.setItem('currentUser', JSON.stringify(user));
  });

  beforeEach(() => {
    
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        UserService
      ],
    });

    userService = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);  
  });

  afterAll(() => {
    localStorage.removeItem('currentUser');
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it(`should fetch users`, async(inject([HttpTestingController, UserService],
    (httpClient: HttpTestingController, userService: UserService) => {

      const userItem = [
        {
          id: 1,
          username: 'khushaboo',
          password: 'admin@123',
          firstName: 'Khushaboo',
          lastName: 'Rani',
          token: `fake-jwt-token`
        }
      ];

      userService.getAll()
        .subscribe((user: any) => {
          expect(user).toEqual(userItem);
          expect(user.length).toBe(1);
        });

      let req = httpMock.expectOne('http://localhost:4200/users');
      expect(req.request.method).toBe("GET");

      req.flush(userItem);
      httpMock.verify();

    })));

  it(`should fetch existing expenses`, async(inject([HttpTestingController, UserService],
    (httpClient: HttpTestingController, userService: UserService) => {

      const expenseItem = [
        {
          "id": 1,
          "firstName": "Khushaboo",
          "lastName": "Rani",
          "expense": [
            {
              "expenseId": 1001,
              "createdDate": "2020-03-23T19:36:31.994Z",
              "expenseStatus": "Submitted",
              "expenseDetails": [
                {
                  "date": "10-03-2020",
                  "type": "Hotel",
                  "description": "Vander valk Hotel Eindhoven",
                  "amount": "150"
                },
                {
                  "date": "10-03-2020",
                  "type": "Parking",
                  "description": "Vander valk Hotel Eindhoven Parking",
                  "amount": "10"
                }
              ]
            }
           ]
        }
      ];


      userService.getExpenses()
        .subscribe((expense: any) => {
          expect(expense).toEqual(expenseItem);
          expect(expense.length).toBe(1);
        });

      let req = httpMock.expectOne('http://localhost:4200/user/1');
      expect(req.request.method).toBe("GET");

      req.flush(expenseItem);
      httpMock.verify();

    })));

  it('should add an expense and return it', () => {
    
      const newExpense: Expenses[] = [{
      "id": 1,
      "firstName": "Khushaboo",
      "lastName": "Rani",
      "expense": [
        {
          "expenseId": 1001,
          "createdDate": new Date(Date.now()),
          "expenseStatus": "Submitted",
          "expenseDetails": [
            {
              "date": new Date("10-03-2020"),
              "type": "Hotel",
              "description": "Vander valk Hotel Eindhoven",
              "amount": "150"
            },
            {
              "date": new Date("10-03-2020"),
              "type": "Parking",
              "description": "Vander valk Hotel Eindhoven Parking",
              "amount": "10"
            }
          ]
        }]
    }];

    let id;
    newExpense.forEach(exp => {
      id = exp.id;
    });

    userService.createExpense(newExpense).subscribe(
      data => expect(data).toEqual(newExpense, 'should return the expense'),
      fail
    );

    let req = httpMock.expectOne('http://localhost:4200/user/1');
    expect(req.request.method).toBe("PUT");
    expect(req.request.body).toEqual(newExpense);

  });
});
