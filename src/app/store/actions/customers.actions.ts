import { createAction, union } from '@ngrx/store';
import { Customer } from '../../constants';

export const getCustomersAction = createAction(
  '[Customers] Get customer');

export const getCustomersSuccessAction = createAction(
  '[Customers] Get customer success',
  (payload: Customer[]) => ({payload}));

export const addCustomerAction = createAction(
  '[Customers] Add customer',
  (payload: Customer) => ({payload}));

export const setSelectedCustomer = createAction(
  '[Customers] Set selected customer',
  (payload: { customer: Customer, id: number }) => ({payload}));

export const updateCustomerAction = createAction(
  '[Customers] Update customer',
  (payload: Customer) => ({payload}));

export const removeCustomerAction = createAction(
  '[Customers] Remove customer',
  (payload: number) => ({payload}));

const allActions = union({
  getCustomersAction,
  getCustomersSuccessAction,
  addCustomerAction,
  setSelectedCustomer,
  updateCustomerAction,
  removeCustomerAction
});
export type CustomersActions = typeof allActions;
