import React from "react";
import { connect } from "react-redux"
import GMap from "./GMap";
import Field from "./Field";
import MultipleDestinations from "./MultipleDestinations";


@connect((store) => {
    return {
        place: store.place
    }
})
export default class Layout extends React.Component {

    // API KEY: AIzaSyBAFWLD0zvRsV6caGfjMsCoaX3_V-Go-4I

    componentDidMount() {
    }

    getInformation() {
        console.log('getting info...');
        const {origin, destinations} = this.props.place;

        if (!this.isOriginValid(origin) || !this.areDestinationsValid(destinations)) {
            alert(`Please complete the Origin and Destination(s) with real UK location`);
            return;
        }

        const originConverted = this.convertPlaceToLatLng(origin);
        const destinationsConverted = destinations.map(d => this.convertPlaceToLatLng(d));

        this.refs.map.renderRoutes(originConverted, destinationsConverted);
    }

    isOriginValid(origin) { return this.isValidPlace(origin); }

    areDestinationsValid(destinations) {
        for (const index in destinations) {
            if (!destinations[index]) {
                return false;
            }
        }
        return true;
    }

    isValidPlace(place) {
        if (!place) {
            return false;
        }
        return true;
    }

    convertPlaceToLatLng(place) { return new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng()); }

    render() {
        return (
            <div>
                <form action="#">
                    <fieldset>
                        <legend>Journeys Details</legend>

                        <Field name="origin" label="Origin" />

                        <MultipleDestinations limit="4" />

                        <button type="button" onClick={this.getInformation.bind(this)}>Plan Journey</button>
                    </fieldset>
                </form>
                <GMap ref="map" />
            </div>
        )
    }

}