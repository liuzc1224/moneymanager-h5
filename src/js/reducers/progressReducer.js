import types from '../actions/ActionType';

const initialState = {
    status:false,
}

export default function progressReducer(state = initialState, action) {
	const type = action.type;

    switch(type) {
    	case types.BEGIN_PRORESS:
    		return Object.assign({}, state, {
    			status: true,
    		});
        case types.STOP_PRORESS:
    		return Object.assign({}, state, {
    			status: false,
    		});
		default:
      		return state;
    }
}