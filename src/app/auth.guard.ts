import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    try {
      const token = localStorage.getItem('token');

      // Validação extra: token não pode ser vazio, null ou "null"
      if (token && token !== 'null' && token !== 'undefined' && token.trim() !== '') {
        return true;
      }
    } catch (error) {
      console.error('Erro ao validar o token:', error);
    }

    // Se não houver token válido, redireciona
    this.router.navigate(['/login']);
    return false;
  }
}
