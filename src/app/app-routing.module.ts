import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { NewBookComponent } from './components/new-book/new-book.component';
import { CreateAuthorComponent } from './components/create-author/create-author.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'book/:id', component: BookDetailsComponent },
  {path: 'create', component: NewBookComponent },
  {path: 'create-author', component: CreateAuthorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
