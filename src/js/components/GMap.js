import React from "react";
import GoogleMapsLoader from "google-maps";


export default class GMap extends React.Component {

    constructor() {
        super();
        GoogleMapsLoader.KEY = 'AIzaSyCyRzJmtAsAN_sCLMH-b7sJ5umk0zo1LKU';
        GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];
    }

    // API KEY: AIzaSyBAFWLD0zvRsV6caGfjMsCoaX3_V-Go-4I

    componentDidMount() {
        const mapElement = document.getElementById('map');

        const options = {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
        };

        GoogleMapsLoader.load((google) => {
            new google.maps.Map(mapElement, options);
        });
    }

    render() {
        return (
            <div>
                <div id="map"></div>
            </div>
        )
    }

}