import { Customer } from '../../constants';
import {
  addCustomerAction,
  getCustomersAction,
  getCustomersSuccessAction,
  removeCustomerAction,
  setSelectedCustomer,
  updateCustomerAction
} from '../actions/customers.actions';
import { Action, createReducer, on } from '@ngrx/store';

export interface State {
  customers: Customer[];
  selectedCustomer?: Customer;
  loading: boolean;
  loaded: boolean;
}

export const initialState = {
  customers: [],
  loading: false,
  loaded: false
};

export const reducer = createReducer(
  initialState,
  on(getCustomersAction, state => ({
    ...state,
    loading: true,
    loaded: false
  })),
  on(getCustomersSuccessAction, (state, {payload}) => ({
    ...state,
    loading: false,
    loaded: true,
    customers: payload
  })),
  on(addCustomerAction, (state, {payload}) => {
    let customers;
    if (!state.customers) {
      customers = [...initialState.customers, payload];
    } else {
      customers = [...state.customers, payload];
    }
    return {
      ...state,
      customers
      // customers: [...state.customers, payload]
    };
  }),
  on(setSelectedCustomer, (state, {payload}) => {
    let selectedCustomer;
    if (payload) {
      selectedCustomer = {...payload.customer, id: payload.id};
    }
    return {
      ...state,
      selectedCustomer
    };
  }),
  on(removeCustomerAction, (state, {payload}) => {
    const customers = state.customers.filter((item, id) => id !== payload);
    return {
      ...state,
      customers
    };
  }),
  on(updateCustomerAction, (state, {payload}) => {
    const customers = state.customers.map((item, id) => id === payload.id ? payload : item);
    return {
      ...state,
      customers
    };
  })
);

export function customersReducer(state: State, action: Action) {
  return reducer(state, action);
}
