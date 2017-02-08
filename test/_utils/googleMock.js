class Autocomplete {

    constructor(element, configuration) {
    }

    addListener (event, cb) {
        cb();
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