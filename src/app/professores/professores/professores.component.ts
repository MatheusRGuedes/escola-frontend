import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DateValidators } from 'src/app/shared/validators/data-validator';
import { AlertService } from '../../shared/components/alert/alert.service';
import { Endereco } from '../../shared/models/endereco';
import { Sexo } from '../../shared/models/enums/sexo';
import { Formacao, Professor } from '../../shared/models/professor.model';
import { ProfessorService } from '../professor.service';

/**
 * pesquisar 
 *  --> aguardar um observable ser realizado
 *  --> desinscrição ao destruir o componente, usando pipe e o take 
 *      - https://qastack.com.br/programming/35042929/is-it-necessary-to-unsubscribe-from-observables-created-by-http-methods
 *
 */

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css']
})
export class ProfessoresComponent implements OnInit {

  form :FormGroup = new FormGroup({});
  editando :Professor = this.novoProfessor();
  urlPath :string = "";

  constructor(public fb :FormBuilder, 
      private professorService :ProfessorService, 
      private alertService: AlertService,
      private routes :ActivatedRoute,
      private router :Router) {

    this.form = fb.group({
      nome: ['', [Validators.required, Validators.maxLength(255)]], 
      sexo: [null, Validators.required],
      dataNascimento: ['', DateValidators.past],
      endereco: fb.group({
        cep: ['', [Validators.required, Validators.minLength(8)]],
        logradouro: ['', Validators.required],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        uf: ['', Validators.compose([Validators.required, Validators.minLength(2)]) ]
      }),
      formacoes: fb.array([])
      //disciplinas: [[]]
    }); 
  }

  ngOnInit(): void {
    //console.log(this.routes);
    this.recuperarProfessor();
    this.ajustaBotoes();
  }

  ajustaBotoes() {
    this.routes.url.subscribe((urlSegment) => {
      this.urlPath = urlSegment[0].path;
    });
  }

  novoProfessor(obj? :Professor) {
    if (obj) {
      return new Professor(obj.id, obj.nome, obj.endereco, obj.formacoes, obj.sexo, obj.dataNascimento)
    } else {
      return new Professor(0, "", new Endereco("", "", "", "", ""), undefined, undefined, undefined);
    }
  }

  recuperarProfessor() {
    var id = this.routes.snapshot.paramMap.get('id');
    if (id) {
      //console.log("Editando: "+id);
      this.professorService.encontrar(Number.parseInt(id))
        .subscribe(obj => {
          this.editando = obj;
          this.preencheForm(this.novoProfessor(obj));
        }, error => {
          this.alertService.error("Erro! Registro não encontrado!");
        });
    }
  }

  private preencheForm(professor :Professor) {
    this.form.patchValue({
      "nome": professor.nome,
      //"salario": professor.salarioFormatado(),
      "sexo": professor.sexo,
      "dataNascimento": professor.dataNascimentoFormatado(),
      "endereco": {
        "cep": professor.endereco.cep,
        "logradouro": professor.endereco.logradouro,
        "bairro": professor.endereco.bairro,
        "cidade": professor.endereco.cidade,
        "uf": professor.endereco.uf
      }
    });
    this.montarFormacoes(professor.formacoes);
  }

  private montarFormacoes(formacoes: Formacao[] | undefined) {
    this.form.setControl('formacoes', new FormArray([]));

    if (formacoes) {
      formacoes.forEach(obj => this.formacoesForm.push(this.criaFormacaoFormGroup(obj)));
    }
  }

