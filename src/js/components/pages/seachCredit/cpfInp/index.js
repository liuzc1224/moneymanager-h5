import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
// import PropTypes from 'prop-types';
import style from './cpfInp.css';

import Checkbox from '../checkbox';

import bridge from '../../../../lib/bridge';

class CpfInp extends Component {

    aclick(){
        bridge.newWeb('/registrationAgreement');
    }

    handleChange(e){
        const { handleChange } = this.props;
        let val = e.target.value;
        handleChange(val)
    }

    render() {
        const { handleCheck, checkStatus, cpfArr, seachFn } = this.props;
        let cpfVal = true;
        if (cpfArr[3]) {
            cpfVal = cpfArr[3].length === 2 ? false : true;
        }
        let flag = !checkStatus || cpfVal;
        return (
            <div className={style.wrap}>
                <p className={style.title}>
                    <FormattedMessage
                        id="CREDIT_PAGEINDEX_INP_TITLE"
                        description='请输入您本人的CPF'
                        defaultMessage=''
                        />
                </p>
                <p className={style.inp}>
                    <span>{cpfArr[0]}</span>
                    <span>{cpfArr[1]}</span>
                    <span>{cpfArr[2]}</span>
                    <span>{cpfArr[3]}</span>
                    <i>/</i>
                    <input type="text" maxLength="11" onChange={this.handleChange.bind(this)}/>
                </p>
                <p className={style.errmsg}>
                    {/* <FormattedMessage
                        id="CREDIT_PAGEINDEX_INP_ERRMSG"
                        description='err msg'
                        defaultMessage=''
                        /> */}
                </p>
                <Checkbox
                    handleCheck={handleCheck}
                    checkStatus={checkStatus}>
                    <FormattedMessage
                        id="CREDIT_PAGEINDEX_INP_URL"
                        description='隐私协议'
                        defaultMessage=''
                        values={
                           { url:<i style={{color:"blue"}} onClick={this.aclick.bind(this)}>política de privacidade</i>}
                        }
                        />
                </Checkbox>
                <button className={style.seach} disabled={flag} onClick={seachFn}>
                    <FormattedMessage
                            id="COMMON_SEACH"
                            description='查询'
                            defaultMessage=''
                            />
                </button>

                <p className={style.btnTip}>
                    <FormattedMessage
                        id="CREDIT_PAGEINDEX_INP_BTNTIP"
                        description='征信查询结果由合作商SPC提供'
                        defaultMessage=''
                        />
                </p>
            </div>
        );
    }
}

CpfInp.propTypes = {

};

export default CpfInp;