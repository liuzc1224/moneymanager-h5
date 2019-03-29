import types from '../../actions/ActionType';

const
    initialState = {
        isShowNextStepInp: false
    }

export default function checkMobileReducer(state = initialState, action) {
    const
        type = action.type,
        param = action.param;

    switch (type) {
        case types.CHECK_MOBILE_FETCH:
            return Object.assign({}, state, {
                isShowNextStepInp: param.isShowNextStepInp
            })
        default:
            return state;
    }
}