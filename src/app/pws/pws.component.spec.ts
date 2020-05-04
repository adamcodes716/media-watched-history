import { ApixuService } from './apixu.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PwsComponent } from './pws.component';

describe('PwsComponent', () => {
  let component: PwsComponent;
  let fixture: ComponentFixture<PwsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PwsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PwsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
