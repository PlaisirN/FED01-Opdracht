/**
 * Created by Plaisir on 12-6-2017.
 */
import _ from 'underscore';
import {Events} from 'backbone';
import Supermarkets from './collections/Supermarkets';
import States from './models/States';
import Map from './models/Map';
import Supermarket from './models/Supermarket';
import MapView from './views/MapView';
import SupermarketsView from './views/SupermarketsView';
import ShowResultsButton from './views/ShowResultsButton';

(function() {
    /**
     * Set global variables for the App
     */
    let setGlobalVariables = function() {
        window.App = {};
        App.events = _.clone(Events);
    };

    /**
     * Run after DOM is ready
     */

    let init = function() {
        setGlobalVariables();

        let statesModel = new States();
        let supermarketsCollection = new Supermarkets();
        let mapModel = new Map();
        let supermarketModel = new Supermarket();

        new MapView({el: "#map", model: mapModel});
        new SupermarketsView({el: "#supermarkets", collection: supermarketsCollection, model: supermarketModel});
        new ShowResultsButton({el: "#showSupermarketsButton", model: mapModel});
    };
    window.addEventListener('load', init);
})();