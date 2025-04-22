import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarefaComponent } from '../../components/tarefa/tarefa.component';
import { CargosComponent } from "../../components/cargos/cargos.component";
import { FuncionariosComponent } from "../../components/funcionarios/funcionarios.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TarefaComponent, CargosComponent, FuncionariosComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isSidebarOpen: boolean = true;

  // Define o componente padrão ao carregar
  componenteAtual: string = 'tarefa';

  constructor() {}

  ngOnInit(): void {}

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Define o componente a ser exibido
  exibirComponente(nome: string): void {
    this.componenteAtual = nome;
    this.toggleSidebar(); // fecha o menu ao clicar
  }
}
