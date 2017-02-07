import React from "react";
import { connect } from "react-redux"
import { changePlace } from "../actions/place.action";
import GMap from "./GMap";
import Field from "./Field";
import MultipleDestinations from "./MultipleDestinations";

@connect((store) => {
    return {
        place: store.place
    }
})
export default class Layout extends React.Component {

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

    onChangePlace(name, place) { this.props.dispatch(changePlace(name, place)); }

    render() {
        return (
            <div class="layout-wrapper">
                <form class="layout-form" action="#">
                    <fieldset class="planner">
                        <legend class="planner-title">Journeys Details</legend>
                        <div class="planner-body">
                            <Field name="origin" label="Origin" onChangePlace={this.onChangePlace.bind(this)} />
                            <MultipleDestinations limit="4" onChangePlace={this.onChangePlace.bind(this)} />
                            <div class="planner-body-button">
                                <button class="button" type="button" onClick={this.getInformation.bind(this)}>Plan Journey</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
                <GMap ref="map" />
            </div>
        )
    }

}