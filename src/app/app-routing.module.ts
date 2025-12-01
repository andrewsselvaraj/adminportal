import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Temperature } from './temperature/temperature';
import { Upload } from './pages/upload/upload';
import { Stream } from './pages/stream/stream';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'temperature', component: Temperature },
  // common misspelling redirect -> ensures /temparature goes to /temperature
  { path: 'temparature', redirectTo: 'temperature' },
  { path: 'upload', component: Upload },
  { path: 'stream', component: Stream },
   { path: 'timeflux', component: Stream }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
