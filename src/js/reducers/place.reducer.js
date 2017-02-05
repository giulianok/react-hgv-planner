export default function (state={
    origin: null,
    destinations: [null]
}, action) {
    const {type, name, payload} = action;

    switch (type) {
        case 'CHANGE_ORIGIN_PLACE': {
            state = {...state, origin:payload};
            break;
        }
        case 'CHANGE_DESTINATION_PLACE': {
            state = {...state};
            const index = name.split('-')[1];
            state.destinations[index] = payload;
            break;
        }
        case 'DELETE_DESTINATION_PLACE': {
            state = {...state};
            state.destinations.pop();
            break;
        }
    }

    return state;
}
