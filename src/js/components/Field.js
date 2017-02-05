import React from "react";

export default class Field extends React.Component {

    render() {
        const { name, label, onChange, index } = this.props;

        return (
            <div class="field">
                <label for={name}>{label}</label>
                <input id={name} name={name} type="text" placeholder={label} onChange={onChange.bind(this, index)} />
            </div>
        )
    }

}