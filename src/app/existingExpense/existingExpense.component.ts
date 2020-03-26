import { Component , Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-existingExpense',
  templateUrl: './existingExpense.component.html',
  styleUrls: ['./existingExpense.component.sass']
})
export class ExistingExpenseComponent implements OnInit {
  
  constructor() {}

  viewDetails: any;
  @Input() existingExpense: any;

  ngOnInit() {}

  // method to view expense details based on expense id
  viewExpenseDetails(id) {
    const details = this.existingExpense.expense;
    for (const value of details) {
      const expId = value.expenseId;
      if (expId === id) {
        this.viewDetails = value.expenseDetails;
        break;
      }
    }
  }
}
