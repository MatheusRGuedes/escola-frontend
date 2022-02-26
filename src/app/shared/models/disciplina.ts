/**
 * Interface para definição de um contrato para classes seguirem.
 * 
 * --> Vantagem de usá-la é que não são transpiladas (transformar o código em uma linguagem q o 
 *     navegador entenda), diminuindo o peso no build. Diferente da interface, as classes são 
 *     transpiladas, gerando um código maior e "desnecessário";
 */

export interface Disciplina {
    id: number;
    codigo: string;
    nome: string;
}

/*Classe pra servir como um modelode dados para uma disciplina

export class Disciplina {
    id: number;
    nome: string;
    descricao: string | undefined;

    //? -> opcional
    constructor(id: number, nome: string, descricao?: string) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
    }
}
*/