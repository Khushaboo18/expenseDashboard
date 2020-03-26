import { Injectable, EventEmitter} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { Expenses, Expense, ExpenseDetails } from '../_models/expenses';

@Injectable({ providedIn: 'root' })
export class UserService {

  existingExpense: any;
  userId: any;

  constructor(private http: HttpClient) { }

  getCurrentUser() {
    let currentUser = JSON.parse(localStorage.currentUser);
    return this.userId = currentUser.id;
  }
 
    // get all users from api 
  getAll() {
    return this.http.get<User[]>(`${environment.serverUrl}/users`);
    }

    // get all expenses of a user
  getExpenses() {
    this.getCurrentUser();
    return this.http.get(`${environment.serverUrl}/user/${this.userId}`);
    }

    // create new expense for a user
  createExpense(Expense: Expenses[]) {
    this.getCurrentUser();
    return this.http.put(`${environment.serverUrl}/user/${this.userId}`, Expense);
    }
}
