/// <reference path="../../../../../../node_modules/@types/googlemaps/index.d.ts"/>
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter, switchMap, tap} from 'rxjs/internal/operators';
import {HttpService} from '../../../../services/http.service';
declare let google: any;

@Component({
  selector: 'app-postcodes',
  templateUrl: './postcodes.component.html',
  styleUrls: ['./postcodes.component.css']
})
export class PostcodesComponent implements OnInit, OnDestroy {

  map: google.maps.Map;

  @ViewChild('gmap') gmapElement: any;
  @ViewChild('activeInput') activeInput: any;

  private subscribes = [];
  private coordinates = {
    latitude: 0,
    longitude: 0
  };

  public search = new FormControl('');
  public listOfPostcodes;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(({ coords : { latitude, longitude }}) => {
        this.coordinates.latitude = latitude;
        this.coordinates.longitude = longitude;
        this.myLocation();
      });
    }

    this.subscribes.push(this.search.valueChanges
      .pipe(
        tap(text => {
          if (text.length === 0) {
            this.listOfPostcodes = [];
          }
        }),
        filter(text => text.length > 0),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap(postcode => this.httpService.autocompletePostcode(postcode))
      )
      .subscribe(({ result }) => {
          this.listOfPostcodes = result;
        },
        err => {
          console.error(err);
        }));
  }

  ngOnDestroy() {
    this.subscribes.length && this.subscribes.forEach(sub => sub.unsubscribe());
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

  getLocation(event, postcode) {
    if (event.source.selected) {
      this.subscribes.push(this.httpService.lookupPostcode(postcode)
        .subscribe( ({result : { latitude, longitude }}) => {
            this.myLocation(latitude, longitude);
          },
          err => console.error(err)));
    }
  }

}
