import { TestBed, async, inject} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from './index';
import { UserService } from '../_services';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DashboardComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        DashboardComponent
      ],
      providers: [UserService]
    }).compileComponents();

  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  it('user service should be injected', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
