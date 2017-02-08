import React from 'react';
import { connect } from 'react-redux';
import { shallow, mount, render } from 'enzyme';
import GoogleMapsLoader from "google-maps";
import Field from "./../../src/js/components/Field";
import googleMock from "../_utils/googleMock";

describe(`{Component} Field`, () => {

    describe(`Render expectations`, () => {
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

    describe(`{Method} componentDidMount`, () => {
        it(`should be called after mount the Component`, () => {
            const spy = spyOn(Field.prototype, 'componentDidMount');
            mount(<Field />);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        it(`should call the method 'load' of 'GoogleMapsLoader'`, () => {
            spyOn(GoogleMapsLoader, 'load');
            mount(<Field />);

            expect(GoogleMapsLoader.load).toHaveBeenCalledTimes(1);
        });

        it(`should load Google Maps API and call 'initAutocomplete' method`, () => {
            spyOn(GoogleMapsLoader, 'load');
            spyOn(Field.prototype, 'initAutocomplete');

            mount(<Field />);

            GoogleMapsLoader.load.calls.argsFor(0)[0]();

            expect(Field.prototype.initAutocomplete).toHaveBeenCalled();
        });
    });

    describe(`{Method} initAutocomplete`, () => {
        it(`should call the methods 'getAutocomplete' and 'placeChangedListener'`, () => {
            spyOn(Field.prototype, 'getAutocomplete');
            spyOn(Field.prototype, 'placeChangedListener');

            const wrapper = mount(<Field name="test" />);

            wrapper.instance().initAutocomplete(googleMock);

            expect(Field.prototype.getAutocomplete).toHaveBeenCalledTimes(1);
            expect(Field.prototype.placeChangedListener).toHaveBeenCalledTimes(1);
        });
    });

    describe(`{Method} getAutocomplete`, () => {
        it(`should create a new instance of 'google Autocomplete'`, () => {
            spyOn(googleMock.maps.places, 'Autocomplete');

            const wrapper = mount(<Field name="test" />);
            const $element = <input />;
            const configuration = {
                types: ['geocode'],
                componentRestrictions: {
                    country: "UK"
                }
            };

            wrapper.instance().getAutocomplete(googleMock, $element);

            expect(googleMock.maps.places.Autocomplete).toHaveBeenCalledWith($element, configuration);
        });
    });

    describe(`{Method} placeChangedListener`, () => {
        it(`should create a listener 'place_changed' using the method 'addListener' of Autocomplete`, () => {
            spyOn(googleMock.maps.places.Autocomplete.prototype, 'addListener');

            const wrapper = mount(<Field />);

            wrapper.instance().placeChangedListener(new googleMock.maps.places.Autocomplete());

            expect(googleMock.maps.places.Autocomplete.prototype.addListener).toHaveBeenCalledTimes(1);
        });

        it(`should call the method 'fillInAddress' after fire the event 'place_changed'`, () => {
            const wrapper = mount(<Field />);
            const autocomplete = new googleMock.maps.places.Autocomplete();
            const placeChangedListener = wrapper.instance().placeChangedListener;

            spyOn(autocomplete, 'addListener');

            placeChangedListener(autocomplete);

            expect(autocomplete.addListener).toHaveBeenCalledTimes(1)
        });
    });

    describe(`{Method} fillInAddress`, () => {
        it(`should call the function 'onChangePlace' passed in Props`, () => {
            window.mockFn = function () {
                console.log('dada')
            };
            spyOn(window, 'mockFn');

            const name = 'testing-name';
            const autocomplete = new googleMock.maps.places.Autocomplete();
            const wrapper = mount(<Field name={name} onChangePlace={mockFn} />);

            wrapper.setProps({
                onChangePlace: window.mockFn
            });

            wrapper.instance().fillInAddress(autocomplete);

            expect(mockFn).toHaveBeenCalledTimes(1);
            expect(mockFn).toHaveBeenCalledWith(name, autocomplete.getPlace());
        });
    });

});
