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
  cotacaoAtual = 0;
  cotacaoPorPeriodoLista: Cotacao[] = [];

  constructor(
    private cotacaoDolarService: CotacaoDolarService,
    private dateFormat: DatePipe
  ) {}

  public getCotacaoPorPeriodo(
    dataInicialString: string,
    dataFinalString: string
  ): void {
    this.cotacaoPorPeriodoLista = [];

    let dataInicial: any = new Date(dataInicialString);
    dataInicial.setDate(dataInicial.getDate() + 1);
    dataInicial = this.dateFormat.transform(dataInicial, "MM-dd-yyyy");
    let dataFinal: any = new Date(dataFinalString);
    dataFinal.setDate(dataFinal.getDate() + 1);
    dataFinal = this.dateFormat.transform(dataFinal, "MM-dd-yyyy");

    this.cotacaoDolarService.getCotacaoPorPeriodoFront(dataInicial.toString(), dataFinal.toString()).subscribe(cotacoes => {
      this.cotacaoPorPeriodoLista = cotacoes;
    })
  }

  ngOnInit() {
    this.cotacaoDolarService.getCotacaoAtual().subscribe(cotacao => {
      this.cotacaoAtual = cotacao;
    })
  }
}
