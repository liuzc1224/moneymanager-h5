import React, { Component } from 'react';

import Banner from '../../../components/pages/H5registration/banner/index';
import Success from '../../../components/pages/H5registration/success/index'
import Bottom from '../../../components/pages/H5registration/bottom/index'


class registeredResult extends Component {
    render() {
        return (
            <div style={{background:'#ffffff'}}>
                <Banner  />
                <Success />
                <Bottom />
            </div>
        );
    }
}

export default registeredResult;