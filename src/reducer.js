import {t} from './actions';

// starting with no data
const initState = {
    user: null
};

export const userReducer = (state = initState, action) => {
    switch (action.type) {
        case t.LOAD_USER_DATA_SUCCESS:
            return {
                ...state,
                user: action.data
            };

        default:
            return state;
    }
};
