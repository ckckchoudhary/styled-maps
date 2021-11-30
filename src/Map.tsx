

import React, { Component } from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { osterbroGeoJson } from './OsterbroGeoJson';
import { copanhagenDistrictsGeoJson } from './CopanhagenDistrictsGeoJson';
import { MAP_API_KEY } from './Configs';


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
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative.province",
            "elementType": "all",
            "stylers": [
              {
                "visibility": "on"
              },
              {
                color: "red"
              }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
              {
                "color": "#EDEDE3"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
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
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [
              {
                "visibility": "on"
              }
            ]
          },

          {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [
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
                "visibility": "simplified"
              },
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "water",
            "stylers": [
              {
                "color": "#DCDCC8"
              }
            ]
          },
          { "featureType": "road.highway", elementType: "labels", stylers: [{ visibility: "off" }] }, //turns off highway labels
          { "featureType": "road.arterial", elementType: "labels", stylers: [{ visibility: "off" }] }, //turns off arterial roads labels
          { "featureType": "road.local", elementType: "labels", stylers: [{ visibility: "off" }] }  //turns off local roads labels
        ],
        streetViewControl: false,
        panControl: false,
        mapTypeControl: false,
      });




      const labelsList = [
        { position: { lat: 55.6991, lng: 12.55423 }, title: "NØRREBRO", marker: undefined },
        { position: { lat: 55.6771, lng: 12.5133 }, title: "FREDERIKSBERG", marker: undefined },
        { position: { lat: 55.7092, lng: 12.5775 }, title: "Østerbro", marker: undefined },
        { position: { lat: 55.6801, lng: 12.5800 }, title: "INDRE BY", marker: undefined },
        { position: { lat: 55.6639, lng: 12.5425 }, title: "VESTERBRO", marker: undefined },

      ]

      labelsList.forEach((labelsList) => {
        const { position, title } = labelsList;
        labelsList.marker = new google.maps.Marker({
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

      const lineSymbol = {
        path: google.maps.SymbolPath.CIRCLE,
        fillOpacity: 1,
        scale: 2,
        strokeColor: '#ffffff'
      };


      const lineCoordinates: Array<any> = [];
      let drawnPolylineDotted: any;
      copanhagenDistrictsGeoJson.features.forEach(({ geometry, properties }) => {
        let districtBorders = geometry.coordinates[0][0].filter((x, i) => i % 10 === 0).map((d) => ({ lat: d[1], lng: d[0] }));
        const polylineDotted = new google.maps.Polyline({
          strokeColor: '#ffffff',
          strokeOpacity: 0.5,
          // icons: [{
          //   icon: lineSymbol,
          //   offset: '0',
          //   repeat: '10px'
          // }],
          path: districtBorders,
          map: map
        });
        // // const polygon = new google.maps.Polygon({
        // //   paths: districtBorders,
        // //   strokeColor: "transparent",
        // //   strokeOpacity: 0.8,
        // //   strokeWeight: 2,
        // //   fillColor: "transparent",
        // //   fillOpacity: 0.35,
        // //   map: map
        // // });
        // polygon.addListener("click", (mapsMouseEvent: any) => {
        //   console.log(properties);
        // });


        polylineDotted.addListener("click", (mapsMouseEvent: any) => {
          const lineSymbolDrawn = {
            path: google.maps.SymbolPath.CIRCLE,
            fillOpacity: 1,
            scale: 2,
            strokeColor: '#000000'
          };
          const position = { lat: mapsMouseEvent.latLng.lat(), lng: mapsMouseEvent.latLng.lng() };
          lineCoordinates.push(position);
          console.clear();
          console.log(JSON.stringify(lineCoordinates));
          if (drawnPolylineDotted) {
            drawnPolylineDotted.setMap(null);
          }
          drawnPolylineDotted = new google.maps.Polyline({
            strokeColor: '#00000',
            strokeOpacity: 1,
            icons: [{
              icon: lineSymbolDrawn,
              offset: '0',
              repeat: '10px'
            }],
            path: lineCoordinates,
            map: map
          });
        });

      });

      document.addEventListener("keypress", (mapsKeyboardEvent: KeyboardEvent) => {
        console.log(mapsKeyboardEvent);
      })
      map.addListener("click", (mapsMouseEvent: any) => {
        const lineSymbolDrawn = {
          path: google.maps.SymbolPath.CIRCLE,
          fillOpacity: 1,
          scale: 2,
          strokeColor: '#000000'
        };
        const position = { lat: mapsMouseEvent.latLng.lat(), lng: mapsMouseEvent.latLng.lng() };
        lineCoordinates.push(position);
        console.clear();
        console.log(JSON.stringify(lineCoordinates));
        if (drawnPolylineDotted) {
          drawnPolylineDotted.setMap(null);
        }
        drawnPolylineDotted = new google.maps.Polyline({
          strokeColor: '#000000',
          strokeOpacity: 0,
          icons: [{
            icon: lineSymbolDrawn,
            offset: '0',
            repeat: '10px'
          }],
          path: lineCoordinates,
          map: map
        });
      });
    }, 200);
    // @ts-ignore


  }

  render() {
    return (
      <Wrapper apiKey={MAP_API_KEY}>
        <div ref={ref => this.mapContainer = ref} style={{ width: window.innerWidth, height: window.innerHeight }}>

        </div>
      </Wrapper>
    );
  }
}

export default Map;


