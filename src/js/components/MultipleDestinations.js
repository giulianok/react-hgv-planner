import React from "react";
import { connect } from "react-redux"
import Field from "./Field";
import {addMultipleDestination, deleteMultipleDestination} from "../actions/multipleDestinations.action";
import {changePlace, deleteDestinationPlace} from "../actions/place.action";

@connect((store) => {
    return {
        multipleDestinations: store.multipleDestinations
    }
})
export default class MultipleDestination extends React.Component {

    addDestination() {
        const { multipleDestinations } = this.props;

        this.props.dispatch(addMultipleDestination());
        this.props.dispatch(changePlace(this.getName(multipleDestinations.length), null));
    }

    deleteDestination() {
        this.props.dispatch(deleteMultipleDestination());
        this.props.dispatch(deleteDestinationPlace());
    }

    dynamicDestinations(multipleDestinations) {
        const {onChangePlace} = this.props;

        return multipleDestinations.map((value, i) => {
            const name = this.getName(i);
            let label = 'Destination';
            const removeButton = (i > 0 && i == multipleDestinations.length-1)
                ? <button class="button button__small button__danger" type="button" onClick={this.deleteDestination.bind(this, i)}>Delete Destination</button>
                : '';

            if (i > 0)
                label += ' ' + (i+1);

            return (
                <div key={i}>
                    <Field index={i} name={name} label={label} value={value} onChangePlace={onChangePlace} />
                    {removeButton}
                </div>
            );
        });
    }

    getName(index) {
        return `destination-${index}`;
    }

    generateAddButton() {
        const { multipleDestinations } = this.props;
        const limit = this.props.limit || 5;

        return (multipleDestinations.length < limit)
            ? <button class="button button__small button__primary" type="button" onClick={this.addDestination.bind(this)}>Add Destination</button>
            : '';
    }

    render() {
        const { multipleDestinations } = this.props;

        return (
            <div>
                {this.dynamicDestinations(multipleDestinations)}
                <div class="space"></div>
                {this.generateAddButton()}
            </div>
        )
    }

}