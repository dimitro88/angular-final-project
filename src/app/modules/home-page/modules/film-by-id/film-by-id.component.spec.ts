import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmByIdComponent } from './film-by-id.component';

describe('FilmByIdComponent', () => {
  let component: FilmByIdComponent;
  let fixture: ComponentFixture<FilmByIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmByIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
