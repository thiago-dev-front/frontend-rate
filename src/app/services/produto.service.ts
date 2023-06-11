import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'http://localhost:3000/api/produtos'; // Altere a URL do backend, se necessário

  constructor(private http: HttpClient) { }

  cadastrarProduto(produto: any): Observable<any> {
    return this.http.post(this.apiUrl, produto);
  }

  listarProdutos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  obterProduto(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url);
  }

  editarProduto(id: string, produto: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, produto);
  }

  excluirProduto(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
