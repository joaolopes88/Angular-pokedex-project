import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaypokemonComponent } from './displaypokemon.component';

describe('DisplaypokemonComponent', () => {
  let component: DisplaypokemonComponent;
  let fixture: ComponentFixture<DisplaypokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplaypokemonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaypokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
