import React from "react";
import GoogleMapsLoader from "google-maps";
import { changePlace } from "../actions/place.action";
import { connect } from "react-redux"

@connect((store) => {
    return {
        place: store.place
    }
})
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
        const { name } = this.props;
        this.props.dispatch(changePlace(name, autocomplete.getPlace()));
    }

    render() {
        const { name, label } = this.props;

        return (
            <div class="field">
                <label for={name}>{label}</label>
                <input id={name} name={name} type="text" placeholder={label} />
            </div>
        )
    }

}