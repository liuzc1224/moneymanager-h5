import React, { Component } from 'react';

import MsgSystem from '../../components/pages/Message/Msgdetails'

class MsgDetails extends Component {
    constructor(props){
        super(props);
        this.userList = props.location.state.data;
        console.log(this.userList)
    }
    render() {
        const height=window.screen.height;
        return (
            <div style={{height:height,background:'#ffffff'}}>
                <MsgSystem
                    data={this.userList}
                />
            </div>
        );
    }
}

export default MsgDetails;