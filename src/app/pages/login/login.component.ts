import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  exibirLogin = true;

  usuario = {
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  };

  login = {
    email: '',
    senha: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  mostrarCadastro() {
    this.exibirLogin = false;
  }

  mostrarLogin() {
    this.exibirLogin = true;
  }

  cadastrarUsuario() {
    // Verificar se as senhas coincidem
    if (this.usuario.senha !== this.usuario.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    // Dados a serem enviados no cadastro
    const dados = {
      nome: this.usuario.nome,
      sobrenome: this.usuario.sobrenome,
      email: this.usuario.email,
      senha: this.usuario.senha
    };

    // Log para verificar os dados
    console.log('Dados enviados para cadastro:', dados);

    // Enviar os dados para o backend
    this.http.post('http://localhost:3000/login/register', dados, {
      headers: { 'Content-Type': 'application/json' }  // Garantir que o formato é JSON
    })
      .subscribe({
        next: (res: any) => {
          alert('Usuário cadastrado com sucesso!');
          console.log(res);
          this.mostrarLogin(); // Trocar para o login após sucesso
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao cadastrar usuário.');
        }
      });
  }

  loginUsuario() {
    const dados = {
      email: this.login.email,
      senha: this.login.senha
    };

    // Log para verificar os dados
    console.log('Dados enviados para login:', dados);

    this.http.post('http://localhost:3000/login/auth', dados, {
      headers: { 'Content-Type': 'application/json' }  // Garantir que o formato é JSON
    })
      .subscribe({
        next: (res: any) => {
          console.log('Login realizado com sucesso', res);
          alert('Login realizado com sucesso!');

          // Armazenar o token JWT no localStorage
          localStorage.setItem('token', res.token);

          // Redirecionar para a página /home
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error(err);
          alert('Email ou senha inválidos.');
        }
      });
  }
}
