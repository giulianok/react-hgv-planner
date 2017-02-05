export function addDestination() {
    return {
        type: "ADD_DESTINATION",
        payload: ""
    }
}

export function deleteDestination(index) {
    return {
        type: "DELETE_DESTINATION",
        payload: index
    }
}