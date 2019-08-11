import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersListComponent } from './customers/customers-list/customers-list.component';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatInputModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';
import { CustomersGuard } from './guards/customers.guard';
import { CustomersComponent } from './customers/customers.component';
import { CustomerExistsGuard } from "./guards/customer-exists.guard";

@NgModule({
  declarations: [
    AppComponent,
    CustomersListComponent,
    CustomerFormComponent,
    CustomersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDzPEtqIe-1ArlBZRdmFQfGEKZr1f6HwrQ'}),
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [GoogleMapsAPIWrapper, CustomersGuard, CustomerExistsGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
