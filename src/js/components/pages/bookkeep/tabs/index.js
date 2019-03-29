import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import name from 'classnames';
import style from './tabs.css';


class Tabs extends Component {

    handleTabs(index){
        const { tabFn } = this.props;
        tabFn(index)
    }

    render() {
        const { dateType } = this.props;
        return (
            <div className={style.wrap}>
                <div className={style.box}>
                    <p className={ dateType === 1 ? style.active : "" } onClick={this.handleTabs.bind(this, 1)}>
                        <FormattedMessage
                            id="BOOKKEEP_TABS_WEEK"
                            description="周"
                            defaultMessage=""
                            />
                    </p>
                    <p className={name([style.cent, dateType === 2 ? style.active : ""])} onClick={this.handleTabs.bind(this, 2)}>
                        <FormattedMessage
                            id="BOOKKEEP_TABS_MOUTH"
                            description="月"
                            defaultMessage=""
                            />
                    </p>
                    <p className={ dateType === 3 ? style.active : "" } onClick={this.handleTabs.bind(this, 3)}>
                        <FormattedMessage
                            id="BOOKKEEP_TABS_YEAR"
                            description="年"
                            defaultMessage=""
                            />
                    </p>
                </div>
            </div>
        );
    }
}

Tabs.propTypes = {
    dateType: PropTypes.number.isRequired,
    tabFn: PropTypes.func.isRequired,
};

export default Tabs;