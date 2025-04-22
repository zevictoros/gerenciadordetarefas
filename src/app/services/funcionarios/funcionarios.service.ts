import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Funcionario {
  id: number;
  nome_funcionario: string;
  cpf: string;
  data_nascimento: string;
  cargo_id: number;
  nome_cargo?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {
  private apiUrl = 'http://localhost:3000/funcionarios';

  constructor(private http: HttpClient) {}

  getFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.apiUrl}/getFuncionarios`);
  }

  deleteFuncionario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteFuncionario/${id}`);
  }

  updateFuncionario(id: number, funcionario: Partial<Funcionario>): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateFuncionario/${id}`, funcionario);
  }

  addFuncionario(funcionario: Omit<Funcionario, 'id'>): Observable<any> {
    return this.http.post(`${this.apiUrl}/addFuncionario`, funcionario);
  }
}
