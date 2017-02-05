import React from "react";
import { connect } from "react-redux"
import Form from "./Form";
import GMap from "./GMap";


@connect((store) => {
    return {
        destinations: store.destinations
    }
})
export default class Layout extends React.Component {

    // API KEY: AIzaSyBAFWLD0zvRsV6caGfjMsCoaX3_V-Go-4I

    render() {
        return (
            <div>
                <Form />
                <GMap />
            </div>
        )
    }

}