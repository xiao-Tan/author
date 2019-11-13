import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewComponent } from './new/new.component';
import { QuoteComponent } from './quote/quote.component';
import { WriteComponent } from './write/write.component';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [
  {path: 'new', component: NewComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: 'quotes/:id', component: QuoteComponent},
  {path: 'write/:id', component: WriteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
