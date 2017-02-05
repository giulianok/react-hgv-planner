export default function (state=[""], action) {
    const newState = Array.from(state);

    switch (action.type) {
        case "ADD_DESTINATION": {
            newState.push(action.payload);
            break;
        }
        case "DELETE_DESTINATION": {
            newState.pop();
            break;
        }
        default:
            return state;
    }

    return newState;
}
