import { createSelector } from '@ngrx/store';
// import { getState } from './state.selector';
import { AppState, CustomersState } from '../reducers';

export const getState = (state: AppState) => state;

export const getCustomersState = createSelector(
  getState,
  (state: AppState) => state.customersState
);

export const getCustomers = createSelector(
  getCustomersState,
  (state: CustomersState) => state.customers
);

export const getCustomersLoadingState = createSelector(
  getCustomersState,
  (state: CustomersState) => ({
    loading: state.loading,
    loaded: state.loaded
  })
);

export const getCustomerLoaded = createSelector(
  getCustomersState,
  (state: CustomersState) => state.loaded
);

export const getSelectedCustomer = createSelector(
  getCustomersState,
  (state: CustomersState) => state.selectedCustomer
);
