import { SET_IMAGE, CLEAR_IMAGE } from '../actions'

const initialState = {
    image: null,
}

const imageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IMAGE:
            return {
                ...state,
                image: action.payload,
            }
        case CLEAR_IMAGE:
            return initialState
        default:
            return state
    }
}

export default imageReducer
