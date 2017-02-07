import React from "react";
import GoogleMapsLoader from "google-maps";
import { connect } from "react-redux"

export default class Field extends React.Component {

    componentDidMount() {
        GoogleMapsLoader.load(google => this.initAutocomplete(google));
    }

    initAutocomplete(google) {
        const { name } = this.props;
        const element = document.getElementById(name);
        let autocomplete;

        autocomplete = new google.maps.places.Autocomplete(
            element,
            {
                types: ['geocode'],
                componentRestrictions: {
                    country: "UK"
                }
            }
        );

        autocomplete.addListener('place_changed', () => {
            this.fillInAddress(autocomplete);
        });
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