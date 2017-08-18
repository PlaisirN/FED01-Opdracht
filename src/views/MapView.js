import {View} from 'backbone';

//Declaring variables
let marker;
let self;
let circle;
const button = document.getElementById("showSupermarketsButton");


/**
 * Object representing the MapView
 *
 * @Constructor
 */
const MapView = View.extend({

    /**
     * Initialize function
     */
    initialize: function() {
        //Initialize variables
        self = this;
        button.disabled = false;

        // Create a map object and specify the DOM element for display.
        let map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: this.model.mapLat, lng: this.model.mapLng},
            zoom: this.model.zoom,
            disableDefaultUI: true,
            styles: [
                {
                    "featureType": "landscape",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "landscape.man_made",
                    "stylers": [
                        {
                            "color": "#faf9fa"
                        },
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit.line",
                    "stylers": [
                        {
                            "color": "#f3ded5"
                        },
                        {
                            "visibility": "on"
                        },
                        {
                            "weight": 5
                        }
                    ]
                },
                {
                    "featureType": "transit.station.rail",
                    "stylers": [
                        {
                            "color": "#f3ded5"
                        },
                        {
                            "weight": 5
                        }
                    ]
                },
                {
                    "featureType": "transit.station.rail",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f3ded5"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "transit.station.rail",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#f3ded5"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "transit.station.rail",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#f3ded5"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "stylers": [
                        {
                            "color": "#e0f3f7"
                        },
                        {
                            "saturation": -35
                        },
                        {
                            "lightness": 5
                        }
                    ]
                }
            ]

        });

        /**
         * Click handler for when clicked somewhere on the Google Map
         *
         * @param e
         */
        google.maps.event.addListener(map, 'click', function(e) {
            //Check if a marker has been placed. If no, place a marker. If yes, replace the previous marker with the new coordinates.
            if ( marker ) {
                marker.setPosition(e.latLng);
            } else {
                marker = new google.maps.Marker({
                    position: e.latLng,
                    map: map
                });

            }

            // Add circle overlay and bind to marker
            circle = new google.maps.Circle({
                map: map,
                radius: 30000,
                fillColor: '#AA0000',
                fillOpacity: .1,
            });
            circle.bindTo('center', marker, 'position');

            // Get the bounds
            let bounds = circle.getBounds();

            //Set the marker coordinates and the bounds coordinates in the model.
            self.model.set({markerLat: marker.getPosition().lat()});
            self.model.set({markerLng: marker.getPosition().lng()});
            self.model.set({circleBounds: bounds});

        });
    }
});

export default MapView;