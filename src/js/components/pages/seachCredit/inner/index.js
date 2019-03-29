import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import style from './inner.css';

import ItemView from '../../../common/ItemView';
import Wall from '../../../common/Wall';

import { group1, group2, group3 } from './i18n.conf';
import utils from '../../../../lib/utils';


class Inner extends Component {


    _createHtml(confArr, data){
        let itemHtml;
        console.log(data,"breakContractRecordVOList");
        if (!utils.isEmptyObject(data)) {
            return false;
        }
        itemHtml =  data.map((val, k)=>{
            return confArr.map((item, i)=>{
                return (<ItemView
                            key={i}
                            rightTxt={item.rightTxt === 'xh'? k+1 : val[item.rightTxt]}
                            showLeftLen={item.showLeftLen}
                            i18nInfo={ {
                                id:item.id,
                                description:item.description,
                                defaultMessage:item.defaultMessage
                            } }
                            />)
            })
        })

        return itemHtml;
    }
    render() {
        const { router, data } = this.props;
        let type = router.params.type || "";
        let groupHtml
        if (type === '1') {
            groupHtml = this._createHtml(group1, data);
        }else if(type === '2'){
            groupHtml = this._createHtml(group2, data);
        }else if(type === '3'){
            groupHtml = this._createHtml(group3, data);
        }
        return (
            <div style={{ "overflow": "hidden"}}>
                <Wall
                    height={20}
                    />
                {groupHtml}

                <p className={style.tip}>
                    <FormattedMessage
                        id='CREDIT_RECORD_BOTTOMTIP'
                        description='显示近5条'
                        defaultMessage=''
                    />
                </p>
            </div>
        );
    }
}

export default Inner;