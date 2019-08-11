import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/reducers';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { getCustomersLoadingState } from '../store/selectors';
import { getCustomersAction } from '../store/actions';

@Injectable()
export class CustomersGuard implements CanActivate {
  constructor(private store: Store<AppState>) {
  }

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(getCustomersLoadingState),
      tap(loadingState => {
        if (!loadingState.loading && !loadingState.loaded) {
          this.store.dispatch(getCustomersAction());
        }
      }),
      map(() => true),
      take(1)
    );
  }
}
