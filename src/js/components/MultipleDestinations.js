import React from "react";
import { connect } from "react-redux"
import Field from "./Field";
import {addDestination, deleteDestination} from "../actions/destinations.action";

@connect((store) => {
    return {
        destinations: store.destinations
    }
})
export default class MultipleDestination extends React.Component {

    addDestination() {
        this.props.dispatch(addDestination());
    }

    deleteDestination(index) {
        this.props.dispatch(deleteDestination())
    }

    onDestinationChange(index, event) {
        this.props.destinations[index] = event.target.value;
    }

    dynamicDestinations(destinations) {
        return destinations.map((value, i) => {
            const name = `destination-${i}`;
            const removeButton = (i == destinations.length-1)
                ? <button type="button" onClick={this.deleteDestination.bind(this, i)}>Remove</button>
                : '';
            return (
                <div key={i}>
                    <Field index={i} name={name} label="Destination" value={value} onChange={this.onDestinationChange.bind(this)} />
                    {removeButton}
                </div>
            );
        });
    }

    render() {
        const { destinations } = this.props;

        return (
            <div>
                {this.dynamicDestinations(destinations)}
                <button type="button" onClick={this.addDestination.bind(this)}>Add Destination</button>
            </div>
        )
    }

}