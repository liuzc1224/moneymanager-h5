import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import style from './header.css';


class Header extends Component {

    handleTab(index){
        const { tabFn } = this.props
        tabFn(index)
    }
    render() {
        const { headerStatus, goBack } = this.props
        return (
            <div className={style.wrap}>
                <p className={style.back} onClick={goBack}></p>
                <div className={style.group}>
                    <span className={ headerStatus === 1 ? style.active : '' } onClick={this.handleTab.bind(this, 1)}>
                        <FormattedMessage
                            id="BOOKKEEP_EXPENDITURE"
                            description="支出"
                            defaultMessage=""
                            tagName='i'
                            />
                    </span>
                    <span className={ headerStatus === 0 ? style.active : ''} onClick={this.handleTab.bind(this, 0)}>
                        <FormattedMessage
                            id="BOOKKEEP_INCOME"
                            description="收入"
                            defaultMessage=""
                            tagName='i'
                            />
                    </span>
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    headerStatus: PropTypes.number.isRequired,
    tabFn: PropTypes.func.isRequired,
};

export default Header;