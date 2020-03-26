import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { routing } from './app.routing';

import { fakeBackendProvider } from './_helpers';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard';
import { LoginComponent } from './login';
import { ExpenseComponent } from './addExpense';
import { ExistingExpenseComponent } from './existingExpense';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        routing
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        LoginComponent,
        ExpenseComponent,
        ExistingExpenseComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
