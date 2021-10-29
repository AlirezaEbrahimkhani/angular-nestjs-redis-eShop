import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationRendererComponent } from './information-renderer.component';

describe('InformationRendererComponent', () => {
  let component: InformationRendererComponent;
  let fixture: ComponentFixture<InformationRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
