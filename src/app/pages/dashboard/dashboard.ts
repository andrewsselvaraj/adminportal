import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
username = 'User'; // You can later pass real name after login

  logout() {
    // For now, just navigate back to login
    window.location.href = '/login';
  }
}
