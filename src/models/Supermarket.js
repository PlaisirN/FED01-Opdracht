import {Model} from 'backbone';

/**
 * Model for every match in the collection
 *
 * @constructor
 */
const Supermarket = Model.extend({
    urlLat: "",
    urlLng: "",
    buttonClicked: false
});

export default Supermarket;