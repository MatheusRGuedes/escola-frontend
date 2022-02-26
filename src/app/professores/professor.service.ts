import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GenericService } from '../shared/generic-service';
import { Professor } from '../shared/models/professor.model';

//https://github.com/GSeima/Hotel-Front/blob/560424fc9788100e4f5d9d97d87b82270639bef9/hotel-front-end/src/app/pages/cliente/cliente.service.ts#L46

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  private genericService :GenericService<Professor>;
  private readonly PROFESSOR_URL :string = `${environment.API_SPRING}professores`;

  constructor(protected http: HttpClient) {
    this.genericService = new GenericService(http, this.PROFESSOR_URL);
  }

  todos() {
    return this.genericService.findAll();
  }

  encontrar(id: number)  {
    return this.genericService.findOne(id);
  }

  salvar(id :number, professor: Object) {
    return this.genericService.save(id, professor);
  }

  excluir(professor :Professor) {
    return this.genericService.delete(professor.id);
  }

  excluirFormacao(id :number, idFormacao :number) {
    return this.http.delete(`${this.PROFESSOR_URL}/${id}/formacoes/${idFormacao}`);
  }

  buscar(params :HttpParams) {
    return this.http.get<Professor[]>(`${this.PROFESSOR_URL}/buscar`, { params });
  }
}