import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './item.css';
import img1 from './images/money.png';
import utils from '../../../../../lib/utils';

class Item extends Component {
    render() {
        const { data } = this.props;
        return (
            <div className={style.wrap}>
                <p className={style.imgBox}>
                    <span className={style.bg}>
                        <img src={img1} alt=""/>
                    </span>
                </p>
                <p className={style.r}>
                    <span>{data.factorName}</span>
                    {/* <span style={{color:"#aaa"}}>{data.factorName}</span> */}
                    <span>{utils.money(data.totalAmount)}</span>
                </p>
            </div>
        );
    }
}

Item.propTypes = {
    data: PropTypes.object.isRequired
};

export default Item;