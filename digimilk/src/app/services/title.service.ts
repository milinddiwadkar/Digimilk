// src/app/services/title.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private titleSubject = new BehaviorSubject<string>('DigiMilk Society');
  title$ = this.titleSubject.asObservable();

  setTitle(newTitle: string) {
    this.titleSubject.next(newTitle);
  }
}
