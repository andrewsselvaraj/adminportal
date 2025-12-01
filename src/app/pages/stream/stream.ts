import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stream',
  standalone: false,
  templateUrl: './stream.html',
  styleUrl: './stream.css'
})
export class Stream implements OnInit, OnDestroy {
  streamData: string[] = [];
  loading: boolean = false;
  error: string = '';
  private xhr: XMLHttpRequest | null = null;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    // Optional: start streaming on component init
    // this.startStream();
  }

  ngOnDestroy(): void {
    // Clean up XMLHttpRequest on component destroy
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  startStream(): void {
    this.loading = true;
    this.error = '';
    this.streamData = [];

    // Use XMLHttpRequest to handle streaming
    this.xhr = new XMLHttpRequest();
    this.xhr.open('GET', 'http://63.142.240.31:8000/stream/time', true);
    this.xhr.withCredentials = false; // Allow CORS

    let lastIndex = 0;

    this.xhr.onprogress = () => {
      // Get the new data that arrived since last progress event
      const newData = this.xhr!.responseText.substring(lastIndex);
      lastIndex = this.xhr!.responseText.length;

      // Split by newlines and process each line
      const lines = newData.split('\n');
      this.ngZone.run(() => {
        for (const line of lines) {
          if (line.trim()) {
            this.streamData.push(line.trim());
            // Keep only last 50 messages
            if (this.streamData.length > 50) {
              this.streamData.shift();
            }
          }
        }
      });
    };

    this.xhr.onerror = () => {
      this.ngZone.run(() => {
        this.error = 'Failed to connect to stream: Connection error';
        this.loading = false;
        console.error('Stream error');
      });
    };

    this.xhr.onload = () => {
      this.ngZone.run(() => {
        if (this.xhr!.status === 200) {
          this.loading = false;
        } else {
          this.error = `Stream ended with status ${this.xhr!.status}`;
          this.loading = false;
        }
      });
    };

    this.xhr.send();
  }

  stopStream(): void {
    if (this.xhr) {
      this.xhr.abort();
      this.xhr = null;
      this.loading = false;
    }
  }
}



