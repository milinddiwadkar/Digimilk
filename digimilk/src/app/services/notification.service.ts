import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _message: string = '';

  setMessage(message: string) {
    this._message = message;
  }

  getMessage(): string {
    return this._message;
  }

  clearMessage() {
    this._message = '';
  }
}
