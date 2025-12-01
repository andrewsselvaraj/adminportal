import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Timeservice {

  private url = 'http://63.142.240.31:8000/stream/time';

  getServerTime(): Observable<string> {
    return new Observable(observer => {
      const eventSource = new EventSource(this.url);

      eventSource.onmessage = (event) => {
        observer.next(event.data);
      };

      eventSource.onerror = (error) => {
        observer.error(error);
        eventSource.close();
      };

      return () => eventSource.close();
    });
  }
}
