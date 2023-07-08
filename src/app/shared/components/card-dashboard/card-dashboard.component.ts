import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-dashboard',
  templateUrl: './card-dashboard.component.html',
  styleUrls: ['./card-dashboard.component.css'],
})
export class CardDashboardComponent implements OnInit {
  @Input() titulo: string;
  @Input() exibirIcone = false;

  @Output() iconClick = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}
}
