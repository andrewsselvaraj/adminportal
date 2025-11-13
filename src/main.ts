import '@angular/compiler';
import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app-module';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(FormsModule),
    // Provide HttpClientModule so HttpClient/_HttpClient is available to components
    importProvidersFrom(HttpClientModule)
    ,
    // Ensure NgModules (declarations/directives) from AppModule are available
    importProvidersFrom(AppModule)
  ]
});
