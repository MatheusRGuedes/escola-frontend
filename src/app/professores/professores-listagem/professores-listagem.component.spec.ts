import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessoresListagemComponent } from './professores-listagem.component';

describe('ProfessoresListagemComponent', () => {
  let component: ProfessoresListagemComponent;
  let fixture: ComponentFixture<ProfessoresListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessoresListagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessoresListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
