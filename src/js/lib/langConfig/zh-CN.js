import  { COMMON_ZH }  from './module/common';
import  { orderDtailZh }  from './module/orderDetail';



/*全局配置提示消息内容*/
const snackbars = {
    //征信
    'CREDIT_PAGEINDEX_TITLE': '绑定手机号,{br}免费查征信',
    'CREDIT_PAGEINDEX_TIP': '一个月只能查一次哦',
    'CREDIT_PAGEINDEX_INP_TITLE': '请输入您本人的CPF',
    'CREDIT_PAGEINDEX_INP_ERRMSG': '您输入的CPF号码未查询到征信信息，请重新输入',
    'CREDIT_PAGEINDEX_INP_URL': '已查看并同意 用户{url}',
    'CREDIT_PAGEINDEX_INP_BTNTIP': '征信查询结果由合作商SPC提供',
    'CREDIT_PAGEINDEX_BANDINFO_CPF': 'CPF绑定账户',
    'CREDIT_PAGEINDEX_BANDINFO_PREVTIME': '上次查询时间',
    'CREDIT_PAGEINDEX_BANDINFO_NEXTTIME': '下次可查询时间',

    'CREDIT_PAGEINDEX_GROUP2_NAME': '姓名',
    'CREDIT_PAGEINDEX_GROUP2_CPFNUM': 'CPF号',
    'CREDIT_PAGEINDEX_GROUP2_LV': '信用等级',
    'CREDIT_PAGEINDEX_GROUP2_SCORE': '信用评分',

    'CREDIT_PAGEINDEX_GROUP3_RECORD': '违约记录',
    'CREDIT_PAGEINDEX_GROUP3_AMOUNT': '信用额度',
    'CREDIT_PAGEINDEX_GROUP3_LEGAL': '法律执行',

    'CREDIT_PAGEINDEX_GROUP2_TITLE': '征信情况',
    'CREDIT_PAGEINDEX_BOTTOMTIP': '以上征信信息仅供本人参考',

    'CREDIT_BIND_PHONE_TIP': '您的账户需绑定手机号才可以进行查询哦',
    'CREDIT_SAVE_CPF_TIP': '您查询的CPF号码将绑定您的Guiafatura账户，过多的征信查询可能会影响您的征信，是否继续',
    'CREDIT_SAVE_CPF_TIP2': '征信查询次数过多,可能会影响您的征信情况哦',

    //spc查询记录
    'CREDIT_RECORD_GROUP1_NO': '序号',
    'CREDIT_RECORD_GROUP1_TYPE': '违约类型',
    'CREDIT_RECORD_GROUP1_TIME': '违约时间',
    'CREDIT_RECORD_GROUP1_PLATFORM': '平台',
    'CREDIT_RECORD_GROUP1_MONEY': '违约金额',
    'CREDIT_RECORD_BOTTOMTIP': '(只显示近5条)',

    'CREDIT_RECORD_GROUP2_XING': '授信额度',
    'CREDIT_RECORD_GROUP2_MOUTH': '到期月份',
    'CREDIT_RECORD_GROUP2_YEAR': '到期年份',

    'CREDIT_RECORD_GROUP3_CREATTIME': '创建日期',
    'CREDIT_RECORD_GROUP3_NUMBER': '执行编号',
    'CREDIT_RECORD_GROUP3_MONEY': '涉及金额',
    'CREDIT_RECORD_GROUP3_NAME': '法庭名称',

    //记账记录
    "BOOKKEEP_INCOME": "收入",
    "BOOKKEEP_EXPENDITURE": "支出",
    "BOOKKEEP_TABS_WEEK": "周",
    "BOOKKEEP_TABS_MOUTH": "月",
    "BOOKKEEP_TABS_YEAR": "年",

    "BOOKKEEP_SLIDER_WEEK": "第{index}周",
    "BOOKKEEP_SLIDER_MOUTH": "{index}月",
    "BOOKKEEP_SLIDER_YEAR": "{index}年",

    "BOOKKEEP_CHARTS_TOTLE": "总支出：{money}",
    "BOOKKEEP_CHARTS_TOTLE_INCOME": "总收入：{money}",

    "BOOKKEEP_INCOME_RANK": "收入排行",
    "BOOKKEEP_EXPENDITURE_RANK": "支出排行",
    "BOOKKEEP_EMPTYTIP": "暂没有数据",

    //帮助中心
    'HELPCENTER_TITLE':"热点问题",
    'HELPCENTER_BTN_TITLE':"问题反馈",
    'HELPCENTER_TAB_TITLE_NAME1':'账单',
    'HELPCENTER_TAB_TITLE_NAME2':"记账",
    'HELPCENTER_TAB_TITLE_NAME3':"征信",

    //产品反馈
    "PRODUCTFEEDBACK_SUBMIT":"提交",
    "PRODUCTFEEDBACK_SUBMITING":"提交中...",
    "PRODUCTFEEDBACK_RESULT":"反馈结果",
    "PRODUCTFEEDBACK_SUCCESS":"反馈成功",
    "PRODUCTFEEDBACK_BACK_PERSONAL_CENTER":"返回个人中心",
    "PRODUCTFEEDBACK_INPUT_TOPIC":"请输入反馈主题...",
    "PRODUCTFEEDBACK_INPUT_CENTER":"请输入反馈内容...",
    "PRODUCTFEEDBACK_CENTER":"感谢您对我们产品的反馈，给用户带来极致的产品体验是我们一直的目标",


    //H5注册
    "H5_REGISTRATION_AD":"让你的钱更有效",
    "H5_REGISTRATION_LOGO_AD":"信用卡多卡管理{br}还可免费查征信",
    "H5_REGISTRATION_EMAIL":"请输入您的邮箱",
    "H5_REGISTRATION_PASSWORD":"请您输入6-18位字符含数字、字母的密码",
    "H5_REGISTRATION_CODE":"请您输入验证码",
    "H5_REGISTRATION_REMIND":"我已阅读并同意",
    "H5_REGISTRATION_REMIND_PROTOCOL":"《隐私协议》",
    "H5_REGISTRATION_SEND":"发送",
    "H5_REGISTRATION_REGISTRATION":"注册",
    "H5_REGISTRATION_SUCCESS":"注册成功",
    "H5_REGISTRATION_TEXT":"为您提供最优质的信用服务",
    "H5_REGISTRATION_STEP1":"1. 信用卡多卡管理，和逾期说再见",
    "H5_REGISTRATION_STEP2":"2. 生活记账，记录您生活消费的每一步",
    "H5_REGISTRATION_STEP3":"3. 征信免费查，提供SPC最权威征信结果",
    "H5_REGISTRATION_DOWNLOAD":"立即下载"

};

const zh_CN = {
    ...snackbars,
    ...COMMON_ZH,
    ...orderDtailZh,
};

export default zh_CN;