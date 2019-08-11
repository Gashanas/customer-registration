import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '../../utils/custom-validators';
import { Address, Customer } from '../../constants';
import { MapsService } from '../../services/maps.service';
import { Store } from '@ngrx/store';
import { addCustomerAction, AppState, getSelectedCustomer, updateCustomerAction } from '../../store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.sass']
})
export class CustomerFormComponent implements OnInit {

  public addressSuggestion;
  public error: string;
  public suggestedAddress;
  public isAddressValid: boolean;
  public selectedCustomer$: Observable<Customer>;
  public customerForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, CustomValidator.isValidEmailFormat]),
    address: new FormGroup({
      city: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      houseNumber: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [Validators.required])
    }),
    id: new FormControl('')
  });

  constructor(private mapsService: MapsService, private cd: ChangeDetectorRef, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.selectedCustomer$ = this.store.select(getSelectedCustomer).pipe(
      map(customer => {
        if (customer) {
          this.customerForm.setValue(customer);
          this.isAddressValid = true;
        }
        return customer;
      })
    );
  }

  addCustomer() {
    if (this.isFormValid()) {
      this.store.dispatch(addCustomerAction(this.customerForm.value));
    } else {
      this.error = 'Please check your entered data';
    }
  }

  updateCustomer() {
    if (this.isFormValid()) {
      this.store.dispatch(updateCustomerAction(this.customerForm.value));
    } else {
      this.error = 'Please check your entered data';
    }
  }

  isFormValid() {
    return this.customerForm.valid && this.isAddressValid && !this.error;
  }

  findLocation() {
    if (this.customerForm.get('address').valid) {
      this.isAddressValid = false;
      const {street, houseNumber, city, zipCode} = this.customerForm.get('address').value as Address;
      const address = street + ' ' + houseNumber + ' ' + city + ' ' + zipCode;
      this.mapsService.findLocation(address).subscribe(res => {
        if (this.error) {
          this.error = undefined;
        }
        if (this.checkIfAddressMatch(res[0])) {
          this.isAddressValid = true;
        } else {
          this.addressSuggestion = res[0].formatted_address;
          this.suggestedAddress = {
            street: res[0].address_components[1].long_name,
            city: res[0].address_components[2].long_name,
            zipCode: res[0].address_components[6].long_name,
            houseNumber: res[0].address_components[0].long_name,
          };
        }
        this.cd.detectChanges();
      }, error => {
        this.error = error;
        this.cd.detectChanges();
      }, () => {
      });
    }
  }

  takeSuggestion() {
    this.customerForm.get('address').setValue(this.suggestedAddress);
    this.addressSuggestion = undefined;
    this.findLocation();
  }

  checkIfAddressMatch(location): boolean {
    const {street, houseNumber, city, zipCode} = this.customerForm.get('address').value as Address;
    return street === location.address_components[1].long_name
      && city === location.address_components[2].long_name
      && zipCode === location.address_components[6].long_name
      && houseNumber === location.address_components[0].long_name;
  }

}
