export function changePlace(inputName, data) {
    switch (inputName) {
        case "origin": {
            return {
                type: "CHANGE_ORIGIN_PLACE",
                name: inputName,
                payload: data
            };
        }
        default: {
            return {
                type: "CHANGE_DESTINATION_PLACE",
                name: inputName,
                payload: data
            }
        }
    }
}

export function deleteDestinationPlace() {
    return {
        type: 'DELETE_DESTINATION_PLACE'
    }
}