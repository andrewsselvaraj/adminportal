import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { Timeservice } from '../timeservice';

@Component({
  selector: 'app-timeflux',
  standalone: false,
  templateUrl: './timeflux.html',
  styleUrl: './timeflux.css'
})
export class Timeflux implements OnInit, OnDestroy{
serverTime = '';
  sub!: Subscription;

  constructor(private timeService: Timeservice) {}

  ngOnInit(): void {
    this.sub = this.timeService.getServerTime().subscribe(
      data => this.serverTime = data
    );
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
