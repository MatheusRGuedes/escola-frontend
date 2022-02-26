import { Endereco } from "./endereco";
import { Sexo } from "./enums/sexo";

// Servir como um modelo de dados para um professor

enum TipoFormacao {
    BACHARELADO = "B", 
	LICENCIATURA = "L", 
	GRADUACAO = "G", 
	POS_GRADUACAO = "P"
}

export interface Formacao {
    id :number;
    nome :string;
    tipo :TipoFormacao;
}

interface ProfessorModel {
    id :number;
    nome :string;
    endereco :Endereco;
    formacoes? :Formacao[];
    sexo? :Sexo;
}

export class Professor implements ProfessorModel {
    id :number;
    nome :string;
    endereco :Endereco;
    formacoes? :Formacao[];
    sexo? :Sexo;
    dataNascimento? :Date;

    constructor(id: number, 
        nome :string, 
        endereco :Endereco, 
        formacoes? :Formacao[], 
        sexo? :Sexo,
        dataNascimento? :Date) 
        {
        this.id = id;
        this.nome = nome;
        this.endereco = new Endereco(endereco.cep, endereco.logradouro, endereco.bairro, endereco.cidade, endereco.uf);
        this.formacoes = formacoes;
        this.sexo = sexo;
        this.dataNascimento = this.convertLocalDateToDate(dataNascimento);
    }
    
    secondConstructor() {
        return new Professor(this.id, this.nome, this.endereco, this.formacoes, this.sexo, this.dataNascimento);
    }

    //retorna de acordo com a mascara do ngx-mask
    /*salarioFormatado() : string {
        return this.salario ? this.salario.toString().replace('.', ',') : "";
    }*/

    dataNascimentoFormatado() :string {
        var data = this.dataNascimento;
        //return dataArr.length == 3 ? dataArr[2] +"/"+ dataArr[1] +"/"+ dataArr[0] : "";
        if (data) {
            let month = (data.getMonth() + 1).toString();
            if (month.length == 1) month = "0"+month;
            
            return data.getDate() +"/"+ month +"/"+ data.getFullYear();
        }
        return "";
    }

    private convertLocalDateToDate(data :Date | undefined) {
        if (data) {
            var dataArr = (data+"").split("-");
            return new Date(Number.parseInt(dataArr[0]), Number.parseInt(dataArr[1]) - 1, Number.parseInt(dataArr[2]));
        }
        return undefined;
    }
}