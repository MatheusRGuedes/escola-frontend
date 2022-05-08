import { Component, Input, OnInit } from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';
import { ConsultaCepService } from './consulta-cep.service';

@Component({
  selector: 'endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {

  @Input('group') 
  form :FormGroup = new FormGroup({});

  public listaUfs = [
    {descricao: "Rondônia", codigo: "RO"},
	  {descricao: "Acre", codigo: "AC"},
	  {descricao: "Amazonas", codigo: "AM"},
    {descricao: "Rorâima", codigo:"RR"},
	  {descricao: "Pará", codigo: "PA"},
	  {descricao: "Amapá", codigo: "AP"},
    {descricao: "Tocantíns", codigo: "TO"},
	  {descricao: "Maranhão", codigo: "MA"},
    {descricao: "Piauí", codigo: "PI"},
    {descricao: "Ceará", codigo: "CE"},
    {descricao: "Rio Grande do Norte", codigo: "RN"},
    {descricao: "Paraíba", codigo: "PB"},
    {descricao: "Pernambuco", codigo: "PE"},
    {descricao: "Alagoas", codigo: "AL"},
    {descricao: "Sergipe", codigo: "SE"},
    {descricao: "Bahia", codigo: "BA"},
    {descricao: "Minas Gerais", codigo: "MG"},
    {descricao: "Espirito Santo", codigo: "ES"},
    {descricao: "Rio de Janeiro", codigo: "RJ"},
    {descricao: "São Paulo", codigo: "SP"},
    {descricao: "Paraná", codigo: "PR"},
    {descricao: "Santa Catarina", codigo: "SC"},
    {descricao: "Rio Grande do Sul", codigo: "RS"},
    {descricao: "Mato Grosso do Sul", codigo: "MS"},
    {descricao: "Mato Grosso", codigo: "MT"},
    {descricao: "Goiás", codigo: "GO"},
    {descricao: "Distrito Federal", codigo: "DF"}
  ];

  constructor(private service :ConsultaCepService) { }

  ngOnInit(): void { }

  public get cep() :FormControl {
    return this.form.get('cep') as FormControl;
  }
  public get uf() :FormControl {
    return this.form.get('uf') as FormControl;
  }

  consultaCep() {
    if (this.cep.valid) {
      this.service.consultaCep(this.cep.value)
        .subscribe(response => {

          console.log(response);

          this.form.patchValue({
            "logradouro": response['logradouro'],
            "bairro": response["bairro"],
            "cidade": response["localidade"],
            "uf": response['uf']
          });
        });
    }
  }

  campoInvalido(campo :string) : boolean | undefined {
    return (
      !this.form.get(campo)?.valid && this.form.get(campo)?.dirty
    );
  }
}
