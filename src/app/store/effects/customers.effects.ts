import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addCustomerAction,
  getCustomersAction,
  getCustomersSuccessAction,
  removeCustomerAction,
  setSelectedCustomer,
  updateCustomerAction
} from '../actions';
import { map, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { getCustomers } from '../selectors';
import { Router } from '@angular/router';

@Injectable()
export class CustomersEffects {
  public addCustomerToLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCustomerAction, removeCustomerAction, updateCustomerAction),
      withLatestFrom(this.store.select(getCustomers)),
      map(([action, state]) => {
        localStorage.setItem('customers', JSON.stringify(state));
      }),
    ), {dispatch: false}
  );

  public redirectToNewPage = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCustomerAction),
      map(() => {
        this.router.navigate(['customers/new']);
        return setSelectedCustomer(undefined);
      }),
    )
  );

  public getCustomersFromLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCustomersAction),
      map(() => {
        const customers = JSON.parse(localStorage.getItem('customers'));
        return getCustomersSuccessAction(customers);
      })
    )
  );


  constructor(private actions$: Actions, private router: Router, private store: Store<AppState>) {
  }
}
