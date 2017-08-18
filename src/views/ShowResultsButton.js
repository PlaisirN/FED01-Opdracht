import {View} from 'backbone';
import ParkingSpots from '../collections/Supermarkets';
import ParkingSpot from '../models/Supermarket';
import ParkingSpotsView from './SupermarketsView';

/**
 * Object representing the ShowResultsButton
 *
 * @Constructor
 */
const ShowResultsButton = View.extend({
    events: {
        'click': 'clickHandler'
    },
    /**
     * Click handler for the $el
     *
     * @param e
     */
    clickHandler: function (e) {
        e.preventDefault();
        this.model.set({buttonClicked: false});
        this.model.set({buttonClicked: true});
        this.getCoordinates();
    },

    /**
     * Get the marker coordinates.
     */
    getCoordinates: function () {
        let parkingSpot = new ParkingSpot();
        let parkingSpots = new ParkingSpots();
        new ParkingSpotsView({
            el: '#supermarkets',
            collection: parkingSpots,
            models: parkingSpot,
            urlLat: this.model.get('markerLat'),
            urlLng: this.model.get('markerLng'),
            circleBounds: this.model.get('circleBounds'),
            buttonClicked: true
        });
    }
});

export default ShowResultsButton;