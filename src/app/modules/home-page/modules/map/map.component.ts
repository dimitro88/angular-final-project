/// <reference path="../../../../../../node_modules/@types/googlemaps/index.d.ts"/>
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
declare let google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  map: google.maps.Map;
  geocoder = new google.maps.Geocoder();

  @ViewChild('gmap') gmapElement: any;
  @ViewChild('activeInput') activeInput: any;

  private markerCoordinates = {
    latitude: 0,
    longitude: 0
  };

  private marker;

  public search = new FormControl('');
  public favouritePlaces = [];

  constructor(private notifier: NotifierService) { }

  ngOnInit() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(({ coords : { latitude, longitude }}) => {
        this.setLocation(latitude, longitude);
        this.markerCoordinates = {
          latitude,
          longitude
        };
      });
    }
  }

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  setLocation(lat = 49.8257032, lon = 24.012346299999997) {
    const mapProp = {
      center: new google.maps.LatLng(lat, lon),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    this.setMarker(lat, lon);
    this.map.addListener('click', ({ latLng }) => {
      this.setMarker(latLng.lat(), latLng.lng());
      this.markerCoordinates.latitude = latLng.lat();
      this.markerCoordinates.longitude = latLng.lng();
    });
  }

  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.activeInput.nativeElement,
      {
        componentRestrictions: { country: 'UA' },
        types: ['geocode']
      });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const latitude = autocomplete.getPlace().geometry.location.lat();
      const longitude = autocomplete.getPlace().geometry.location.lng();
      this.setLocation(latitude, longitude);
      this.markerCoordinates = {
        latitude,
        longitude
      };
    });
  }

  setMarker(lat, lon) {
    this.marker && this.marker.setMap && this.marker.setMap(null);
    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lon),
      map: this.map
    });
  }

  addToFavouritePlaces() {
    const { longitude, latitude } = this.markerCoordinates;
    this.getLocationOfMarker(latitude, longitude);
  }

  getLocationOfMarker(lat, lon) {
    this.geocoder.geocode({'location': new google.maps.LatLng(lat, lon)}, results => {
      if (results[0]) {
        const { formatted_address } = results[0];
        this.favouritePlaces.every(({ address }) => address !== formatted_address) &&
        this.favouritePlaces.push({
          address: formatted_address,
          longitude: lon,
          latitude: lat
        });
      } else {
        this.notifier.notify('error', 'Click on map to set marker before adding place to favourite');
      }
    });
  }

  getFavouritePlace(lat, lon) {
    this.setLocation(lat, lon);
  }

  deleteFavouritePlace(address) {
    this.favouritePlaces = this.favouritePlaces.filter(place => place.address !== address);
  }

}
