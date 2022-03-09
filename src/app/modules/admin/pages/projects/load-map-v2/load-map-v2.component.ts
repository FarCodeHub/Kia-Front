/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable eqeqeq */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable space-before-function-paren */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-var */
import { EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Component, Inject } from '@angular/core';

declare var ol: any;

@Component({
    selector: 'app-load-map-v2',
    templateUrl: './load-map-v2.component.html',
    styleUrls: ['./load-map-v2.component.scss'],
})
export class LoadMapV2Component implements OnInit {
    @Output() public locationChange = new EventEmitter<number[]>();
    _latLong: number[];
    @Input()
    set latLong(value: number[]) {
        if (value[0] != 0) {
            this.latitude = value[1];
            this.longitude = value[0];
        }

        //  this.setCenter();
        this.addMarker(this.longitude, this.latitude);
    };



    latitude: number = 35.68778573961106;
    longitude: number = 51.38519287022063;

    map: any;
    constructor(private route: ActivatedRoute) {
        if (this.route.snapshot.params['lat'] != undefined) {
            this.latitude = JSON.parse(this.route.snapshot.params['lat']);
            this.longitude = JSON.parse(this.route.snapshot.params['lng']);
        }
        else if (this._latLong != undefined || this._latLong != null) {
            this.latitude = this._latLong[0];
            this.longitude = this._latLong[1];
        }
        else {
            this.latitude = 35.68778573961106;
            this.longitude = 51.38519287022063;
        }
    }

    markerSource = new ol.source.Vector();
    marketLocation: any;
    ngOnInit(): void {
        this.map = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM(),
                }),
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([
                    this.longitude, this.latitude,
                ]),
                zoom: 10,
            }),
        });

        this.addMarker(this.longitude, this.latitude);
        var me = this;
        this.map.on('click', function (args) {
            console.log(args.coordinate);
            var lonlat = ol.proj.transform(
                args.coordinate,
                'EPSG:3857',
                'EPSG:4326'
            );
            console.log(lonlat);

            var lon = lonlat[0];
            var lat = lonlat[1];
            console.log('lon:', lon);
            console.log('lat:', lat);
            me.locationChange.emit([lon, lat]);

            me.addMarker(lon, lat);
        });
    }

    addMarker(lon, lat) {
        this.map
            .getLayers()
            .getArray()
            .filter((l1) => l1.get('name') === 'Marker')
            .forEach((l) => this.map.removeLayer(l));

        const markerStyle = new ol.style.Style({
            image: new ol.style.Icon(
                /** @type {olx.style.IconOptions} */ {
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: 'assets/icons/marker.png',
                }
            ),
        });

        var layer = new ol.layer.Vector({
            name: 'Marker',
            source: new ol.source.Vector({
                features: [
                    new ol.Feature({
                        geometry: new ol.geom.Point(
                            ol.proj.fromLonLat([lon, lat])
                        ),
                    }),
                ],
            }),
            style: markerStyle,
        });
        this.map.addLayer(layer);
    }

    setCenter() {
        var view = this.map.getView();
        view.setCenter(ol.proj.fromLonLat([this.longitude, this.latitude]));
        view.setZoom(10);
    }
}
