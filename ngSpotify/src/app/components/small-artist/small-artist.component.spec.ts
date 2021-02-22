import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallArtistComponent } from './small-artist.component';

describe('SmallArtistComponent', () => {
  let component: SmallArtistComponent;
  let fixture: ComponentFixture<SmallArtistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallArtistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
