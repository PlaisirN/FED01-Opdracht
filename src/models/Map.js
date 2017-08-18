import {Model} from 'backbone';

/**
 * Model for the Google Map
 *
 * @constructor
 */
const Map = Model.extend({
    mapLat: 52.152767,
    mapLng: 5.397034,
    zoom: 8,
    markerLat: "",
    markerLng: "",
    circleBounds: ""
});

export default Map;