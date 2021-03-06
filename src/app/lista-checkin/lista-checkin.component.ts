import { Component, OnInit } from '@angular/core';
import {Checkin} from '../models/checkin.model';
import {CheckinService} from '../services/checkin.service';
import {PessoaService} from '../services/pessoa.service';
import {Pessoa} from '../models/pessoa.model';

@Component({
  selector: 'app-lista-checkin',
  templateUrl: './lista-checkin.component.html',
  styleUrls: ['./lista-checkin.component.css']
})
export class ListaCheckinComponent implements OnInit {

  public paginaAtual = 0;
  columns: String[];
  checkins: Checkin[];
  private pessoas: Pessoa[];
  constructor(public pessoaService: PessoaService,
              public checkinService: CheckinService) { }

  ngOnInit() {
      this.pessoas = this.pessoaService.getPessoas();
    this.columns = ['Nome', 'Documento', 'Valor Gasto (R$)'];
    this.checkins = this.checkinService.getCheckins();
  }

  deleteCheckin(checkin: Checkin) {
    if (confirm('Você deseja excluir este checkin?')) {
      this.checkinService.deleteCheckin(checkin);
    }
  }

  filtrarList(aindaPresentes: HTMLInputElement, deixaramHotel: HTMLInputElement) {
      this.checkins = this.checkinService.getCheckins();
      if (aindaPresentes.checked) {
          this.checkins = this.checkins
              .filter(function(el) {
              return new Date(el.dataSaida) > new Date();
              });
      }

      if (deixaramHotel.checked) {
          this.checkins = this.checkins
              .filter(function(el) {
                  return new Date(el.dataSaida) <= new Date();
              });
      }

  }

}
