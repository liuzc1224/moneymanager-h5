import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './shure.css';

import facebook from './images/facebook.png';
import twitter from './images/twitter.png';
import linkin from './images/linkin.png';
import copy from './images/copy.png';

const shureConf = [
    {
        shareType: 0,
        name: 'facebook',
        img: facebook,
    },
    {
        shareType: 1,
        name: 'Twitter',
        img: twitter,
    },
    {
        shareType: 2,
        name: 'Linkin',
        img: linkin,
    },
    {
        shareType: 3,
        name: 'copiar este link',
        img: copy,
    }
]

const showStyle = {
    'bottom' : '0px'
}

const hiddenStyle = {
    'bottom' : '-340px',
    'visibility' : 'hidden'
}

class Shure extends Component {

    render() {
        const { isShow, shureFn, hiddenFn } = this.props;

        let isshowStyle = isShow ? showStyle : hiddenStyle ;

        var Item = shureConf.map((item, index)=>{
            return <p
                        onClick={shureFn.bind(null,item.shareType)}
                        key={item.shareType}>
                        <img src={item.img} alt=""/>
                        <span>{item.name}</span>
                    </p>
        })
        return (
            <div>
                {isShow ? <div className={style.mask}></div>:null}
                <div
                    className={style.box}
                    style={isshowStyle}>

                    <div className={style.top_b}>
                        {Item}
                    </div>

                    <div
                        className={style.bottom_b}
                        onClick={hiddenFn}>cancelar</div>
                </div>
            </div>
        );
    }
}

Shure.propTypes = {
    isShow: PropTypes.bool.isRequired,
    shureFn: PropTypes.func.isRequired,
    hiddenFn: PropTypes.func.isRequired
};

Shure.defaultProps = {
    isShow: false
}

export default Shure;