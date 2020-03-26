import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ExistingExpenseComponent } from './index';

describe('ExistingExpenseComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        ExistingExpenseComponent
      ],
      providers: []
    }).compileComponents();

  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ExistingExpenseComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
