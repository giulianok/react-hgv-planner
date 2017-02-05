import React from "react";
import GoogleMapsLoader from "google-maps";


export default class GMap extends React.Component {

    componentDidMount() {
        const mapElement = document.getElementById('map');

        const options = {
            center: {
                lat: 55.378051,
                lng: -3.435973
            },
            zoom: 6
        };

        GoogleMapsLoader.load((google) => {
            new google.maps.Map(mapElement, options);
        });
    }

    geolocate() {

    }



    fillInAddress() {

    }

    render() {
        return (
            <div>
                <div id="map"></div>
                <div id="locationField">
                    <input id="autocomplete" placeholder="Enter your address" onFocus={this.geolocate.bind(this)} type="text"></input>
                </div>
            </div>
        )
    }

}