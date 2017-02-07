import React from 'react';
import { connect } from 'react-redux';
import { shallow, mount, render } from 'enzyme';
import Field from "./../../src/js/components/Field";

describe("{Component} Field", function() {
    const $expectedHTML = (
        <div className="field">
            <label htmlFor="testing">Testing</label>
            <input id="testing" name="testing" type="text" placeholder="Testing" />
        </div>
    );

    it(`should render the correct HTML`, () => {
        expect(shallow(<Field name="testing" label="Testing" />).contains($expectedHTML)).toBe(true);
    });

    it(`should has the class 'field'`, function() {
        expect(shallow(<Field name="testing" label="Testing" />).is('.field')).toBe(true);
    });
});
