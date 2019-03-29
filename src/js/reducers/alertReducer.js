import types from '../actions/ActionType';

const 
	initialState = {
        isShow: false,
        title: '',
        description: '',
        actions: []
	}

export default function alertReducer(state = initialState, action) {
	const 
		type = action.type,
    	param = action.param;

    switch(type) {
        case types.UPDATE_ALERT:
            return Object.assign({}, state, {
                isShow: param.isShow,
                title: param.title,
                description: param.description,
                actions: param.actions
            });
		default:
      		return state;
    }
}
