import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewComponent } from './new/new.component';
import { QuoteComponent } from './quote/quote.component';
import { WriteComponent } from './write/write.component';
import { EditComponent } from './edit/edit.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'new', component: NewComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: 'quotes/:id', component: QuoteComponent},
  {path: 'write/:id', component: WriteComponent},
  { path: '', pathMatch: 'full', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
