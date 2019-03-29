import  { COMMON_BR }  from './module/common';
import  { orderDtailBr }  from './module/orderDetail';



/*全局配置提示消息内容*/
const snackbars = {
    //征信
    'CREDIT_PAGEINDEX_TITLE': 'Vincular número de celular,{br}consulta grátis do crédito',
    'CREDIT_PAGEINDEX_TIP': 'Apenas uma vez da consulta ao mês',
    'CREDIT_PAGEINDEX_INP_TITLE': 'Insira o seu CPF',
    'CREDIT_PAGEINDEX_INP_ERRMSG': 'O CPF inserido não consultou nenhuma informação do crédito, insira novamente.',
    'CREDIT_PAGEINDEX_INP_URL': 'Li e concordo com a {url}',
    'CREDIT_PAGEINDEX_INP_BTNTIP': 'O resultado da consulta do crédito fornecido pela SPC',
    'CREDIT_PAGEINDEX_BANDINFO_CPF': 'Conta vinculada do CPF',
    'CREDIT_PAGEINDEX_BANDINFO_PREVTIME': 'Consulta anterior',
    'CREDIT_PAGEINDEX_BANDINFO_NEXTTIME': 'Próxima consulta disponível',

    'CREDIT_PAGEINDEX_GROUP2_NAME': 'Nome',
    'CREDIT_PAGEINDEX_GROUP2_CPFNUM': 'Número de CPF',
    'CREDIT_PAGEINDEX_GROUP2_LV': 'Classe do crédito',
    'CREDIT_PAGEINDEX_GROUP2_SCORE': 'Score do crédito',

    'CREDIT_PAGEINDEX_GROUP3_RECORD': 'Histórico de inadimplência',
    'CREDIT_PAGEINDEX_GROUP3_AMOUNT': 'Crédito concedido',
    'CREDIT_PAGEINDEX_GROUP3_LEGAL': 'Informação de poder judiciário',

    'CREDIT_PAGEINDEX_GROUP2_TITLE': 'Informação do crédito',
    'CREDIT_PAGEINDEX_BOTTOMTIP': 'As informações acima são apenas para sua referência',

    'CREDIT_BIND_PHONE_TIP': 'Precisa de vincular o número do seu celular para consultar',
    'CREDIT_SAVE_CPF_TIP': 'O  CPF que está consultando será vinculado à sua conta de Guiafatura, consulta excessiva afectará o seu crédito, continua ou não',
    'CREDIT_SAVE_CPF_TIP2': 'Consulta excessiva afectará sua situação de crédito.',
    //违约记录
    'CREDIT_RECORD_GROUP1_NO': 'Número',
    'CREDIT_RECORD_GROUP1_TYPE': 'Tipo',
    'CREDIT_RECORD_GROUP1_TIME': 'Tempo',
    'CREDIT_RECORD_GROUP1_PLATFORM': 'Plataforma',
    'CREDIT_RECORD_GROUP1_MONEY': 'Valor',
    'CREDIT_RECORD_BOTTOMTIP': '(Apresenta apenas os últimos 5)',

    'CREDIT_RECORD_GROUP2_XING': 'Crédito concedido',
    'CREDIT_RECORD_GROUP2_MOUTH': 'Mês do vencimento',
    'CREDIT_RECORD_GROUP2_YEAR': 'Ano do vencimento',

    'CREDIT_RECORD_GROUP3_CREATTIME': 'Tempo de criação',
    'CREDIT_RECORD_GROUP3_NUMBER': 'Número de ação',
    'CREDIT_RECORD_GROUP3_MONEY': 'Valor incluído',
    'CREDIT_RECORD_GROUP3_NAME': 'Nome de tribunal',

    //记账记录
    "BOOKKEEP_INCOME": "Receita",
    "BOOKKEEP_EXPENDITURE": "Gasto",
    "BOOKKEEP_TABS_WEEK": "Semana",
    "BOOKKEEP_TABS_MOUTH": "Mês",
    "BOOKKEEP_TABS_YEAR": "Ano",

    "BOOKKEEP_SLIDER_WEEK": "{index}.ªsemana",
    "BOOKKEEP_SLIDER_MOUTH": "Mês{index}",
    "BOOKKEEP_SLIDER_YEAR": "Ano{index}",

    "BOOKKEEP_CHARTS_TOTLE": "Gasto total：{money}",
    "BOOKKEEP_CHARTS_TOTLE_INCOME": "Receita total：{money}",

    "BOOKKEEP_INCOME_RANK": "Ranking de receita",
    "BOOKKEEP_EXPENDITURE_RANK": "Ranking de gasto",
    "BOOKKEEP_EMPTYTIP": "Agora sem os dados",

    //帮助中心
    'HELPCENTER_TITLE':"Perguntas mais frequentes",
    'HELPCENTER_BTN_TITLE':"Feedback de perguntas",
    'HELPCENTER_TAB_TITLE_NAME1':'Fatura',
    'HELPCENTER_TAB_TITLE_NAME2':"Contabilidade",
    'HELPCENTER_TAB_TITLE_NAME3':"Crédito",

    //产品反馈
    "PRODUCTFEEDBACK_SUBMIT":"Enviar",
    "PRODUCTFEEDBACK_SUBMITING":"Enviando",
    "PRODUCTFEEDBACK_RESULT":"Resultado de feedback",
    "PRODUCTFEEDBACK_SUCCESS":"Sucesso de feedback",
    "PRODUCTFEEDBACK_BACK_PERSONAL_CENTER":"Voltar para Meu",
    "PRODUCTFEEDBACK_INPUT_TOPIC":"Insira tópico de feedback...",
    "PRODUCTFEEDBACK_INPUT_CENTER":"Insira conteúdo de feedback...",
    "PRODUCTFEEDBACK_CENTER":"Obrigado pelo seu feedback sobre o nosso produto, a nossa missão é trazer experiência excelente do produto para os usuários",


    //H5注册Gerenciamento de Multi
    // cartões de crédito
    // Consulta grátis de crédito
    "H5_REGISTRATION_AD":"Faça o seu dinheiro mais eficaz",
    "H5_REGISTRATION_LOGO_AD":"Gerenciamento de Multi{br}cartões de crédito{br}Consulta grátis de crédito",
    "H5_REGISTRATION_EMAIL":"Insira seu e-mail",
    "H5_REGISTRATION_PASSWORD":"6-18 caracteres,incluindo números e letras",
    "H5_REGISTRATION_CODE":"Insira código de verificação",
    "H5_REGISTRATION_REMIND":"Li e concordo com a",
    "H5_REGISTRATION_REMIND_PROTOCOL":"política de privacidade",
    "H5_REGISTRATION_SEND":"Enviar",
    "H5_REGISTRATION_REGISTRATION":"Cadastrar",
    "H5_REGISTRATION_SUCCESS":"Sucesso de cadastro",
    "H5_REGISTRATION_TEXT":"Presta-lhe o melhor serviço de crédito",
    "H5_REGISTRATION_STEP1":"1. Gerenciamento de Multi cartão de crédito, despede-se ao atraso.",
    "H5_REGISTRATION_STEP2":"2. Contabilidade no dia a dia, nota cada passo do seu consumo da vida.",
    "H5_REGISTRATION_STEP3":"3. Consulta grátil de crédito, fornece o resultado mais autorizado do SPC.",
    "H5_REGISTRATION_DOWNLOAD":"Baixar agora"

};

const pt_BR = {
    ...snackbars,
    ...COMMON_BR,
    ...orderDtailBr,
};

export default pt_BR;