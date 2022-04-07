import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Cotacao } from './cotacao';
import { CotacaoDolarService } from './cotacaodolar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  errosAlert: String = '';
  cotacaoAtual: string = 'Aguardando servidor...';
  cotacaoPorPeriodoLista: Cotacao[] = [];

  constructor(
    private cotacaoDolarService: CotacaoDolarService,
    private dateFormat: DatePipe
  ) {}

  public getCotacaoAtualeData(): void {
    this.cotacaoDolarService.getCotacaoAtualeData().subscribe(
      (response: String) => {
        this.errosAlert = '';
        this.cotacaoAtual = response.toString();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.errosAlert = 'Ocorreu um erro: ' + error.message;
      }
    );
  }

  public getCotacaoPorPeriodo(
    dataInicialString: string,
    dataFinalString: string
  ): void {
    this.errosAlert = '';
    this.cotacaoPorPeriodoLista = [];

    let dataInicial: Date = new Date(dataInicialString);
    dataInicial.setDate(dataInicial.getDate() + 1);
    let dataFinal: Date = new Date(dataFinalString);
    dataFinal.setDate(dataFinal.getDate() + 1);

    // complete aqui....
  }

  private getCotacaoDiferenca() {
    this.cotacaoDolarService.getCotacaoAtual().subscribe(
      (response: number) => {
        let formaterToMoney = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });
        this.cotacaoPorPeriodoLista.forEach((value) => {
          value.dataTexto
            ? this.dateFormat.transform(value.data, 'dd-MM-yyyy')
            : '';
          value.precoTexto = formaterToMoney.format(value.preco);
          value.diferenca = formaterToMoney.format(response - value.preco);
        });
      },
      (error: HttpErrorResponse) => {
        this.errosAlert = 'Ocorreu um erro: ' + error.message;
      }
    );
  }

  ngOnInit() {
    this.getCotacaoAtualeData();
  }
}
