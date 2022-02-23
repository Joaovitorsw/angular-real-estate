import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewPropertyPage } from './view-property.page';

describe('ViewpropertyPage', () => {
  let component: ViewPropertyPage;
  let fixture: ComponentFixture<ViewPropertyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPropertyPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPropertyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
