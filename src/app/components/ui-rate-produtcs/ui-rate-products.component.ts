import { Component } from '@angular/core';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-ui',
  templateUrl: './ui-rate-products.component.html',
  styleUrls: ['./ui-rate-products.component.scss']
})
export class UiRateProdutcsComponent {
  produto: any = {};
  produtos: any[] = [];
  botaoCadastrarDesativado: boolean = false;

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  calcularLucroFinal(produto: any): number {
    const taxaShopee = 0.14; // Taxa de 10% da Shopee
    const taxaMercadoLivre = 0.15; // Taxa de 15% do Mercado Livre

    let taxa;
    if (produto.taxa === 'shopee') {
      taxa = taxaShopee;
    } else if (produto.taxa === 'mercadolivre') {
      taxa = taxaMercadoLivre;
    } else {
      taxa = 0;
    }

    const lucro = (produto.quantidade * produto.custo) - produto.outrosCustos;
    const lucroFinal = lucro - (lucro * taxa);

    return lucroFinal;
  }


  cadastrarProduto(): void {
    this.produtoService.cadastrarProduto(this.produto).subscribe(
      (res) => {
        console.log('Produto cadastrado:', res);
        // Limpar o formulário após cadastrar
        this.produto = {};
        // Atualizar a lista de produtos após cadastrar
        this.carregarProdutos();
      },
      (error) => {
        console.error('Erro ao cadastrar o produto:', error);
      }
    );
  }

  editarProduto(id: string): void {
    console.log('id', id);

    this.produtoService.obterProduto(id).subscribe(
      (res) => {
        this.produto = res;
        this.produto._id = id;
        this.botaoCadastrarDesativado = true;
      },
      (error) => {
        console.error('Erro ao obter os detalhes do produto:', error);
      }
    );
  }

  atualizarProduto(): void {
    this.produtoService.editarProduto(this.produto._id, this.produto).subscribe(
      (res) => {
        console.log('Produto atualizado:', res);
        // Limpar o formulário após atualizar
        this.produto = {};
        // Atualizar a lista de produtos após atualizar
        this.carregarProdutos();
        this.botaoCadastrarDesativado = false;
      },
      (error) => {
        console.error('Erro ao atualizar o produto:', error);
      }
    );
  }


  excluirProduto(id: string): void {
    this.produtoService.excluirProduto(id).subscribe(
      (res) => {
        console.log('Produto excluído:', res);
        // Atualizar a lista de produtos após excluir
        this.carregarProdutos();
      },
      (error) => {
        console.error('Erro ao excluir o produto:', error);
      }
    );
  }

  carregarProdutos(): void {
    this.produtoService.listarProdutos().subscribe(
      (res) => {
        this.produtos = res;
      },
      (error) => {
        console.error('Erro ao carregar os produtos:', error);
      }
    );
  }
}
