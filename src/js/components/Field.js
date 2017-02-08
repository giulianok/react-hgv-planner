import React from "react";
import GoogleMapsLoader from "google-maps";
import { connect } from "react-redux"

export default class Field extends React.Component {

    componentDidMount() {
        GoogleMapsLoader.load(this.initAutocomplete.bind(this));
    }

    initAutocomplete(google) {
        const { name } = this.props;
        const element = document.getElementById(name);
        const autocomplete = this.getAutocomplete(google, element);
        this.placeChangedListener(autocomplete, this.placeChangedHandler.bind(this, autocomplete));
    }

    getAutocomplete(google, element) {
        return new google.maps.places.Autocomplete(
            element,
            {
                types: ['geocode'],
                componentRestrictions: {
                    country: "UK"
                }
            }
        )
    }

    placeChangedListener(autocomplete, handler) {
        autocomplete.addListener('place_changed', handler);
    }

    placeChangedHandler(autocomplete) {
        this.fillInAddress(autocomplete);
    }

    fillInAddress(autocomplete) {
        const { name, onChangePlace } = this.props;
        onChangePlace(name, autocomplete.getPlace());
    }

    render() {
        const { name, label } = this.props;

        return (
            <div className="field">
                <label htmlFor={name}>{label}</label>
                <input id={name} name={name} type="text" placeholder={label} />
            </div>
        )
    }

}