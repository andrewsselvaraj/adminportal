import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
<<<<<<< HEAD
import { Temperature } from './temperature/temperature';
=======
import { Upload } from './pages/upload/upload';
>>>>>>> 4ca96cc03ba55fe390b4f7ed6ade9bcbf28a9599

@NgModule({
  declarations: [
    Dashboard,
<<<<<<< HEAD
    Temperature
=======
    Upload
>>>>>>> 4ca96cc03ba55fe390b4f7ed6ade9bcbf28a9599
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AppComponent,
    Login
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
