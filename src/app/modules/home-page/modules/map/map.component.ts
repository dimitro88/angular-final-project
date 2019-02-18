/// <reference path="../../../../../../node_modules/@types/googlemaps/index.d.ts"/>
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
declare let google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  map: google.maps.Map;

  @ViewChild('gmap') gmapElement: any;
  @ViewChild('activeInput') activeInput: any;

  private coordinates = {
    latitude: 0,
    longitude: 0
  };

  public search = new FormControl('');

  constructor() { }

  ngOnInit() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(({ coords : { latitude, longitude }}) => {
        this.coordinates.latitude = latitude;
        this.coordinates.longitude = longitude;
        this.myLocation();
      });
    }
  }

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  myLocation(lat = this.coordinates.latitude, lon = this.coordinates.longitude) {
    console.log(lat, lon);
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
      this.myLocation(
        autocomplete.getPlace().geometry.location.lat(),
        autocomplete.getPlace().geometry.location.lng()
      );
    });
  }
}
