import React from "react";
import { connect } from "react-redux"
import Field from "./Field";
import MultipleDestinations from "./MultipleDestinations";


@connect((store) => {
    return {
        destinations: store.destinations
    }
})
export default class Form extends React.Component {

    onOriginChange() {

    }

    getInformation() {
        console.log(this.props);
    }

    render() {
        return (
            <div>
                <form action="#">
                    <fieldset>
                        <legend>Journeys Details</legend>

                        <Field name="origin" label="Origin" onChange={this.onOriginChange.bind(this)} />

                        <MultipleDestinations />

                        <button type="button" onClick={this.getInformation.bind(this)}>Plan Journey</button>
                    </fieldset>
                </form>
            </div>
        )
    }

}