import { Component, Input, OnInit } from '@angular/core';
import { Venda } from '../../../../../models/venda.model';

@Component({
  selector: 'app-info-venda',
  templateUrl: './info-venda.component.html',
})
export class InfoVendaComponent implements OnInit {
  @Input() venda: Venda;

  constructor() {}

  ngOnInit() {}
}
