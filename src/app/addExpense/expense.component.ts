import { Component, Input, OnInit} from '@angular/core';
import { UserService } from '../_services';
import { Expenses, Expense, ExpenseDetails } from '../_models/expenses';
import { FormBuilder, FormControl ,FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.sass']
})
export class ExpenseComponent implements OnInit {

  expenseForm: FormGroup;
  @Input() expenseResponse: any;
  expenses = <Expenses> {};
  expense = <Expense> {};
  expenseDetail = <ExpenseDetails> {};
  newExpenseType: any = {};
  submitted = true;
  loading = false;
  error = '';

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}
  
  ngOnInit() {
    this.expenseForm = this.formBuilder.group({
      expenseDetails: this.formBuilder.array([this.initExpenseDetails()])
    })
  }

  initExpenseDetails(): FormGroup {
    return this.formBuilder.group({
      type: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  get expenseDetails(): FormArray {
    return <FormArray>this.expenseForm.get('expenseDetails')
  }

  getControls() {
    return (this.expenseForm.get('expenseDetails') as FormArray)['controls'];
  }

  // create new expense row
  newExpenseEntry() {
    this.expenseDetails.push(this.initExpenseDetails()); 
  }

  // delete expense row
  deleteExpenseRow(index) {
    const control = <FormArray>this.expenseForm.get('expenseDetails');
    control.removeAt(index);
  }

  // create new expense entry
  createExpense() {

    if (this.expenseForm.invalid) {
      this.submitted = false;
      this.error = "All fields are required";
      this.loading = false;
      return;
    }
    
    let exp = this.expenseResponse.expense;
    let max = 0;
    exp.forEach(exp => {
      if (exp.expenseId > max) {
        max = exp.expenseId;
      }
    });
    
    this.expense.expenseId = max + 1;
    this.expense.createdDate = new Date();
    this.expense.expenseStatus = "Submitted";
    this.expenses.id = this.expenseResponse.id;
    this.expenses.firstName = this.expenseResponse.firstName;
    this.expenses.lastName = this.expenseResponse.lastName;
    
    exp.push({
      expenseId: this.expense.expenseId,
      createdDate: this.expense.createdDate,
      expenseStatus: this.expense.expenseStatus,
      expenseDetails: this.expenseForm.value.expenseDetails
    });

    this.expenses.expense = exp;
    let requestObject;
    requestObject = {
      id: this.expenses.id,
      firstName: this.expenses.firstName,
      lastName: this.expenses.lastName,
      expense: this.expenses.expense
    };

    // call to api to update new expense
    this.userService.createExpense(requestObject).subscribe((res) => {});

    this.submitted = true;
    this.error = '';
    this.expenseForm.reset();
    return true;
  }

}
