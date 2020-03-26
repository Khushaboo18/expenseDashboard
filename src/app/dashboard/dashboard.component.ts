import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../_models/user';
import { UserService} from '../_services';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  existingExpense: any;

    constructor(private userService: UserService) { }

    ngOnInit() {
      this.userService.getAll().pipe(first()).subscribe(users => {
        this.users = users;
      });
        this.userService.getExpenses().subscribe(data => {
        this.existingExpense = data;
      });
    }
}
