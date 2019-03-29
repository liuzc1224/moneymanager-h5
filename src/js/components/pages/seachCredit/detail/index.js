import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import style from './detail.css';

import ItemView from '../../../common/ItemView';
import Wall from '../../../common/Wall';

import { creditIndexGroup1, creditIndexGroup2, creditIndexGroup3 } from './i18n.conf';
import bridge from '../../../../lib/bridge';

class Detail extends Component {


    componentDidMount(){
       this._seach();
    }

    reSeach(){
        this._showTip();
    }

    _showTip(){
        const { actions } = this.props;
        const that = this;
        let yesHtml = <FormattedMessage
                            id="COMMON_CONTINU_RESEACH"
                            description="继续查询"
                            defaultMessage=""
                            />
        let noHtml = <FormattedMessage
                            id="COMMON_NO_RESEACH"
                            description="暂不查询"
                            defaultMessage=""
                            />
        let desHtml = <FormattedMessage
                            id="CREDIT_SAVE_CPF_TIP2"
                            description="des"
                            defaultMessage=""
                            />
        actions.doAction('UPDATE_ALERT', {
            isShow: true,
            status: 'success',
            description: desHtml,
            actions: [
              { text: noHtml },
              { text: yesHtml, btnBg: true, cb: (argus) => {
                 that._seach();
              } }
            ]
        })
    }

    _seach(){
        const { actions } = this.props;
        actions.doAction("SEACH_CREDIT");
    }

    goDetail(url){
    //    let path = {
    //         pathname: item.url,
    //         state: {data : JSON.stringify(data[item.listName]) } ,
    //    }
    //    router.push(path);
        bridge.newWeb(url);
    }


    _createHtml(confArr, type='type2'){
        const { data } = this.props;
        let itemHtml;

        if (type === 'type1') {
            itemHtml = confArr.map((item, i)=>{
                return (<li className={style.list} key={i}>
                            <FormattedMessage
                                id={item.id}
                                description={item.description}
                                defaultMessage={item.defaultMessage}
                            />
                            <span>{data[item.rightTxt]}</span>
                        </li>)
            })
        }else if(type === 'type3'){
            itemHtml = confArr.map((item, i)=>{
                let cutStatus = data[item.showRightCut] && data[item.showRightCut].length ? true : false;
                return (<ItemView
                            key={i}
                            rightTxt={item.rightTxt}
                            showRightCut={cutStatus}
                            showLeftLen={item.showLeftLen}
                            pareRightClick={this.goDetail.bind(this)}
                            url={ item.url }
                            i18nInfo={ {
                                id:item.id,
                                description:item.description,
                                defaultMessage:item.defaultMessage
                            } }
                            />)
            })
        }else{
            itemHtml = confArr.map((item, i)=>{
                return (<ItemView
                            key={i}
                            rightTxt={data[item.rightTxt]}
                            showRightCut={item.showRightCut}
                            showLeftLen={item.showLeftLen}
                            pareRightClick={this.goDetail.bind(this)}
                            i18nInfo={ {
                                id:item.id,
                                description:item.description,
                                defaultMessage:item.defaultMessage
                            } }
                            />)
            })
        }
        return itemHtml;
    }

    render() {
        const { data } = this.props;

        const type1Html = this._createHtml(creditIndexGroup1, 'type1');
        const type2Html = this._createHtml(creditIndexGroup2);
        const type3Html = this._createHtml(creditIndexGroup3, 'type3');
        return (
            <div>
                <ul className={style.wrap}>
                    {type1Html}
                    <button className={style.btn} style={{background: data.isQuery ? "#FC7558" : "#e0e0e0"}} disabled={!data.isQuery} onClick={this.reSeach.bind(this)}>
                        <FormattedMessage
                            id="COMMON_RESEACH"
                            description="重新查询"
                            defaultMessage=""
                        />
                    </button>
                </ul>
                <Wall />
                <p className={style.title}>
                    <FormattedMessage
                        id="CREDIT_PAGEINDEX_GROUP2_TITLE"
                        description="征信情况"
                        defaultMessage=""
                    />
                </p>
                {type2Html}
                <Wall />
                {type3Html}
                <p className={style.botTip}>
                    <FormattedMessage
                        id="CREDIT_PAGEINDEX_BOTTOMTIP"
                        description="仅供参考"
                        defaultMessage=""
                    />
                </p>
            </div>
        );
    }
}

// Detail.propTypes = {

// };

export default Detail;