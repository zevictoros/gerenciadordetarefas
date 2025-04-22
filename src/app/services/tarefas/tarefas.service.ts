import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tarefa {
  id: number;
  descricao_tarefa: string;
  responsavel_id: number;
  prioridade: 'alta' | 'media' | 'baixa';
  data_criacao?: string;
  finalizada: boolean;
  nome_funcionario?: string; // Caso você queira incluir no SELECT futuramente
}

@Injectable({
  providedIn: 'root'
})
export class TarefasService {
  private apiUrl = 'http://localhost:3000/tarefas';

  constructor(private http: HttpClient) {}

  getTarefas(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(`${this.apiUrl}/getTarefas`);
  }

  addTarefa(tarefa: Omit<Tarefa, 'id' | 'data_criacao'>): Observable<any> {
    return this.http.post(`${this.apiUrl}/addTarefa`, tarefa);
  }

  updateTarefa(id: number, tarefa: Partial<Tarefa>): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateTarefa/${id}`, tarefa);
  }
}
