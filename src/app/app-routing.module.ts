import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
//import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Route[] = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./features/favorites/favorites.module').then(m => m.FavoritesModule)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // {path:'**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
