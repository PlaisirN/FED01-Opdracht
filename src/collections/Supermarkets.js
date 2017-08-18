import {Collection} from 'backbone';
import Supermarket from '../models/Supermarket';

/**
 * Collection for the matches endpoint
 *
 * @constructor
 */
const Supermarkets = Collection.extend({
    url: 'http://kroonwijk.azure-mobile.net/tables/stores'
});

export default Supermarkets;