  gravar() {
    //console.log(this.form);

    if (this.form.valid) {
      let nome = (this.form.value.nome + "").trim();
      let sexo :Sexo = this.form.get('sexo')?.value;

      let dataNascimento :any = (this.form.get('dataNascimento')?.value + "");
      if (dataNascimento.length == 8) {
        dataNascimento = dataNascimento.substring(4,8) +"-"+ dataNascimento.substring(2,4) +"-"+ dataNascimento.substring(0,2);
      } else if (dataNascimento.length == 10) {
        dataNascimento = dataNascimento.substring(6,10) +"-"+ dataNascimento.substring(3,5) +"-"+ dataNascimento.substring(0,2);
      }

      let endereco :Endereco = this.form.get('endereco')?.value;
      let formacoes :Formacao[] = this.formacoesForm.value;

      const obj = {nome, sexo, dataNascimento, endereco, formacoes};

      //await this.gravaAssincrono({nome, endereco, salario, disciplinas});
      this.professorService.salvar(this.editando.id, obj).subscribe( 
        (success) => {
          this.alertService.success("Professor gravado com sucesso.");
          this.router.navigateByUrl("professores");
        }, (error) => this.alertService.error("Erro ao gravar. Tente novamente mais tarde.")
      );
    } else {
      this.markAllAsDirty(this.form);
    }
  }

  markAllAsDirty(form : FormGroup) {
    //console.log("recurção!");
    Object.keys(form.controls).forEach(campo => {
      //console.log(campo);
      const control = form.get(campo);
      
      if (control instanceof FormGroup) {
        this.markAllAsDirty(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach(group => {
          this.markAllAsDirty(group as FormGroup)
        });
      } else {
        control?.markAsDirty();
      }
    })
  }

  campoInvalido(campo :string) :boolean | undefined {
    return (
      !this.form.get(campo)?.valid && this.form.get(campo)?.dirty
    );
  }
  campoFormacaoInvalido(campo :string, index :number) :boolean | undefined {
    let formGroup :FormGroup = this.formacoesForm.controls[index] as FormGroup;
    if (formGroup) {
      return ( //apresenta msg se digitar e apagar 
        !formGroup.get(campo)?.valid && formGroup.get(campo)?.dirty
      );
    }
    return false;
  }

  limparForm() {
    this.form.reset();
    this.form.setControl('formacoes', new FormArray([]));
    this.editando = this.novoProfessor();
  }

  addFormacao() {
    this.formacoesForm.push(this.criaFormacaoFormGroup());
  }

  private criaFormacaoFormGroup(formacao? :Formacao) :FormGroup {
    return new FormGroup({
      id:   new FormControl(formacao? formacao.id : null),
      nome: new FormControl(formacao? formacao.nome : null, 
        Validators.required),
      tipo: new FormControl(formacao? formacao.tipo || "" : "")
    });
  }
  
  deleteFormacao(indexGroup :number, idFormacao :any) {
    //console.log(idFormacao);
    if (idFormacao) {
      this.professorService.excluirFormacao(this.editando.id, idFormacao)
        .subscribe(ok => { //bem sucedido
          this.removeFormacaoGroup(indexGroup);
          this.alertService.success("Formação excluída com sucesso.");
        }, error => {
          this.alertService.error("Erro ao excluir formação.");
      });
    } else {
      this.removeFormacaoGroup(indexGroup);
    }
  }

  private removeFormacaoGroup(index :number) {
    this.formacoesForm.removeAt(index);
  }

  get nome() :FormControl {
    return this.form.get('nome') as FormControl;
  }
  get dataNascimento() :FormControl {
    return this.form.get('dataNascimento') as FormControl;
  }
  get enderecoGroup() :FormGroup {
    return this.form.get('endereco') as FormGroup;
  }
  get formacoesForm() :FormArray {
    return this.form.get('formacoes') as FormArray;
  }
  getNomeFormacaoControl(index :number) :FormControl {
    return this.formacoesForm.controls[index].get('nome') as FormControl;
  }

  //Função para rastrear/comparar as identidades dos options que podem mudar e os dados não
  //É selecionado a opção se o retorno for true
  //compareFn(p1: Professor, p2: Professor): boolean {
    //console.log(p1 && p2 ? p1.id === p2.id : p1 === p2);
  //  return p1 && p2 ? p1.id === p2.id : p1 === p2;
  //}
}