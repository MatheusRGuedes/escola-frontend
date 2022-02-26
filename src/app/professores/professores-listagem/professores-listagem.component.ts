import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { Professor } from 'src/app/shared/models/professor.model';
import { DateValidators } from 'src/app/shared/validators/data-validator';
import { ProfessorService } from '../professor.service';

@Component({
  selector: 'professores-listagem',
  templateUrl: './professores-listagem.component.html',
  styleUrls: ['./professores-listagem.component.css']
})
export class ProfessoresListagemComponent implements OnInit {

  pageConfig :{paginaAtual? :number, qntddPorPag? :number} = {};
  header :string[] = [];
  props :string[] = [];
  professores :Professor[] = [];
  formPesquisa :FormGroup = new FormGroup({});

  constructor(private service :ProfessorService,
    private alertService :AlertService,
    private router :Router,
    private fb: FormBuilder) { 
      
      this.formPesquisa = fb.group({
        nome: [''],
        dataNascimento: ['', DateValidators.valid],
        cep: ['', Validators.minLength(8)]
      });
  }

  ngOnInit(): void {
    this.pageConfig = {
      qntddPorPag: 10
    };
    this.header = ["Nome", "Data Nascimento", "Endereço", "Sexo", "Formações"];
    this.props = ["nome", "dataNascimento", "endereco", "sexo", "formacoes"];

    this.atualizaTable();
  }

  atualizaTable() {
    this.service.todos().subscribe(
      (result) => { //ok - cria instância para cada obj, pr ter acesso a metodos
        this.professores = 
          result.map(p => new Professor(p.id, p.nome, p.endereco, p.formacoes, p.sexo, p.dataNascimento));
      }, (error) => {
        this.alertService.error('Não foi possível carregar os professores.');
      });
  }

  campoInvalido(campo :string) :boolean | undefined {
    //console.log(this.formPesquisa.get(campo));
    return (
      !this.formPesquisa.get(campo)?.valid && this.formPesquisa.get(campo)?.dirty
    );
  }

  pesquisar() {
    let dataNascimento = this.dataNascimento.value;
 
    if (dataNascimento.value != "" && dataNascimento.length == 8) {
      dataNascimento = dataNascimento.substring(4,8) +"-"+ dataNascimento.substring(2,4) +"-"+ dataNascimento.substring(0,2);
    } 

    const params = new HttpParams()
      .set("nome", this.nome.value)
      .set("dataNascimento", dataNascimento)
      .set("cep", this.cep.value);
    
    if (params.keys().length != 0) {
      this.service.buscar(params).subscribe(
        (response) => {
          this.professores = 
            response.map(obj => new Professor(obj.id, obj.nome, obj.endereco, obj.formacoes, obj.sexo, obj.dataNascimento));
        }, (error) => {
          this.alertService.error("Nenhum registro encontrado.");
          this.atualizaTable();
      });
    } else {
      this.atualizaTable();
    }
  }

  editar(professor :Professor) {
    console.log(professor);
    this.router.navigate([`professores/editar/${professor.id}`]);
  }

  excluir(professor :any) {
    if (confirm("Deseja remover o professor "+professor.nome+" ?")) {
      this.service.excluir(professor).subscribe(
        () => {
          this.atualizaTable();
          this.alertService.success('Professor excluído com sucesso.');
        }, (error) => {
          this.alertService.error('Erro ao excluir o professor. Tente mais tarde.');
        }
      );
    }
  }

  get nome() :FormControl {
    return this.formPesquisa.get('nome') as FormControl;
  }
  get dataNascimento() :FormControl {
    return this.formPesquisa.get('dataNascimento') as FormControl;
  }
  get cep() :FormControl {
    return this.formPesquisa.get('cep') as FormControl;
  }
}
