class Autocomplete {

    constructor(element, configuration) {
        this.events = [];
    }

    addListener (event, cb) {
        this.events.push({
            name: event,
            fn: cb
        });
    }

    getPlace () {
        return {};
    }
}


export default googleMock = {
    maps: {
        places: {
            Autocomplete: Autocomplete
        }
    }
}