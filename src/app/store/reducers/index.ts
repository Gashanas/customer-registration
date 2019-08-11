import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromCustomers from './customers.reducer';

export { State as CustomersState } from './customers.reducer';

export interface AppState {
  customersState: fromCustomers.State;
}

export const reducers: ActionReducerMap<AppState> = {
  customersState: fromCustomers.customersReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
