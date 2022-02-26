export interface EnderecoModel {
    cep :string;
    logradouro :string;
    bairro :string;
    cidade : string;
    uf : string;

    cepFormatado:() => string;
    toString: () => string;
}

export class Endereco implements EnderecoModel {
    cep :string;
    logradouro :string;
    bairro: string;
    cidade: string;
    uf: string;

    constructor(cep :string, logradouro :string, bairro: string, 
        cidade: string, uf: string) {

        this.cep = cep;
        this.logradouro = logradouro;
        this.bairro = bairro;
        this.cidade = cidade;
        this.uf = uf;
    }

    cepFormatado() :string {
        if (this.cep) {
            return this.cep.substring(0, 5) + '-' + this.cep.substring(5);
        } 
        return "";
    }
    toString() :string {
        return `${this.logradouro} - ${this.bairro} - ${this.cidade} - ${this.uf}`;
    }
}