import {View} from 'backbone';

//Declare variables
let theSpots = [];
let brand;
let name;
let address;
let city;
let zipcode;
let phone;
let storeLatitude;
let storeLongitude;
let myModel;

/**
 * Object representing the SupermarketsView
 *
 * @Constructor
 */
const SupermarketsView = View.extend({

    /**
     * Initialize function
     */
    initialize: function(attributes) {
        //Initialize variables
        this.options = attributes;

        //Check if button clicked
        if (this.options.buttonClicked) {
            //Load the supermarkets
            this.loadSupermarkets();
        }
    },


    /**
     * Load the supermarkets function
     */
    loadSupermarkets: function () {
        // console.log(this.options.urlLat, this.options.urlLng, this.options.circleBounds);

        //Fetch the collection
        this.collection.fetch({
            success: (collection) =>
                this.loadSupermarketsSuccessHandler(collection),
            error: (collection, response) =>
                this.loadSupermarketsErrorHandler(collection, response)
        });
    },


    /**
     * Success Handler will add HTML of the supermarkets to this $el
     *
     * @param collection
     */
    loadSupermarketsSuccessHandler: function (collection) {

        //Initialize variables. Everytime the button is clicked, clear the array for the new items.
        theSpots = [];

        //Loop through the API data.
        for (let i = 0; i < collection.models.length; i++) {

            //Initialize variables
            myModel = collection.models[i];

            //Get the lat and lng from each supermarket
            storeLatitude = myModel.attributes.latitude;
            storeLongitude = myModel.attributes.longitude;

            //Check location from all supermarkets. Check if there are some supermarkets inside of the bounds (red circle).
            if(this.options.circleBounds.contains(new google.maps.LatLng(storeLatitude, storeLongitude))){

                //Initialize variables
                brand = myModel.attributes.brand;
                name = myModel.attributes.name;
                address = myModel.attributes.address;
                city = myModel.attributes.city;
                zipcode = myModel.attributes.zipcode;
                phone = myModel.attributes.phone;

                //Add data to the theSpots array.
                theSpots.push("<li class='supermarket'>" + brand + " - " + name +
                    "<br><p class='gegevens'>Adres: " + address +
                    "</p>" + "<p class='gegevens'>Postcode: " + zipcode + " Plaats: " + city +
                    "</p>" + "<p class='gegevens'>Contactnummer: " + phone +
                    "</p></li>");
            }

        }

        //Check if the array is empty.
        if (theSpots.length == 0) {
            theSpots.push("<p>Er is geen C1000 gevonden in deze buurt...</p>");
        }

        //Add the supermarkets to this $el.
        this.$el.html(
            "<p>" +
            theSpots.join("") +
            "</p>"
        )
    },

    /**
     * On error, show error message in this $el
     *
     * @param collection
     * @param response
     */
    loadSupermarketsErrorHandler: function (collection, response)
    {
        //Add error message to this $el
        this.$el.html(
            "<p>" +
            response.responseJSON.error +
            "</p>"
        );
    }
});

export default SupermarketsView;
