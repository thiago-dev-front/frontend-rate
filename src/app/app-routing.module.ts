import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiRateProdutcsComponent } from './components/ui-rate-produtcs/ui-rate-products.component';



const routes: Routes = [
  // Outras rotas do seu aplicativo

  // Rota para a página de cadastro e edição de produtos
  { path: 'produtos', component: UiRateProdutcsComponent },
  { path: 'produtos/:id', component: UiRateProdutcsComponent },

  // Rota padrão ou tratamento de rota inválida
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
