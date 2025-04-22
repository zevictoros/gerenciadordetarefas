import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TarefasService, Tarefa } from '../../services/tarefas/tarefas.service';
import { FuncionariosService, Funcionario } from '../../services/funcionarios/funcionarios.service';

@Component({
  selector: 'app-tarefa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent implements OnInit {
  tarefas: Tarefa[] = [];
  funcionarios: Funcionario[] = [];
  exibindoFormulario: boolean = false;

  editandoId: number | null = null;
  novaTarefa: Partial<Tarefa> = {
    descricao_tarefa: '',
    prioridade: 'media',
    finalizada: false,
    responsavel_id: undefined
  };

  tarefaEdit: Partial<Tarefa> = {};

  constructor(
    private tarefasService: TarefasService,
    private funcionariosService: FuncionariosService
  ) {}

  ngOnInit(): void {
    this.carregarTarefas();
    this.funcionariosService.getFuncionarios().subscribe(data => this.funcionarios = data);
  }

  carregarTarefas(): void {
    this.tarefasService.getTarefas().subscribe(data => {
      // Filtrando tarefas para não exibir as finalizadas
      this.tarefas = data.filter(tarefa => !tarefa.finalizada);
    });
  }

  abrirFormulario(): void {
    this.exibindoFormulario = true;
  }

  cancelarFormulario(): void {
    this.exibindoFormulario = false;
    this.novaTarefa = {
      descricao_tarefa: '',
      prioridade: 'media',
      finalizada: false,
      responsavel_id: undefined
    };
  }

  adicionarTarefa(): void {
    console.log('Nova Tarefa:', this.novaTarefa); // Adicionando o log para depuração
  
    // Garantir que o responsavel_id seja um número
    const responsavelId = parseInt(this.novaTarefa.responsavel_id as unknown as string, 10);
  
    if (
      this.novaTarefa.descricao_tarefa &&
      this.novaTarefa.prioridade &&
      !isNaN(responsavelId) && responsavelId !== undefined
    ) {
      this.novaTarefa.responsavel_id = responsavelId; // Garantir que o valor seja um número
      this.tarefasService.addTarefa(this.novaTarefa as Tarefa).subscribe(() => {
        this.cancelarFormulario();
        this.carregarTarefas();
      });
    } else {
      console.error('Por favor, preencha todos os campos obrigatórios');
    }
  }

  editarTarefa(tarefa: Tarefa): void {
    this.editandoId = tarefa.id;
    this.tarefaEdit = { ...tarefa };
  }

  salvarEdicao(id: number): void {
    if (
      this.tarefaEdit.descricao_tarefa &&
      this.tarefaEdit.prioridade &&
      typeof this.tarefaEdit.responsavel_id === 'number'
    ) {
      this.tarefasService.updateTarefa(id, this.tarefaEdit).subscribe(() => {
        this.editandoId = null;
        this.carregarTarefas();
      });
    }
  }

  cancelarEdicao(): void {
    this.editandoId = null;
    this.tarefaEdit = {};
  }

  // Função para confirmar se a tarefa deve ser finalizada
  confirmarFinalizacao(tarefa: Tarefa): void {
    if (window.confirm('Tem certeza que deseja finalizar esta tarefa?')) {
      tarefa.finalizada = true;
      this.tarefasService.updateTarefa(tarefa.id, tarefa).subscribe(() => {
        this.carregarTarefas(); // Recarregar a lista de tarefas
      });
    }
  }

  // Função para obter o nome do responsável
  getNomeResponsavel(id: number | undefined): string {
    if (typeof id !== 'number') return 'Não definido';
    const funcionario = this.funcionarios.find(f => f.id === id);
    return funcionario ? funcionario.nome_funcionario : 'Desconhecido';
  }
}
