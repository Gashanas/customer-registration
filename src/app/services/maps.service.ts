import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { MapsAPILoader } from '@agm/core';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  private geocoder;

  constructor(private mapsApiLoader: MapsAPILoader) {
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  findLocation(address): Observable<any> {
    return Observable.create((observer: Observer<google.maps.GeocoderResult[]>) => {
      // Invokes geocode method of Google Maps API geocoding.
      this.geocoder.geocode({address}, (
        (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
          if (status === google.maps.GeocoderStatus.OK && results[0].address_components.length > 6) {
            observer.next(results);
            observer.complete();
          } else {
            observer.error('Your entered address is invalid');
          }
        })
      );
    });
  }
}
