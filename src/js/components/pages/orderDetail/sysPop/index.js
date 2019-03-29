import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './sysPop.css';
import { FormattedMessage } from 'react-intl';

class SysPop extends Component {


    changeBottom(bottom){
        let dom = this.refs.sysBox;
        if (!dom) {
            return false;
        }
        setTimeout(() => {
            dom.style.bottom = `${bottom}rem`;
        }, 0);
    }

    render() {
        const { handleDelet, handleGo, isShow } = this.props;
        if (isShow) {
            this.changeBottom(0)
        }else{
            this.changeBottom(-3.3)
        }
        return (
            <div>
                {isShow ? <div  className='common-mask'></div> : null}
                <div ref="sysBox" className={style.box}>
                    <p onClick={handleDelet}>
                        <FormattedMessage
                            id="COMMON_DELETE_CARD"
                            description='删除卡片'
                            defaultMessage=''
                        />
                    </p>
                    <p onClick={handleGo}>
                        <FormattedMessage
                            id="COMMON_QUS_BACK"
                            description='问题反馈'
                            defaultMessage=''
                        />
                    </p>
                </div>
            </div>
        );
    }
}

SysPop.propTypes = {
    handleDelet: PropTypes.func.isRequired,
    handleGo: PropTypes.func.isRequired,
};

export default SysPop;