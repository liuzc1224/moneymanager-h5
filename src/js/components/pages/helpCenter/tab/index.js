import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TabTitle from '../tabTitle'
import TabItem from '../tabItem'
import * as AppActions from '../../../../actions/AppActions';
import style from './tab.css'
class Tab extends Component {
    constructor(){
        super();
        this.state = {
            tabData:[],
            currentIndex : 1
        }
    }
    check_item_index( index ){
        return index === this.state.currentIndex ? "show" : ""
    }
    setIndex(index){
        if(index!==this.state.currentIndex){
            this.refs.TabItem.initialization(index);
        }
        this.setState({ currentIndex : index });
    }
    getCenter(Index){
        this.props.getItem(Index);
    }
    render() {
        let tabTitles=[1,2,3];
        const Index=this.state.currentIndex;
        return (
            <div className={style.tab}>
                <div>
                    <TabTitle
                        title_index={Index}
                        setTitle={this.setIndex.bind(this)}
                        titles={tabTitles}
                    />
                </div>
                { /* Tab内容区域 */ }
                <TabItem ref="TabItem"
                     itemData={this.props.itemData}
                     getCenter={this.getCenter.bind(this)}
                     children={this.state.currentIndex}
                />
            </div>
        );
    };
}
function mapStateToProps(state) {
    return {
        spinnerReducer:state.spinnerReducer,
        toastReducer: state.toastReducer,
        checkMobileReducer: state.checkMobileReducer,
        codeReducer: state.codeReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    }
}
Tab.propTypes = {
    getItem: PropTypes.func,
    itemData: PropTypes.array
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tab);