import types from '../actions/ActionType';

const initialState = {
    showLoading:false,
    showDropback:false
}

export default function spinnerReducer(state = initialState, action) {
	const type = action.type;

    switch(type) {
    	case types.SHOW_LOADING:
    		return Object.assign({}, state, {
    			showLoading: true,
                showDropback: true
    		});
        case types.HIDE_LOADING:
    		return Object.assign({}, state, {
    			showLoading: false,
                showDropback: false
    		});
		default:
      		return state;
    }
}