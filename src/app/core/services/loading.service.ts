import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  #count = 0;
  #isLoading = new BehaviorSubject<boolean>(false);
  loading$ = this.#isLoading.asObservable();

  public show() {
    this.#count++;
    this.#isLoading.next(true);
  }

  public hide() {
    this.#count--;
    if (this.#count <= 0) {
      this.#isLoading.next(false);
      this.#count = 0;
    }
  }
}
