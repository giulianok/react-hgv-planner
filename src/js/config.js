import GoogleMapsLoader from "google-maps";

export function initMapConfiguration() {
    GoogleMapsLoader.KEY = 'AIzaSyCyRzJmtAsAN_sCLMH-b7sJ5umk0zo1LKU';
    GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];
}