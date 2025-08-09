import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [RouterModule],
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    if (loggedIn) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
