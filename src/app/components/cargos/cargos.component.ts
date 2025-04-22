import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CargosService, Cargo } from '../../services/cargos/cargos.service';

@Component({
  selector: 'app-cargos',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargosComponent implements OnInit {
  cargos: Cargo[] = [];
  editandoId: number | null = null;
  novoNome: string = '';
  mensagemErro: string | null = null; // Adicionando variável para a mensagem de erro

  constructor(private cargosService: CargosService) {}

  ngOnInit(): void {
    this.carregarCargos();
  }

  carregarCargos(): void {
    this.cargosService.getCargos().subscribe(data => {
      this.cargos = data;
    });
  }

  editarCargo(cargo: Cargo): void {
    this.editandoId = cargo.id;
    this.novoNome = cargo.nome_cargo;
  }

  salvarEdicao(id: number): void {
    this.cargosService.updateCargo(id, this.novoNome).subscribe(() => {
      this.editandoId = null;
      this.carregarCargos();
    });
  }

  cancelarEdicao(): void {
    this.editandoId = null;
    this.novoNome = '';
  }

  excluirCargo(id: number): void {
    if (confirm('Tem certeza que deseja excluir este cargo?')) {
      this.cargosService.deleteCargo(id).subscribe({
        next: () => {
          this.carregarCargos(); // Atualiza a lista de cargos após exclusão bem-sucedida
        },
        error: (err) => {
          // Verifica se o erro retornado do backend contém a chave 'error' e compara a mensagem de erro
          if (err.error && err.error.error === 'Não é possível excluir este cargo, pois há funcionários vinculados.') {
            window.alert('Não é possível excluir o cargo, pois há funcionários vinculados.');
          } else {
            window.alert('Erro ao excluir o cargo.');
          }
        }
      });
    }
  }  

  novoCargo: string = '';

  adicionarCargo(): void {
    if (this.novoCargo.trim()) {
      this.cargosService.addCargo(this.novoCargo).subscribe(() => {
        this.novoCargo = '';
        this.carregarCargos();
      });
    }
  }
}
