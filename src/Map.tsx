

import React, { Component } from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { osterbroGeoJson } from './OsterbroGeoJson';
import { copanhagenDistrictsGeoJson } from './CopanhagenDistrictsGeoJson';


interface MapProps {

}

interface MapState {
  // @ts-ignore
  displayedMap: google.maps.Map
}

class Map extends Component<MapProps, MapState> {

  private mapContainer: React.ReactNode;

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      // @ts-ignore
      const google = window.google;
      const copanhagen = { lat: 55.676098, lng: 12.568337 };
      // @ts-ignore
      let map = new google.maps.Map(this.mapContainer, {
        zoom: 13.45,
        center: copanhagen,
        gestureHandling: "none",
        zoomControl: false,
        styles: [
          {
            "featureType": "administrative",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative.province",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
              {
                "saturation": -100
              },
              {
                "lightness": 65
              },
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
              {
                "saturation": -100
              },
              {
                "lightness": "50"
              },
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
              {
                "saturation": "-100"
              },
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
              {
                "visibility": "on"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [
              {
                "lightness": "30"
              },
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [
              {
                "lightness": "40"
              },
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
              {
                "saturation": -100
              },
              {
                "visibility": "simplified"
              },
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "hue": "#ffff00"
              },
              {
                "lightness": -25
              },
              {
                "saturation": -97
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
              {
                "lightness": -25
              },
              {
                "saturation": -100
              }
            ]
          }
        ],
        streetViewControl: false,
        panControl: false,
        mapTypeControl: false,
      });

      


      const labelsList = [
        { position: { lat: 55.6991, lng: 12.55423 }, title: "NØRREBRO" },
        { position: { lat: 55.6771, lng: 12.5133 }, title: "FREDERIKSBERG" },
        { position: { lat: 55.7092, lng: 12.5775 }, title: "Østerbro" },
        { position: { lat: 55.6801, lng: 12.5800 }, title: "INDRE BY" },
        { position: { lat: 55.6639, lng: 12.5425 }, title: "VESTERBRO" },

      ]

      labelsList.forEach(({ position, title }) => {
        const NØRREBRO = new google.maps.Marker({
          position,
          map,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 20,
            fillColor: "lightgrey",
            fillOpacity: 1.0,
            strokeWeight: 3,
            strokeOpacity: 0.8,
            strokeColor: "black",
            rotation: 30
          }
        });
        const NØRREBROInner = new google.maps.Marker({
          position,
          map,
          label: {
            text: title,
            fontSize: "20px",
            fontWeight: "bold"
          },
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "black",
            fillOpacity: 1.0,
            strokeWeight: 3,
            strokeOpacity: 0.8,
            strokeColor: "black",
            rotation: 30,
            labelOrigin: new google.maps.Point(1.5, 3.5),
          }
        });
      })


      const outerCoords = [...osterbroGeoJson
      ];


      

      const lineSymbol = {
        path: google.maps.SymbolPath.CIRCLE,
        fillOpacity: 1,
        scale: 2
      };

      // const polylineDotted = new google.maps.Polyline({
      //   strokeColor: '#000000',
      //   strokeOpacity: 0,
      //   icons: [{
      //     icon: lineSymbol,
      //     offset: '0',
      //     repeat: '10px'
      //   }],
      //   path: outerCoords,
      //   map: map
      // });

      copanhagenDistrictsGeoJson.features.forEach(({ geometry, properties }) => {
        let districtBorders = geometry.coordinates[0][0].map((d)=>({lat:d[1], lng:d[0]}));
        const polylineDotted = new google.maps.Polyline({
          strokeColor: '#000000',
          strokeOpacity: 0,
          icons: [{
            icon: lineSymbol,
            offset: '0',
            repeat: '10px'
          }],
          path: districtBorders,
          map: map
        });
        const polygon = new google.maps.Polygon({
        paths: districtBorders, 
        strokeColor: "transparent",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "transparent",
        fillOpacity: 0.35,
        map: map
      });
        polygon.addListener("click", (mapsMouseEvent: any) => {
            console.log(properties);
          });
      });

      // polygon.setMap(map);

      // map.addListener("click", (mapsMouseEvent: any) => {
      //   alert(`Clicked -> latitude: ${mapsMouseEvent.latLng.lat()}, longitude: ${mapsMouseEvent.latLng.lng()} `);
      // });

     
    }, 200);
    // @ts-ignore

  }

  render() {
    return (
      <Wrapper apiKey="AIzaSyAsP_Uz4aLEKF1WYeuhye2aKIiCT6BIKfY">
        <div ref={ref => this.mapContainer = ref} style={{ width: window.innerWidth, height: window.innerHeight }}>

        </div>
      </Wrapper>
    );
  }
}

export default Map;