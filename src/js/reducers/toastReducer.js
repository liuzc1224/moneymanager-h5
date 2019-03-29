import types from '../actions/ActionType';

const 
	initialState = {
        list: []
	}

export default function toastReducer(state = initialState, action) {
	const 
		type = action.type,
    	param = action.param;

    switch(type) {
        case types.UPDATE_TOAST_LIST:
            return Object.assign({}, state, {
                list: param.list || state.list
            });
		default:
      		return state;
    }
}
