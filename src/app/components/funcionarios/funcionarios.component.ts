import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FuncionariosService, Funcionario } from '../../services/funcionarios/funcionarios.service';
import { CargosService, Cargo } from '../../services/cargos/cargos.service';

@Component({
  selector: 'app-funcionarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {
  funcionarios: Funcionario[] = [];
  cargos: Cargo[] = [];

  editandoId: number | null = null;
  novoFuncionario: Partial<Funcionario> = {};
  funcionarioEdit: Partial<Funcionario> = {};

  constructor(
    private funcionariosService: FuncionariosService,
    private cargosService: CargosService
  ) {}

  ngOnInit(): void {
    this.carregarFuncionarios();
    this.cargosService.getCargos().subscribe(data => this.cargos = data);
  }

  carregarFuncionarios(): void {
    this.funcionariosService.getFuncionarios().subscribe(data => {
      this.funcionarios = data.map(func => ({
        ...func,
        // Formatar a data de nascimento para o formato 'yyyy-MM-dd'
        data_nascimento: func.data_nascimento ? new Date(func.data_nascimento).toISOString().split('T')[0] : ''
      }));
    });
  }

  editarFuncionario(func: Funcionario): void {
    this.editandoId = func.id;
    // Aqui também formatamos a data de nascimento para o formato correto
    this.funcionarioEdit = { 
      ...func,
      data_nascimento: func.data_nascimento ? new Date(func.data_nascimento).toISOString().split('T')[0] : ''
    };
  }

  salvarEdicao(id: number): void {
    // Garantir que a data de nascimento esteja no formato correto antes de salvar
    if (this.funcionarioEdit.data_nascimento) {
      this.funcionarioEdit.data_nascimento = new Date(this.funcionarioEdit.data_nascimento).toISOString().split('T')[0];
    }

    this.funcionariosService.updateFuncionario(id, this.funcionarioEdit).subscribe(() => {
      this.editandoId = null;
      this.carregarFuncionarios();
    });
  }

  cancelarEdicao(): void {
    this.editandoId = null;
    this.funcionarioEdit = {};
  }

  excluirFuncionario(id: number): void {
    if (confirm('Tem certeza que deseja excluir este funcionário?')) {
      this.funcionariosService.deleteFuncionario(id).subscribe(() => {
        this.carregarFuncionarios();
      });
    }
  }

  adicionarFuncionario(): void {
    // Certifique-se de que a data de nascimento esteja no formato correto ao adicionar
    if (this.novoFuncionario.data_nascimento) {
      this.novoFuncionario.data_nascimento = new Date(this.novoFuncionario.data_nascimento).toISOString().split('T')[0];
    }

    if (this.novoFuncionario.nome_funcionario && this.novoFuncionario.cpf && this.novoFuncionario.data_nascimento && this.novoFuncionario.cargo_id) {
      this.funcionariosService.addFuncionario(this.novoFuncionario as any).subscribe(() => {
        this.novoFuncionario = {};
        this.carregarFuncionarios();
      });
    }
  }
}
