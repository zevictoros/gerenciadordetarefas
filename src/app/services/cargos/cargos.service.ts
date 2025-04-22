import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cargo {
  id: number;
  nome_cargo: string;
}

@Injectable({
  providedIn: 'root'
})
export class CargosService {
  private apiUrl = 'http://localhost:3000/cargos';

  constructor(private http: HttpClient) {}

  getCargos(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(`${this.apiUrl}/getCargos`);
  }

  deleteCargo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteCargo/${id}`);
  }

  updateCargo(id: number, nome_cargo: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateCargo/${id}`, { nome_cargo });
  }

  addCargo(nome_cargo: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/addCargo`, { nome_cargo });
  }
  
}
