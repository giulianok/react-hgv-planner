import React from "react";
import GoogleMapsLoader from "google-maps";

// const mock = {
//     origin: 'Chicago, IL',
//     destination: 'Los Angeles, CA',
//     waypoints: [
//         {
//             location: 'Joplin, MO',
//             stopover: false
//         },{
//             location: 'Oklahoma City, OK',
//             stopover: true
//         }],
//     provideRouteAlternatives: false,
//     travelMode: 'DRIVING',
//     drivingOptions: {
//         departureTime: new Date(/* now, or future date */),
//         trafficModel: 'pessimistic'
//     },
//     unitSystem: google.maps.UnitSystem.IMPERIAL
// }

export default class GMap extends React.Component {

    componentDidMount() {
        GoogleMapsLoader.load((google) => {
            this.renderMap(google);
            this.setupServices();
        });
    }

    renderMap(google) {
        const mapElement = this.getMapElement();
        const options = {
            center: {
                lat: 55.378051,
                lng: -3.435973
            },
            zoom: 6
        };

        this.setState({
            map: new google.maps.Map(mapElement, options)
        });
    }

    setupServices() {
        this.setState({
            directionsService: new google.maps.DirectionsService(),
            directionsDisplay: new google.maps.DirectionsRenderer()
        });
    }

    getMapElement() {
        return document.getElementById('map');
    }

    renderRoutes(origin, destinations) {
        const {map, directionsDisplay} = this.state;
        const request = this.buildRequestObject(origin, destinations);

        this.clearRoutes();
        this.setupMap();
        this.displayRoutes(request);
    }

    clearRoutes() {
        const {directionsDisplay} = this.state;
        directionsDisplay.setMap(null);
    }

    setupMap() {
        const {directionsDisplay, map} = this.state;
        directionsDisplay.setMap(map);
    }

    buildRequestObject(origin, destinations) {
        return {
            origin: origin,
            destination: this.getDestination(destinations),
            waypoints: this.getWaypoints(destinations),
            travelMode: 'DRIVING'
        };
    }

    displayRoutes(request) {
        const {directionsDisplay, directionsService} = this.state;
        directionsService.route(request, function(result, status) {
            console.log('status', status);
            if (status == 'OK') {
                directionsDisplay.setDirections(result);
            }
        });
    }

    getDestination(destinations) { return destinations[destinations.length - 1]; }

    getWaypoints(destinations) {
        if (destinations.length <= 1)
            return null;

        destinations.pop();

        return destinations.map((destination) => {
            return {
                location: destination,
                stopover: true
            }
        })
    }

    render() {
        return (
            <div>
                <div id="map"></div>
            </div>
        )
    }

}