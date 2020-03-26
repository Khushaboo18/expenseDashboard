export class Expenses{     
  id: number;
  expense: Expense [];
  firstName: string;
  lastName: string;
  
}

export class Expense {
  createdDate: Date;
  expenseStatus: string;
  expenseDetails: ExpenseDetails [];
  expenseId: number;
}

export class ExpenseDetails {
  date: Date;
  type: string;
  description: string;
  amount: string;
}


