import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  #isLoading = new BehaviorSubject<boolean>(false);

  loading$ = this.#isLoading.asObservable();

  public show() {
    this.#isLoading.next(true);
  }

  public hide() {
    this.#isLoading.next(false);
  }
}
