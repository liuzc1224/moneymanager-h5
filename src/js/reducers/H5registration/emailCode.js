import types from '../../actions/ActionType';

const
    initialState = {
        canStartCutDown: false
    }

export default function codeReducer(state = initialState, action) {
    const
        type = action.type,
        param = action.param;
    switch (type) {
        case types.EMAIL_CODE_FETCH:
            return Object.assign({}, state, {
                canStartCutDown: param.canStartCutDown
            })
        default:
            return state;
    }
}