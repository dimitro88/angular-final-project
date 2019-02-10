import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteFilmsComponent } from './favourite-films.component';

describe('FavouriteFilmsComponent', () => {
  let component: FavouriteFilmsComponent;
  let fixture: ComponentFixture<FavouriteFilmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouriteFilmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteFilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
