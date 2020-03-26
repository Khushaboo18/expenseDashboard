import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ExpenseComponent } from './index';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../_services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

describe('ExpenseComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [
        ExpenseComponent
      ],
      providers: [UserService]
    }).compileComponents();

  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ExpenseComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  it('user service should be injected', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
