import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Temperature } from './temperature/temperature';
import { Upload } from './pages/upload/upload';
import { Stream } from './pages/stream/stream';
import { Timeflux } from './timeflux/timeflux';

@NgModule({
  declarations: [
    Dashboard,
    Temperature,
    Upload,
    Stream,
    Timeflux
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
