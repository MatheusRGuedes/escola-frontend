/*export enum Uf {
    RONDONIA = "RO",
	ACRE = "AC",
	AMAZONAS = "AM",
	RORAIMA = "RR",
	PARA = "PA",
	AMAPA = "AP",
	TOCANTINS = "TO",
	MARANHAO = "MA",
	PIAUI = "PI",
	CEARA = "CE",
	RIO_GRANDE_DO_NORTE = "RN",
	PARAIBA = "PB",
	PERNAMBUCO = "PE",
	ALAGOAS = "AL",
	SERGIPE = "SE",
	BAHIA = "BA",
	MINAS_GERAIS = "MG",
	ESPIRITO_SANTO = "ES",
	RIO_DE_JANEIRO = "RJ",
	SAO_PAULO = "SP",
	PARANA = "PR",
	SANTA_CATARINA = "SC",
	RIO_GRANDE_DO_SUL = "RS",
	MATO_GROSSO_DO_SUL = "MS",
	MATO_GROSSO = "MT",
	GOIAS = "GO",
	DISTRITO_FEDERAL = "DF"
}
*/
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