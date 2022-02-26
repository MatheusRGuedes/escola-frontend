import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/*
  Input é a entrada de dados/recursos que o componente disciplina fornece,
  Output é a saída de dados, onde é feito uma notificação ao componente disciplina pr determinada ação
  EventEmitter -> emite o evento com parâmetro do tipo any
*/

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})

export class TabelaComponent implements OnInit {

  @Input()
  public header :string[] = [];

  @Input()
  public props :string[] = [];

  @Input()
  public registros = <any>[];

  @Input()
  public editando :any = null;

  public _config :{paginaAtual? :number, qntddPorPag? :number} = {paginaAtual: 1, qntddPorPag: 5};

  @Input() set config (valor: {paginaAtual? :number, qntddPorPag? :number}) {
    var paginaAtual = valor.paginaAtual;
    var qntddPorPag = valor.qntddPorPag;
    paginaAtual ? this._config.paginaAtual = paginaAtual : this._config.paginaAtual = 1;
    qntddPorPag ? this._config.qntddPorPag = qntddPorPag : this._config.qntddPorPag = 5;
  }
  get config() {
    return this._config;
  }

  @Output()
  onEditar = new EventEmitter<any>();

  @Output()
  onExcluir = new EventEmitter<any>();

  //public paginaAtual = 1; //ao carregar o componente, inicializa na página 1
  //public qntddPorPag = 5; // cada pagina terá 5 itens
  public responsive: boolean = true;

  constructor() { }

  ngOnInit(): void {}

  //esses eventos irão notificar o parent para invocar seus metodos 
  editar(obj :any) {
    this.onEditar.emit(obj);
  }
  excluir(obj :any) {
    this.onExcluir.emit(obj);
  }
}