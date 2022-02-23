import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellPage } from './sell.page';

describe('SellPage', () => {
  let component: SellPage;
  let fixture: ComponentFixture<SellPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
