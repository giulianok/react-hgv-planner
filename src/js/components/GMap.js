import React from "react";
import GoogleMapsLoader from "google-maps";

export default class GMap extends React.Component {

    constructor() {
        super();
        GoogleMapsLoader.load((google) => {
            this.renderMapAndSetupServices(google);
        });
    }

    renderMapAndSetupServices(google) {
        const mapElement = this.getMapElement();
        const options = {
            center: {
                lat: 55.378051,
                lng: -3.435973
            },
            zoom: 6,
            styles: this.getStyles()
        };

        this.setState({
            map: new google.maps.Map(mapElement, options),
            directionsService: new google.maps.DirectionsService(),
            directionsDisplay: new google.maps.DirectionsRenderer(),
            distanceMatrixService: new google.maps.DistanceMatrixService()
        });
    }

    getStyles() {
        return [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}]
    }

    getMapElement() { return document.getElementById('map'); }

    renderRoutes(origin, destinations) {
        const request = this.buildRequestObject(origin, destinations);

        this.clearRoutes();
        this.setupMap();
        this.displayRoutes(request);
        this.getETA(origin, destinations);
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
        destinations = Array.from(destinations);
        return {
            origin: origin,
            destination: this.getDestination(destinations),
            waypoints: this.getWaypoints(destinations),
            travelMode: 'DRIVING',
            drivingOptions: {
                departureTime: new Date()
            }
        };
    }

    displayRoutes(request) {
        const {directionsDisplay, directionsService} = this.state;
        directionsService.route(request, function(result, status) {
            console.log(result);
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

    getETA(origin, destinations) {
        const {distanceMatrixService} = this.state;
        const request = {
            origins: [origin],
            destinations: destinations,
            travelMode: 'DRIVING'
        };
        distanceMatrixService.getDistanceMatrix(request, (response, status) => {
            this.buildETAview(response);
        })
    }

    buildETAview(data) {
        const {rows} = data;

        console.log(data);

        let html = rows.map((row, i) => {
            const {elements} = row;
            const test = elements.map((element, z) => {
                return <li key={z}>
                    <div class="map-eta-point">{data.destinationAddresses[z]}</div>
                    <div class="map-eta-time">{element.duration.text}</div>
                </li>;
            });

            return (<li key={i}>
                <ul>
                    {test}
                </ul>
            </li>);
        });

        html = <div class="map-eta">
            <div class="map-eta-title">Origin:</div>
            <div class="map-eta-point">{data.originAddresses[0]}</div>
            <div class="space"></div>
            <div class="map-eta-title">Destination:</div>
            <ul>
                {html}
            </ul>
        </div>;

        this.setState({
            eta: html
        })
    }

    render() {
        const eta = (this.state && this.state.eta) ? this.state.eta : null;

        return (
            <div class="layout-map">
                <div id="map" class="map"></div>
                {eta}
            </div>
        )
    }

}