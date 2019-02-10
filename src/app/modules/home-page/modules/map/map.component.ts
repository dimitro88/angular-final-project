import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('gmap') gmapElement: any;
  @ViewChild('activeInput') activeInput: any;
  public search = new FormControl('');
  map: google.maps.Map;
  private coordinates = {
    latitude: 0,
    longitude: 0
  };

  constructor() { }

  ngOnInit() {
    console.log(window.navigator.geolocation);
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(position => {
        this.coordinates.latitude = position.coords.latitude;
        this.coordinates.longitude = position.coords.longitude;
        this.myLocation();
      });
    }
  }

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  myLocation(lat = this.coordinates.latitude, lon = this.coordinates.longitude) {
    const mapProp = {
      center: new google.maps.LatLng(lat, lon),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.activeInput.nativeElement,
      {
        componentRestrictions: { country: 'UA' },
        types: ['geocode']
      });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      this.myLocation(autocomplete.getPlace().geometry.location.lat(), autocomplete.getPlace().geometry.location.lng());
    });
  }

}
