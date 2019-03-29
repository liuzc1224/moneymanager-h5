import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppActions from '../../actions/AppActions';

import Inner from '../../components/pages/seachCredit/inner';


class DefaultRecordContainer extends Component {

    componentDidMount(){
        const {actions} = this.props;
        actions.doAction("SEACH_CREDIT");
    }

    render() {
        const { router, creditInfoReducer } = this.props;
        let type = router.params.type || "";
        let data;
        console.log(creditInfoReducer.data,"creditInfoReducerdata");
        if (type === '1') {
            data = creditInfoReducer.data['breakContractRecordVOList']
        }else if(type === '2'){
            data = creditInfoReducer.data['creditoConcedidoVOList']
        }else if(type === '3'){
            data = creditInfoReducer.data['judiciarioVOList']
        }
        return (
            <div>
                <Inner
                    data={data}
                    router={router}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        creditInfoReducer: state.creditInfoReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DefaultRecordContainer);