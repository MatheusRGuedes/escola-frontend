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
