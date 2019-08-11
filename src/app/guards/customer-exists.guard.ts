import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../store/reducers";
import { filter, map, switchMap, take, tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { getCustomerLoaded, getCustomers } from "../store/selectors";
import { Customer } from "../constants";
import { getCustomersAction, setSelectedCustomer } from "../store/actions";

@Injectable()
export class CustomerExistsGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot) {
    return this.checkStore().pipe(
      switchMap(() => {
        console.log(route.params);
        const id = +route.params.id;
        return this.hasCustomer(id);
        // if (this.hasCustomer(id)) {
        //   return true;
        // } else {
        //   this.router.navigate(['/customers/new']);
        //   return false;
        // }
      })
    );
  }

  hasCustomer(id: number): Observable<boolean> {
    return this.store
      .select(getCustomers)
      .pipe(
        map((customers: Customer[]) => customers[id]),
        map(customer => {
          if (customer) {
            this.store.dispatch(setSelectedCustomer({customer, id}));
            return true;
          } else {
            this.store.dispatch(setSelectedCustomer(undefined));
            this.router.navigate(['customers/new']);
            return false;
          }
        }),
        take(1)
      );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(getCustomerLoaded)
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.store.dispatch(getCustomersAction());
          }
        }),
        filter(loaded => loaded),
        take(1)
      );
  }
}
