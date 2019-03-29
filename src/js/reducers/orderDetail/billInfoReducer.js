import types from '../../actions/ActionType';

const
	initialState = {
        data: []
	}

export default function billInfoReducer(state = initialState, action) {
	const
		type = action.type,
    	param = action.param;

    switch(type) {
        case types.BILL_INFO_FETCH:
            return Object.assign({}, state, {
                data: param || state.data
            });
		default:
      		return state;
    }
}

