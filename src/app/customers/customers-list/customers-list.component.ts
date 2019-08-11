import { Component, OnInit } from '@angular/core';
import { AppState } from '../../store/reducers';
import { Store } from '@ngrx/store';
import { Customer } from '../../constants';
import { Observable } from 'rxjs';
import { getCustomers } from '../../store/selectors';
import { removeCustomerAction } from '../../store/actions';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.sass']
})
export class CustomersListComponent implements OnInit {

  customers$: Observable<Customer[]>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.customers$ = this.store.select(getCustomers);
  }

  removeCustomer(id: number) {
    this.store.dispatch(removeCustomerAction(id));
  }

  scrollIntoForm() {
    document.getElementById('form').scrollIntoView();
  }

}
