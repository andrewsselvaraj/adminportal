import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-temperature',
  standalone: false,
  templateUrl: './temperature.html',
  styleUrl: './temperature.css'
})
export class Temperature {
  temperature: string = '';
  loading: boolean = false;
  error: string = '';

  constructor(private http: HttpClient) {}

  fetchTemperature(): void {
    this.loading = true;
    this.error = '';
    this.temperature = '';
    
    // Call the Spring Boot endpoint
    this.http.get<string>('http://localhost:8080/tempature').subscribe({
      next: (response) => {
        this.temperature = response;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to fetch temperature: ' + err.message;
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }
}
