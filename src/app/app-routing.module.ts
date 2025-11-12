import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
<<<<<<< HEAD
import { Temperature } from './temperature/temperature';
=======
import { Upload } from './pages/upload/upload';
>>>>>>> 4ca96cc03ba55fe390b4f7ed6ade9bcbf28a9599

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
<<<<<<< HEAD
  { path: 'temperature', component: Temperature },
  // common misspelling redirect -> ensures /temparature goes to /temperature
  { path: 'temparature', redirectTo: 'temperature' }
=======
  { path: 'upload', component: Upload }
>>>>>>> 4ca96cc03ba55fe390b4f7ed6ade9bcbf28a9599
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
